import { PackCreateDto } from '../interface/IPack';
import Pack from '../models/Pack';
import Category from '../models/Category';

import { AlonePackingListCategoryResponseDto } from '../interface/IAlonePackingList';
import AlonePackingList from '../models/AlonePackingList';

const createPack = async (
  packCreateDto: PackCreateDto,
): Promise<AlonePackingListCategoryResponseDto | string> => {
  try {
    const listId = packCreateDto.listId;
    const categoryId = packCreateDto.categoryId;

    const cate = await Category.findById(categoryId);
    if (!cate) return 'no_category';

    const list = await AlonePackingList.findById(listId);
    if (!list) return 'no_list';

    if (!list.category.includes(categoryId)) return 'no_list_category';

    const newPack = new Pack({ name: packCreateDto.name });
    await newPack.save();

    await Category.findByIdAndUpdate(categoryId, {
      $push: { pack: newPack.id },
    });

    const packTotal = list.packTotalNum + 1;
    const packRemain = list.packRemainNum + 1;
    await AlonePackingList.findByIdAndUpdate(listId, {
      $set: { packTotalNum: packTotal, packRemainNum: packRemain },
    });

    const data: AlonePackingListCategoryResponseDto | null = await AlonePackingList.findOne(
      { _id: listId },
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

    if (!data) return 'null';
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deletePack = async (
  listId: string,
  categoryId: string,
  packId: string,
): Promise<AlonePackingListCategoryResponseDto | string> => {
  try {
    const pack = await Pack.findById(packId);
    if (!pack) return 'no_pack';

    const cate = await Category.findById(categoryId);
    if (!cate) return 'no_category';

    const list = await AlonePackingList.findById(listId);
    if (!list) return 'no_list';

    const stringCate: string[] = [];
    const stringPack: string[] = [];

    list.category.map((cat) => {
      stringCate.push(cat.toString());
    });

    cate.pack.map((pk) => {
      stringPack.push(pk.toString());
    });

    if (!stringCate.includes(categoryId)) return 'no_list_category';
    if (!stringPack.includes(packId)) return 'no_category_pack';

    const packs = cate.pack;

    const packTotal = list.packTotalNum - 1;
    let packRemain = list.packRemainNum;
    if (!pack.isChecked) packRemain = list.packRemainNum - 1;

    await AlonePackingList.findByIdAndUpdate(listId, {
      $set: { packTotalNum: packTotal, packRemainNum: packRemain },
    });

    await Pack.deleteOne({ _id: packId });
    packs.splice(stringPack.indexOf(packId), 1);

    await Category.updateOne(
      { _id: categoryId },
      {
        $set: {
          pack: packs,
        },
      },
    );

    const data: AlonePackingListCategoryResponseDto | null = await AlonePackingList.findOne(
      { _id: listId },
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
    if (!data) return 'null';
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createPack,
  deletePack,
};
