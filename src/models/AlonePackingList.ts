import mongoose from 'mongoose';
import { AlonePackingListInfo } from '../interface/alonePackingList/AlonePackingListInfo';

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
    },
    packRemainNum: {
      type: Number,
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
    remainDay: {
      type: Number,
    },
  },
  { timestamps: true },
);
export default mongoose.model<AlonePackingListInfo & mongoose.Document>(
  'AlonePackingList',
  AlonePackingListSchema,
);
