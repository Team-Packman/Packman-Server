import {
  TogetherPackingListCategoryCreateDto,
  TogetherPackingListCategoryResponseDto,
} from '../interface/ITogetherPackingList';

import TogetherPackingList from '../models/TogetherPackingList';
import Category from '../models/Category';
import Pack from '../models/Pack';

const createCategory = async (
  togetherPackingListCategoryCreateDto: TogetherPackingListCategoryCreateDto,
): Promise<TogetherPackingListCategoryResponseDto | number> => {
  try {
    const listId = togetherPackingListCategoryCreateDto.listId;
    const category = new Category({ name: togetherPackingListCategoryCreateDto.name });

    await category.save();

    await TogetherPackingList.findByIdAndUpdate(listId, {
      $push: { categoryIdArray: category.id },
    });

    // Pack 생성되지 않는 오류로 추가
    const pack = Pack.find();

    const data = await TogetherPackingList.findOne(
      { _id: listId },
      { categoryIdArray: 1 },
    ).populate({
      path: 'categoryIdArray',
      model: 'Category',
      options: { sort: { createdAt: 1 } },
      populate: {
        path: 'packIdArray',
        model: 'Pack',
        select: { _id: 1, name: 1, isChecked: 1 },
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

    if (!data) return 400;
    else return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export default {
  createCategory,
};
