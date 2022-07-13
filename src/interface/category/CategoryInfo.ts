import mongoose from 'mongoose';

export interface CategoryInfo {
  name: string;
  packIdArray: mongoose.Types.ObjectId[];
}
