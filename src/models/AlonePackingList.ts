import mongoose from 'mongoose';
import { IAlonePackingList } from '../interface/IAlonePackingList';

const AlonePackingListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    departureDate: {
      type: String,
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
    isAloned: {
      type: Boolean,
      default: true,
    },
    isSaved: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: () => {
        return new Date();
      },
    },
    updatedAt: {
      type: Date,
      default: () => {
        return new Date();
      },
    },
  },
  { versionKey: false },
);
export default mongoose.model<IAlonePackingList & mongoose.Document>(
  'AlonePackingList',
  AlonePackingListSchema,
);
