import mongoose from 'mongoose';
import { IGroup } from '../interface/IGroup';

const GroupSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { versionKey: false },
);

export default mongoose.model<IGroup & mongoose.Document>('Group', GroupSchema);
