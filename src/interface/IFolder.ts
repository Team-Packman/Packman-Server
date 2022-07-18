import mongoose from 'mongoose';

export interface IFolder {
  title: string;
  isAloned: boolean;
  userId: mongoose.Types.ObjectId;
  listNum: number;
  list: mongoose.Types.ObjectId[];
}

export interface FolderCreateDto {
  title: string;
  isAloned: boolean;
}
export interface FolderUpdateDto {
  _id: string;
  title: string;
}
export interface AllFolderResponseDto {
  aloneFolders: {
    _id: mongoose.Schema.Types.ObjectId;
    title: string;
    listNum: number;
  }[];
  togetherFolders: {
    _id: mongoose.Schema.Types.ObjectId;
    title: string;
    listNum: number;
  }[];
}

export interface FolderResponseDto {
    _id: mongoose.Schema.Types.ObjectId;
    title: string;
}