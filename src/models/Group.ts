import mongoose from 'mongoose';
import { IGroup } from '../interface/IGroup';

const GroupSchema = new mongoose.Schema(
  {
    userIdArray: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { versionKey: false },
);

export default mongoose.model<IGroup & mongoose.Document>('Group', GroupSchema);
