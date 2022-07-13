import mongoose from 'mongoose';
import { CategoryInfo } from '../interface/category/CategoryInfo';

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    packIdArray: [
      {
        type: mongoose.Types.ObjectId,
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model<CategoryInfo & mongoose.Document>('Category', CategorySchema);
