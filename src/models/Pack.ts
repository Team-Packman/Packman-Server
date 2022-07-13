import mongoose from 'mongoose';
import { PackInfo } from '../interface/pack/PackInfo';

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
    },
  },
  { timestamps: true },
);

export default mongoose.model<PackInfo & mongoose.Document>('Pack', PackSchema);
