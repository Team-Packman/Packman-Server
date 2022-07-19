import mongoose from 'mongoose';

export interface IPack {
  name: string;
  isChecked: boolean;
  packer: mongoose.Types.ObjectId;
}

export interface PackCreateDto {
  name: string;
  categoryId: mongoose.Types.ObjectId;
  listId: mongoose.Types.ObjectId;
}
export interface PackUpdateDto {
  _id: mongoose.Types.ObjectId;
  name: string;
  isChecked: boolean;
  listId: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
}

export interface PackerUpdateDto {
  listId: mongoose.Types.ObjectId;
  packId: mongoose.Types.ObjectId;
  packerId: mongoose.Types.ObjectId;
}
