import mongoose from 'mongoose';
import { PackInfo } from '../interface/IPackInfo';

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
    packerId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export default mongoose.model<PackInfo & mongoose.Document>('Pack', PackSchema);
