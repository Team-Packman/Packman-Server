import TogetherPackingList from '../models/TogetherPackingList';
import { TogetherPackingListPackCreateDto } from '../interface/ITogetherPackingList';
import Pack from '../models/Pack';
import Category from '../models/Category';

const createPack = async (togetherPackingListPackCreateDto: TogetherPackingListPackCreateDto) => {
  try {
    const listId = togetherPackingListPackCreateDto.listId;
    const categoryId = togetherPackingListPackCreateDto.categoryId;

    const cate = await Category.findById(categoryId);
    if (!cate) return 'no_category';

    const list = await TogetherPackingList.findById(listId);
    if (!list) return 'no_list';

    if (!list.category.includes(categoryId)) return 'no_list_category';

    const newPack = new Pack({ name: togetherPackingListPackCreateDto.name });
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
export default {
  createPack,
};
