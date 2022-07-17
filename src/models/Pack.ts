import mongoose from 'mongoose';
import { IPack } from '../interface/IPack';

const PackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isChecked: {
      type: Boolean,
      default: false,
    },
    packer: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: false },
);

export default mongoose.model<IPack & mongoose.Document>('Pack', PackSchema);
