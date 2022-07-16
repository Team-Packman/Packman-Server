import mongoose from 'mongoose';
import { ITemplate } from '../interface/ITemplate';

const TemplateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    categoryIdArray: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
      },
    ],
    isAloned: {
      type: Boolean,
      required: true,
    },
    isHelped: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export default mongoose.model<ITemplate & mongoose.Document>('Template', TemplateSchema);
