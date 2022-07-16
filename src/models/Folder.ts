import mongoose from 'mongoose';
import { IFolder } from '../interface/IFolder';

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
  { timestamps: true, versionKey: false },
);
export default mongoose.model<IFolder & mongoose.Document>('Folder', FolderSchema);
