import mongoose from 'mongoose';

export interface IPack {
  name: string;
  isChecked: boolean;
  packer: mongoose.Types.ObjectId;
}
export interface PackUpdateDto {
  id: mongoose.Types.ObjectId;
  name: string;
  isChecked: boolean;
  listId: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
}
