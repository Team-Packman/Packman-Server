import mongoose from 'mongoose';
import { GroupInfo } from '../interface/IGroupInfo';
import User from './User';

const GroupSchema = new mongoose.Schema({
  userIdArray: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  ],
});

export default mongoose.model<GroupInfo & mongoose.Document>('Group', GroupSchema);
