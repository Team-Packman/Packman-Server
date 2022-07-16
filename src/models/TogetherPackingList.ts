import mongoose from 'mongoose';
import { ITogetherPackingList } from '../interface/ITogetherPackingList';

const TogetherPackingListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isSaved: {
      type: String,
      default: false,
    },
    departureDate: {
      type: Date,
      required: true,
    },
    packTotalNum: {
      type: Number,
    },
    packRemainNum: {
      type: Number,
    },
    groupId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Group',
    },
    categoryIdArray: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
    myPackingListId: {
      type: mongoose.Types.ObjectId,
      ref: 'AlonePackingList',
    },
  },
  { timestamps: true, versionKey: false },
);
export default mongoose.model<ITogetherPackingList & mongoose.Document>(
  'TogetherPackingList',
  TogetherPackingListSchema,
);
