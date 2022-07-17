import {
  TogetherMyPackingListResponseDTO,
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
      title: string;
      departureDate: Date;
      togetherPackingList: TogetherPackingListResponseDTO;
      alonePackingList: TogetherMyPackingListResponseDTO;
    }
  | string
> => {
  try {
    const duplicatedData = await TogetherPackingList.findOne({
      title: togetherPackingListCreateDto.title,
    });
    if (duplicatedData) return 'duplication';

    const group = new Group({
      members: [],
    });
    await group.save();

    const togetherPackingList = new TogetherPackingList({
      title: togetherPackingListCreateDto.title,
      departureDate: togetherPackingListCreateDto.departureDate,
      groupId: group.id,
    });

    if (!togetherPackingListCreateDto.templateId) {
      togetherPackingList.category = [];
    } else {
      const innerTemplate = await Template.findById(togetherPackingListCreateDto.templateId);
      if (innerTemplate) {
        togetherPackingList.category = innerTemplate.category;
        for await (const element of togetherPackingList.category) {
          const myCategory = await Category.findById(element);
          if (!myCategory) return 'notfoundCategory';
          togetherPackingList.packTotalNum += myCategory.pack.length;
          togetherPackingList.packRemainNum += myCategory.pack.length;
        }
      } else return 'notfoundTemplate';
    }

    const alonePackingList = new AlonePackingList({
      title: togetherPackingListCreateDto.title,
      departureDate: togetherPackingListCreateDto.departureDate,
      category: [],
      isAloned: false,
    });
    await alonePackingList.save();

    togetherPackingList.myPackingListId = alonePackingList.id;
    await togetherPackingList.save();

    await Folder.findByIdAndUpdate(togetherPackingListCreateDto.folderId, {
      $push: { pack: togetherPackingList.id },
    });

    const togetherData: TogetherPackingListResponseDTO | null = await TogetherPackingList.findOne(
      { _id: togetherPackingList.id },
      { category: 1, isSaved: 1, groupId: 1 },
    ).populate({
      path: 'category',
      model: 'Category',
      select: { _id: 1, name: 1, pack: 1 },
      options: { sort: { createdAt: 1 } },
      populate: {
        path: 'pack',
        model: 'Pack',
        select: { _id: 1, name: 1, isChecked: 1, packerId: 1 },
        options: { sort: { createdAt: 1 } },
        populate: {
          path: 'packer',
          model: 'User',
          select: {
            _id: 1,
            name: 1,
          },
        },
      },
    });

    const aloneData: TogetherMyPackingListResponseDTO | null = await AlonePackingList.findOne(
      { _id: alonePackingList.id },
      { category: 1 },
    ).populate({
      path: 'category',
      model: 'Category',
      select: { _id: 1, name: 1, pack: 1 },
      options: { sort: { createdAt: 1 } },
      populate: {
        path: 'pack',
        model: 'Pack',
        select: { _id: 1, name: 1, isChecked: 1, packer: 1 },
        options: { sort: { createdAt: 1 } },
      },
    });

    if (!togetherData || !aloneData) return 'notfoundList';

    const response = {
      title: togetherPackingList.title,
      departureDate: togetherPackingList.departureDate,
      togetherPackingList: togetherData,
      alonePackingList: aloneData,
    };
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createTogetherPackingList,
};
