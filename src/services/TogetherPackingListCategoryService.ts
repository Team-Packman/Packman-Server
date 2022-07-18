import {
  TogetherPackingListCategoryCreateDto,
  TogetherPackingListCategoryResponseDto,
} from '../interface/ITogetherPackingList';

import TogetherPackingList from '../models/TogetherPackingList';
import Category from '../models/Category';
import Pack from '../models/Pack';
import { CategoryUpdateDto } from '../interface/ICategory';
import mongoose from 'mongoose';

const createCategory = async (
  togetherPackingListCategoryCreateDto: TogetherPackingListCategoryCreateDto,
) => {
  try {
    const listId = togetherPackingListCategoryCreateDto.listId;
    const newCategory = new Category({ name: togetherPackingListCategoryCreateDto.name });

    await newCategory.save();

    await TogetherPackingList.findByIdAndUpdate(listId, {
      $push: { category: newCategory.id },
    });

    // Pack 생성되지 않는 오류로 추가
    const pack = Pack.find();

    const data = await TogetherPackingList.findOne({ _id: listId }, { category: 1 }).populate({
      path: 'category',
      model: 'Category',
      select: { _id: 1, name: 1, pack: 1 },
      options: { sort: { createdAt: 1 } },
      populate: {
        path: 'pack',
        model: 'Pack',
        select: { _id: 1, name: 1, isChecked: 1 },
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

    const cate = await Category.findById(categoryId);
    if (!cate) return 'no_category';

    const list = await TogetherPackingList.findById(listId);
    if (!list) return 'no_list';

    // list의 category 배열에 존재하지 않는 categoryId인 경우
    if (!list.category.includes(categoryId)) return 'no_list_category';

    await Category.updateOne(
      { _id: categoryId },
      {
        $set: {
          name: categoryName,
        },
      },
    );

    const data = await TogetherPackingList.findOne({ _id: listId }, { category: 1 }).populate({
      path: 'category',
      model: 'Category',
      select: { _id: 1, name: 1, pack: 1 },
      options: { sort: { createdAt: 1 } },
      populate: {
        path: 'pack',
        model: 'Pack',
        select: { _id: 1, name: 1, isChecked: 1 },
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

    const cate = await Category.findById(cateId);
    if (!cate) return 'no_category';

    const list = await TogetherPackingList.findById(lId);
    if (!list) return 'no_list';

    const categories = list.category;
    const packs = cate.pack;

    // list의 category 배열에 존재하지 않는 categoryId인 경우
    if (!categories.includes(cateId)) return 'no_list_category';

    await Pack.deleteMany({ _id: { $in: packs } });
    await Category.deleteOne({ _id: cateId });

    categories.splice(categories.indexOf(cateId));

    await TogetherPackingList.updateOne(
      { _id: listId },
      {
        $set: {
          category: categories,
        },
      },
    );

    const data = await TogetherPackingList.findOne({ _id: listId }, { category: 1 }).populate({
      path: 'category',
      model: 'Category',
      select: { _id: 1, name: 1, pack: 1 },
      options: { sort: { createdAt: 1 } },
      populate: {
        path: 'pack',
        model: 'Pack',
        select: { _id: 1, name: 1, isChecked: 1 },
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
