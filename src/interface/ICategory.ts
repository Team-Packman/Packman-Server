import mongoose from 'mongoose';

export interface ICategory {
  name: string;
  pack: mongoose.Types.ObjectId[];
}

export interface CategoryCreateDto {
  name: string;
  listId: mongoose.Types.ObjectId;
}

export interface CategoryUpdateDto {
  _id: mongoose.Types.ObjectId;
  name: string;
  listId: mongoose.Types.ObjectId;
}

export interface CategoryDeleteDto {
  listId: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
}
