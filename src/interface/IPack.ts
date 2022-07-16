import mongoose from 'mongoose';

export interface IPack {
  name: string;
  isChecked: boolean;
  packerId: mongoose.Types.ObjectId;
}
