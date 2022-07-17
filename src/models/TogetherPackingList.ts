import mongoose from 'mongoose';
import { ITogetherPackingList } from '../interface/ITogetherPackingList';

const TogetherPackingListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isSaved: {
      type: Boolean,
      default: false,
    },
    departureDate: {
      type: Date,
      required: true,
    },
    packTotalNum: {
      type: Number,
      default: 0,
    },
    packRemainNum: {
      type: Number,
      default: 0,
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
