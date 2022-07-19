import mongoose from 'mongoose';

export interface IGroup {
  members: mongoose.Types.ObjectId[];
}
