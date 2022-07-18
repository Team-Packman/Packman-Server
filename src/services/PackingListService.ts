import {
  PackingListDateUpdateDTO,
  PackingListMyTemplateUpdateDTO,
  PackingListTitleUpdateDTO,
} from '../interface/IPackingList';
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

const updatePackingListDate = async (
  packingListDateUpdateDto: PackingListDateUpdateDTO,
): Promise<PackingListDateUpdateDTO | string> => {
  try {
    let updatedData;
    if (packingListDateUpdateDto.isAloned) {
      updatedData = await AlonePackingList.findByIdAndUpdate(
        packingListDateUpdateDto._id,
        {
          departureDate: packingListDateUpdateDto.departureDate,
          updatedAt: Date.now(),
        },
        { new: true },
      );
      if (!updatedData) return 'notfoundUpdatedDate';
    } else {
      updatedData = await TogetherPackingList.findByIdAndUpdate(
        packingListDateUpdateDto._id,
        {
          departureDate: packingListDateUpdateDto.departureDate,
          updatedAt: Date.now(),
        },
        { new: true },
      );
      if (!updatedData) return 'notfoundUpdatedDate';
      await AlonePackingList.findByIdAndUpdate(updatedData.myPackingListId, {
        departureDate: packingListDateUpdateDto.departureDate,
        updatedAt: Date.now(),
      });
    }

    const data = {
      _id: updatedData.id,
      departureDate: updatedData.departureDate,
    };
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updatePackingListMyTemplate = async (
  packingListMyTemplateUpdateDto: PackingListMyTemplateUpdateDTO,
): Promise<PackingListMyTemplateUpdateDTO | string> => {
  try {
    let updatedMyTemplate;
    if (packingListMyTemplateUpdateDto.isAloned) {
      updatedMyTemplate = await AlonePackingList.findByIdAndUpdate(
        packingListMyTemplateUpdateDto._id,
        {
          isSaved: packingListMyTemplateUpdateDto.isSaved,
          updatedAt: Date.now(),
        },
        { new: true },
      );
    } else {
      updatedMyTemplate = await TogetherPackingList.findByIdAndUpdate(
        packingListMyTemplateUpdateDto._id,
        {
          isSaved: packingListMyTemplateUpdateDto.isSaved,
          updatedAt: Date.now(),
        },
        { new: true },
      );
    }
    if (!updatedMyTemplate) return 'notfoundUpdatedMyTemplate';
    const data = {
      _id: updatedMyTemplate.id,
      isSaved: updatedMyTemplate.isSaved,
    };
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  updatePackingListTitle,
  updatePackingListDate,
  updatePackingListMyTemplate,
};
