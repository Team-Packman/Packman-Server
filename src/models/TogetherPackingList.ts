import mongoose from 'mongoose';
import { TogetherPackingListInfo } from '../interface/togetherPackingList/TogetherPackingListInfo';

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
    },
    categoryIdArray: [
      {
        type: mongoose.Types.ObjectId,
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
    myPackingListId: {
      type: mongoose.Types.ObjectId,
    },
    remainDay: {
      type: Number,
    },
  },
  { timestamps: true },
);
export default mongoose.model<TogetherPackingListInfo & mongoose.Document>(
  'TogetherPackingList',
  TogetherPackingListSchema,
);
