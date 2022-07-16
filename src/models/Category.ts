import mongoose from 'mongoose';
import { ICategory } from '../interface/ICategory';

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

export default mongoose.model<ICategory & mongoose.Document>('Category', CategorySchema);
