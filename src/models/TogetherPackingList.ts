import mongoose from 'mongoose';
import { TogetherPackingListInfo } from '../interface/ITogetherPackingListInfo';
import AlonePackingList from './AlonePackingList';
import Category from './Category';

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
  { timestamps: true },
);
export default mongoose.model<TogetherPackingListInfo & mongoose.Document>(
  'TogetherPackingList',
  TogetherPackingListSchema,
);
