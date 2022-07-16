import { AlonePackingListResponseDTO } from '../interface/IAlonePackingList';
import {
  TogetherPackingListCreateDTO,
  TogetherPackingListResponseDTO,
} from '../interface/ITogetherPackingList';
import AlonePackingList from '../models/AlonePackingList';
import Category from '../models/Category';
import Folder from '../models/Folder';
import Group from '../models/Group';
import Template from '../models/Template';
import TogetherPackingList from '../models/TogetherPackingList';

const createTogetherPackingList = async (
  togetherPackingListCreateDto: TogetherPackingListCreateDTO,
): Promise<
  | {
      togetherPackingList: TogetherPackingListResponseDTO;
      alonePackingList: AlonePackingListResponseDTO;
    }
  | string
> => {
  try {
    const duplicatedAlone = await AlonePackingList.findOne({
      title: togetherPackingListCreateDto.title,
    });
    const duplicatedTogether = await TogetherPackingList.findOne({
      title: togetherPackingListCreateDto.title,
    });
    if (duplicatedAlone || duplicatedTogether) return 'duplication';

    const group = new Group({
      userIdArray: [],
    });
    await group.save();

    const togetherPackingList = new TogetherPackingList({
      title: togetherPackingListCreateDto.title,
      departureDate: togetherPackingListCreateDto.departureDate,
      groupId: group.id,
    });

    const innerTemplate = await Template.findById(togetherPackingListCreateDto.templateId);
    if (!innerTemplate) {
      togetherPackingList.categoryIdArray = [];
    } else {
      togetherPackingList.categoryIdArray = innerTemplate.categoryIdArray;
      togetherPackingList.categoryIdArray.map(async (element) => {
        const myCategory = await Category.findById(element);
        if (!myCategory) return 'notfoundCategory';
        togetherPackingList.packTotalNum += myCategory.packIdArray.length;
        togetherPackingList.packRemainNum += myCategory.packIdArray.length;
      });
    }

    const alonePackingList = new AlonePackingList({
      title: togetherPackingListCreateDto.title,
      departureDate: togetherPackingListCreateDto.departureDate,
      categoryIdArray: [],
    });

    await alonePackingList.save();
    togetherPackingList.myPackingListId = alonePackingList.id;

    await togetherPackingList.save();

    await Folder.findByIdAndUpdate(togetherPackingListCreateDto.folderId, {
      $push: { packingListArray: togetherPackingList.id },
    });

    const data1: TogetherPackingListResponseDTO | null = await TogetherPackingList.findOne(
      { _id: togetherPackingList.id },
      { title: 1, departureDate: 1, categoryIdArray: 1 },
    ).populate({
      path: 'categoryIdArray',
      model: 'Category',
      options: { sort: { createdAt: 1 } },
      populate: {
        path: 'packIdArray',
        model: 'Pack',
        select: { _id: 1, name: 1, isChecked: 1, packerId: 1 },
        options: { sort: { createdAt: 1 } },
        populate: {
          path: 'packerId',
          model: 'User',
          select: {
            _id: 1,
            nickname: 1,
          },
        },
      },
    });

    const data2: AlonePackingListResponseDTO | null = await AlonePackingList.findOne(
      { _id: alonePackingList.id },
      { title: 1, departureDate: 1, categoryIdArray: 1 },
    ).populate({
      path: 'categoryIdArray',
      model: 'Category',
      options: { sort: { createdAt: 1 } },
      populate: {
        path: 'packIdArray',
        model: 'Pack',
        select: { _id: 1, name: 1, isChecked: 1 },
        options: { sort: { createdAt: 1 } },
      },
    });

    if (!data1 || !data2) return 'notfoundList';

    const response = { togetherPackingList: data1, alonePackingList: data2 };
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createTogetherPackingList,
};
