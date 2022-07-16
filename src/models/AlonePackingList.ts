import mongoose from 'mongoose';
import { IAlonePackingList } from '../interface/IAlonePackingList';

const AlonePackingListSchema = new mongoose.Schema(
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
      default: 0,
    },
    packRemainNum: {
      type: Number,
      default: 0,
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
  },
  { timestamps: true, versionKey: false },
);
export default mongoose.model<IAlonePackingList & mongoose.Document>(
  'AlonePackingList',
  AlonePackingListSchema,
);
