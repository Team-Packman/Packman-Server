import mongoose from 'mongoose';

export interface PackInfo {
  name: string;
  isChecked: boolean;
  packerId: mongoose.Types.ObjectId;
}
