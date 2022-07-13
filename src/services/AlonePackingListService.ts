import {
  AlonePackingListCreateDTO,
  AlonePackingListResponseDTO,
} from '../interface/IAlonePackingList';
import AlonePackingList from '../models/AlonePackingList';
import Folder from '../models/Folder';
import Template from '../models/Template';

const createAlonePackingList = async (
  alonePackingListCreateDto: AlonePackingListCreateDTO,
): Promise<AlonePackingListResponseDTO> => {
  try {
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

    // const categoryList = AlonePackingList.findOne(
    //   { _id: alonePackingList.id },
    //   { _id: 0, categoryIdArray: 1 },
    // ).populate({
    //   path: 'categoryIdArray',
    //   populate: ({
    //     path: 'PackIdArray',
    //     select: '_id', 'name', 'isChecked'
    //   }),
    // });

    const data: AlonePackingListResponseDTO = {
      id: alonePackingList.id,
      title: alonePackingList.title,
      departureDate: alonePackingList.departureDate,
      // category: categoryList,
      isSaved: alonePackingList.isSaved,
      category: [],
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createAlonePackingList,
};
