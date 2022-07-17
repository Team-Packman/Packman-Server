import {
  TogetherPackingListCategoryCreateDto,
  TogetherPackingListCategoryResponseDto,
} from '../interface/ITogetherPackingList';

import TogetherPackingList from '../models/TogetherPackingList';
import Category from '../models/Category';
import Pack from '../models/Pack';
import { CategoryUpdateDto } from '../interface/ICategory';
import { CategoryDeleteDto } from '../interface/ICategory';
import mongoose from 'mongoose';

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

const updateCategory = async (
  categoryUpdateDto: CategoryUpdateDto,
): Promise<TogetherPackingListCategoryResponseDto | string> => {
  try {
    const categoryId = categoryUpdateDto.id;
    const categoryName = categoryUpdateDto.name;
    const listId = categoryUpdateDto.listId;
    console.log(categoryId);
    const category = await Category.findById(categoryId);
    if (!category) return 'no_category';

    const list = await TogetherPackingList.findById(listId);
    if (!list) return 'no_list';

    // list의 categoryIdArray 배열에 존재하지 않는 categoryId인 경우
    if (!list.categoryIdArray.includes(categoryId)) return 'no_list_category';

    await Category.updateOne(
      { _id: categoryId },
      {
        $set: {
          name: categoryName,
        },
      },
    );

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

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteCategory = async (listId: string, categoryId: string): Promise<string> => {
  try {
    const lId = new mongoose.Types.ObjectId(listId);
    const cateId = new mongoose.Types.ObjectId(categoryId);

    const category = await Category.findById(cateId);
    if (!category) return 'no_category';

    const list = await TogetherPackingList.findById(lId);
    if (!list) return 'no_list';

    const categories = list.categoryIdArray;
    const packs = category.packIdArray;

    // list의 categoryIdArray 배열에 존재하지 않는 categoryId인 경우
    if (!categories.includes(cateId)) return 'no_list_category';

    await Pack.deleteMany({ _id: { $in: packs } });
    await Category.deleteOne({ _id: cateId });

    categories.splice(categories.indexOf(cateId));

    await TogetherPackingList.updateOne(
      { _id: listId },
      {
        $set: {
          categoryIdArray: categories,
        },
      },
    );

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
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export default {
  createCategory,
  updateCategory,
  deleteCategory,
};
