import mongoose from 'mongoose';
import { ICategory } from '../interface/ICategory';

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    pack: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Pack',
      },
    ],
    createdAt: {
      type: Date,
      default: () => {
        return new Date();
      },
    },
  },
  { versionKey: false },
);

export default mongoose.model<ICategory & mongoose.Document>('Category', CategorySchema);
