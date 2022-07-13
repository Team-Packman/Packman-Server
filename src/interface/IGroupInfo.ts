import mongoose from 'mongoose';

export interface GroupInfo {
  userIdArray: mongoose.Types.ObjectId[];
}
