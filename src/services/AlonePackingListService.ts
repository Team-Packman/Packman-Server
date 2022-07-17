import {
  AlonePackingListCreateDTO,
  AlonePackingListResponseDTO,
} from '../interface/IAlonePackingList';
import AlonePackingList from '../models/AlonePackingList';
import Category from '../models/Category';
import Folder from '../models/Folder';
import Template from '../models/Template';

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

    const innerTemplate = await Template.findById(alonePackingListCreateDto.templateId);
    if (!innerTemplate) {
      alonePackingList.category = [];
    } else {
      alonePackingList.category = innerTemplate.category;
      alonePackingList.category.map(async (element) => {
        const myCategory = await Category.findById(element);
        if (!myCategory) return 'notfoundCategory';
        console.log(myCategory.pack.length);
        alonePackingList.packTotalNum += myCategory.pack.length;
        alonePackingList.packRemainNum += myCategory.pack.length;
      });
    }

    console.log(alonePackingList.packTotalNum, alonePackingList.packRemainNum);
    await alonePackingList.save();

    await Folder.findByIdAndUpdate(alonePackingListCreateDto.folderId, {
      $push: { packingListArray: alonePackingList.id },
    });

    const data: AlonePackingListResponseDTO | null = await AlonePackingList.findOne(
      { _id: alonePackingList.id },
      { title: 1, departureDate: 1, isSaved: 1, category: 1 },
    ).populate({
      path: 'category',
      model: 'Category',
      options: { sort: { createdAt: 1 } },
      populate: {
        path: 'pack',
        model: 'Pack',
        select: { _id: 1, name: 1, isChecked: 1, packer: 1 },
        options: { sort: { createdAt: 1 } },
      },
    });

    if (!data) return 'notfoundList';
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createAlonePackingList,
};
