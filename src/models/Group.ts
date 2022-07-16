import mongoose from 'mongoose';
import { GroupInfo } from '../interface/IGroupInfo';

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

export default mongoose.model<GroupInfo & mongoose.Document>('Group', GroupSchema);
