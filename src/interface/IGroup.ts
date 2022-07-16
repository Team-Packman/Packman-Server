import mongoose from 'mongoose';

export interface IGroup {
  userIdArray: mongoose.Types.ObjectId[];
}
