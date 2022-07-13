import mongoose from 'mongoose';
import { GroupInfo } from '../interface/group/GroupInfo';

const GroupSchema = new mongoose.Schema({
  userIdArray: [
    {
      type: mongoose.Types.ObjectId,
    },
  ],
});

export default mongoose.model<GroupInfo & mongoose.Document>('Group', GroupSchema);
