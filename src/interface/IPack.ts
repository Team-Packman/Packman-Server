import mongoose from 'mongoose';

export interface IPack {
  name: string;
  isChecked: boolean;
  packer: mongoose.Types.ObjectId;
}
