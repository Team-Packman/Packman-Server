import mongoose from 'mongoose';
import { ITogetherPackingList } from '../interface/ITogetherPackingList';

const TogetherPackingListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
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
    category: [
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
    inviteCode: {
      type: String,
      required: true,
    },
    isSaved: {
      type: Boolean,
      default: false,
    },
    inviteCode: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: false },
);
export default mongoose.model<ITogetherPackingList & mongoose.Document>(
  'TogetherPackingList',
  TogetherPackingListSchema,
);
