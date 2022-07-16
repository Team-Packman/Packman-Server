import mongoose from 'mongoose';

export interface ICategory {
  name: string;
  packIdArray: mongoose.Types.ObjectId[];
}
