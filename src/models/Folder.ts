import mongoose from 'mongoose';
import { FolderInfo } from '../interface/IFolderInfo';

const FolderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isAloned: {
      type: Boolean,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    listNum: {
      type: Number,
      default: 0,
    },
    packingListArray: [
      {
        type: mongoose.Types.ObjectId,
        refPath: 'listModel',
      },
    ],
    listModel: {
      type: String,
      required: true,
      enum: ['AlonePackingList', 'TogetherPackingList'],
    },
  },
  { timestamps: true },
);
export default mongoose.model<FolderInfo & mongoose.Document>('Folder', FolderSchema);
