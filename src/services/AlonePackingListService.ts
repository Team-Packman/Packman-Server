import {
  AlonePackingListCreateDTO,
  AlonePackingListResponseDTO,
} from '../interface/IAlonePackingList';
import AlonePackingList from '../models/AlonePackingList';
import Folder from '../models/Folder';
import Template from '../models/Template';

const createAlonePackingList = async (
  alonePackingListCreateDto: AlonePackingListCreateDTO,
): Promise<AlonePackingListResponseDTO | string> => {
  try {
    const duplicatedTitle = await AlonePackingList.findOne({
      title: alonePackingListCreateDto.title,
    });
    if (duplicatedTitle) return 'duplication';

    const alonePackingList = new AlonePackingList({
      title: alonePackingListCreateDto.title,
      departureDate: alonePackingListCreateDto.departureDate,
    });

    const innerTemplate = await Template.findById(alonePackingListCreateDto.templateId);
    if (!innerTemplate) {
      alonePackingList.categoryIdArray = [];
    } else {
      alonePackingList.categoryIdArray = innerTemplate.categoryIdArray;
    }

    await alonePackingList.save();

    await Folder.findByIdAndUpdate(alonePackingListCreateDto.folderId, {
      $push: { packingListArray: alonePackingList.id },
    });

    const data: AlonePackingListResponseDTO | null = await AlonePackingList.findOne(
      { _id: alonePackingList.id },
      { title: 1, departureDate: 1, isSaved: 1, categoryIdArray: 1 },
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

    if (!data) return 'notfound';
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createAlonePackingList,
};
