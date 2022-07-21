import {
  AlonePackingListCreateDTO,
  AlonePackingListResponseDTO,
} from '../interface/IAlonePackingList';
import { PackingListResponseDTO } from '../interface/IPackingList';
import AlonePackingList from '../models/AlonePackingList';
import Category from '../models/Category';
import Folder from '../models/Folder';
import Template from '../models/Template';
import { aloneListResponse } from '../modules/aloneListResponse';

const createAlonePackingList = async (
  alonePackingListCreateDto: AlonePackingListCreateDTO,
): Promise<AlonePackingListResponseDTO | string> => {
  try {
    const duplicatedList = await AlonePackingList.findOne({
      title: alonePackingListCreateDto.title,
      isAloned: true,
    });
    if (duplicatedList) return 'duplication';

    const alonePackingList = new AlonePackingList({
      title: alonePackingListCreateDto.title,
      departureDate: alonePackingListCreateDto.departureDate,
    });

    if (!alonePackingListCreateDto.templateId) {
      alonePackingList.category = [];
    } else {
      const innerTemplate = await Template.findById(alonePackingListCreateDto.templateId);
      if (innerTemplate) {
        alonePackingList.category = innerTemplate.category;
        for await (const element of alonePackingList.category) {
          const myCategory = await Category.findById(element);
          if (!myCategory) return 'notfoundCategory';
          alonePackingList.packTotalNum += myCategory.pack.length;
          alonePackingList.packRemainNum += myCategory.pack.length;
        }
      } else return 'notfoundTemplate';
    }
    await alonePackingList.save();

    await Folder.findByIdAndUpdate(alonePackingListCreateDto.folderId, {
      $push: { list: alonePackingList.id },
    });

    const data: AlonePackingListResponseDTO | null = await aloneListResponse(alonePackingList.id);

    if (!data) return 'notfoundList';
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const readAlonePackingList = async (
  listId: string,
): Promise<AlonePackingListResponseDTO | string> => {
  try {
    const data: AlonePackingListResponseDTO | null = await aloneListResponse(listId);
    if (!data) return 'notfoundList';
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteAlonePackingList = async (
  folderId: string,
  listId: string,
): Promise<
  | {
      alonePackingList: PackingListResponseDTO[];
    }
  | string
> => {
  try {
    const deleteLists = listId.split(',');
    await AlonePackingList.updateMany(
      {
        _id: {
          $in: deleteLists,
        },
      },
      { $set: { isDeleted: true } },
    );

    const data = [];
    const originalFolder = await Folder.findById(folderId);
    if (!originalFolder) return 'notfoundFolder';

    const revisedLists = originalFolder.list.filter((element) => {
      return !deleteLists.includes(element.toString());
    });

    await Folder.findByIdAndUpdate(folderId, {
      list: revisedLists,
    });

    const responseFolder = await Folder.findById(folderId);
    if (!responseFolder) return 'notfoundFolder';

    for await (const element of responseFolder.list) {
      const responseList = await AlonePackingList.findById(element);
      if (responseList) {
        const innerData: PackingListResponseDTO = {
          _id: responseList.id,
          departureDate: responseList.departureDate,
          title: responseList.title,
          packTotalNum: responseList.packTotalNum,
          packRemainNum: responseList.packRemainNum,
        };
        data.push(innerData);
      }
    }

    return { alonePackingList: data };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export default {
  createAlonePackingList,
  readAlonePackingList,
  deleteAlonePackingList,
};
