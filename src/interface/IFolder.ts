import mongoose from 'mongoose';

export interface IFolder {
  title: string;
  isAloned: boolean;
  userId: mongoose.Types.ObjectId;
  listNum: number;
  packingListArray: mongoose.Types.ObjectId[];
}
