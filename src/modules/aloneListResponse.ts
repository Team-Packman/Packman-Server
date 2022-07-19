import mongoose from 'mongoose';
import { AlonePackingListResponseDTO } from '../interface/IAlonePackingList';
import AlonePackingList from '../models/AlonePackingList';

async function aloneListResponse(
  listId: mongoose.Types.ObjectId | string,
): Promise<AlonePackingListResponseDTO | null> {
  const data: AlonePackingListResponseDTO | null = await AlonePackingList.findOne(
    { _id: listId },
    { title: 1, departureDate: 1, isSaved: 1, category: 1 },
  ).populate({
    path: 'category',
    model: 'Category',
    options: { sort: { createdAt: 1 } },
    select: { _id: 1, name: 1, pack: 1 },
    populate: {
      path: 'pack',
      model: 'Pack',
      select: { _id: 1, name: 1, isChecked: 1, packer: 1 },
      options: { sort: { createdAt: 1 } },
    },
  });

  return data;
}

export { aloneListResponse };
