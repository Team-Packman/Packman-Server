import mongoose from 'mongoose';
import { TemplateInfo } from '../interface/ITemplateInfo';

const TemplateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    categoryIdArray: [
      {
        type: mongoose.Types.ObjectId,
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
  { timestamps: true },
);

export default mongoose.model<TemplateInfo & mongoose.Document>('Template', TemplateSchema);
