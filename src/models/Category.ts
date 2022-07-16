import mongoose from 'mongoose';
import { CategoryInfo } from '../interface/ICategoryInfo';

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    packIdArray: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Pack',
      },
    ],
  },
  { timestamps: true, versionKey: false },
);

export default mongoose.model<CategoryInfo & mongoose.Document>('Category', CategorySchema);
