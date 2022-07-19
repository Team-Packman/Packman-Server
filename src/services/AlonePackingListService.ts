import {
  AlonePackingListCreateDTO,
  AlonePackingListResponseDTO,
} from '../interface/IAlonePackingList';
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

    // const data: AlonePackingListResponseDTO | null = await AlonePackingList.findOne(
    //   { _id: alonePackingList.id },
    //   { title: 1, departureDate: 1, isSaved: 1, category: 1 },
    // ).populate({
    //   path: 'category',
    //   model: 'Category',
    //   options: { sort: { createdAt: 1 } },
    //   select: { _id: 1, name: 1, pack: 1 },
    //   populate: {
    //     path: 'pack',
    //     model: 'Pack',
    //     select: { _id: 1, name: 1, isChecked: 1, packer: 1 },
    //     options: { sort: { createdAt: 1 } },
    //   },
    // });

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

export default {
  createAlonePackingList,
  readAlonePackingList,
};
