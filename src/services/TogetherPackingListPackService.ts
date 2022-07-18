import TogetherPackingList from '../models/TogetherPackingList';
import { PackCreateDto } from '../interface/IPack';
import Pack from '../models/Pack';
import Category from '../models/Category';
import { PackUpdateDto } from '../interface/IPack';
import mongoose from 'mongoose';

const createPack = async (packCreateDto: PackCreateDto) => {
  try {
    const listId = packCreateDto.listId;
    const categoryId = packCreateDto.categoryId;

    const cate = await Category.findById(categoryId);
    if (!cate) return 'no_category';

    const list = await TogetherPackingList.findById(listId);
    if (!list) return 'no_list';

    if (!list.category.includes(categoryId)) return 'no_list_category';

    const newPack = new Pack({ name: packCreateDto.name });
    await newPack.save();

    await Category.findByIdAndUpdate(categoryId, {
      $push: { pack: newPack.id },
    });

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

const updatePack = async (packUpdateDto: PackUpdateDto) => {
  try {
    const packId = packUpdateDto.id;
    const packName = packUpdateDto.name;
    const isChecked = packUpdateDto.isChecked;
    const listId = packUpdateDto.listId;
    const categoryId = packUpdateDto.categoryId;

    const pack = await Pack.findById(packId);
    if (!pack) return 'no_pack';

    const cate = await Category.findById(categoryId);
    if (!cate) return 'no_category';

    const list = await TogetherPackingList.findById(listId);
    if (!list) return 'no_list';

    if (!list.category.includes(categoryId)) return 'no_list_category';
    if (!cate.pack.includes(packId)) return 'no_category_pack';

    await Pack.updateOne(
      { _id: packId },
      {
        $set: {
          name: packName,
          isChecked: isChecked,
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
const deletePack = async (listId: string, categoryId: string, packId: string): Promise<string> => {
  try {
    const lId = new mongoose.Types.ObjectId(listId);
    const cateId = new mongoose.Types.ObjectId(categoryId);
    const pId = new mongoose.Types.ObjectId(packId);

    const pack = await Pack.findById(pId);
    if (!pack) return 'no_pack';

    const cate = await Category.findById(cateId);
    if (!cate) return 'no_category';

    const list = await TogetherPackingList.findById(lId);
    if (!list) return 'no_list';

    if (!list.category.includes(cateId)) return 'no_list_category';
    if (!cate.pack.includes(pId)) return 'no_category_pack';

    const packs = cate.pack;

    await Pack.deleteOne({ _id: pId });
    packs.splice(packs.indexOf(pId));

    await Category.updateOne(
      { _id: cateId },
      {
        $set: {
          pack: packs,
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
  createPack,
  updatePack,
  deletePack,
};
