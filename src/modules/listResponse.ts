import mongoose from 'mongoose';
import {
  TogetherMyPackingListResponseDTO,
  TogetherPackingListResponseDTO,
} from '../interface/ITogetherPackingList';
import AlonePackingList from '../models/AlonePackingList';
import TogetherPackingList from '../models/TogetherPackingList';

async function togetherListResponse(
  listId: mongoose.Types.ObjectId,
): Promise<TogetherPackingListResponseDTO | null> {
  const data: TogetherPackingListResponseDTO | null = await TogetherPackingList.findOne(
    { _id: listId },
    { category: 1, isSaved: 1, groupId: 1 },
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

  return data;
}

async function aloneListResponse(
  listId: mongoose.Types.ObjectId,
): Promise<TogetherMyPackingListResponseDTO | null> {
  const data: TogetherMyPackingListResponseDTO | null = await AlonePackingList.findOne(
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
    },
  });

  return data;
}
