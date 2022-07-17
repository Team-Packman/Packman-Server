import mongoose from 'mongoose';

export interface ICategory {
  name: string;
  packIdArray: mongoose.Types.ObjectId[];
}

export interface CategoryUpdateDto {
  id: mongoose.Types.ObjectId;
  name: string;
  listId: mongoose.Types.ObjectId;
}

export interface CategoryDeleteDto {
  listId: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
}
