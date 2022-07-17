import { PackingListTitleUpdateDTO } from '../interface/IPackingList';
import AlonePackingList from '../models/AlonePackingList';
import TogetherPackingList from '../models/TogetherPackingList';

const updatePackingListTitle = async (
  packingListTitleUpdateDto: PackingListTitleUpdateDTO,
): Promise<PackingListTitleUpdateDTO | string> => {
  try {
    let duplicatedList;
    if (packingListTitleUpdateDto.isAloned) {
      duplicatedList = await AlonePackingList.findOne({
        title: packingListTitleUpdateDto.title,
        isAloned: true,
      });
    } else {
      duplicatedList = await TogetherPackingList.findOne({
        title: packingListTitleUpdateDto.title,
      });
    }

    if (duplicatedList)
      if (!(duplicatedList.id == packingListTitleUpdateDto._id)) return 'duplication';

    let updatedData;
    if (packingListTitleUpdateDto.isAloned) {
      updatedData = await AlonePackingList.findByIdAndUpdate(
        packingListTitleUpdateDto._id,
        {
          title: packingListTitleUpdateDto.title,
          updatedAt: Date.now(),
        },
        { new: true },
      );
    } else {
      updatedData = await TogetherPackingList.findByIdAndUpdate(
        packingListTitleUpdateDto._id,
        {
          title: packingListTitleUpdateDto.title,
          updatedAt: Date.now(),
        },
        { new: true },
      );
      const togetherPackingList = await TogetherPackingList.findById(packingListTitleUpdateDto._id);
      if (!togetherPackingList) return 'notfoundList';
      await AlonePackingList.findByIdAndUpdate(togetherPackingList.myPackingListId, {
        title: packingListTitleUpdateDto.title,
        updatedAt: Date.now(),
      });
    }

    if (!updatedData) return 'notfoundUpdatedTitle';
    const data = {
      _id: updatedData.id,
      title: updatedData.title,
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  updatePackingListTitle,
};
