import mongoose from 'mongoose';

export interface IFolder {
  title: string;
  isAloned: boolean;
  userId: mongoose.Types.ObjectId;
  listNum: number;
  pack: mongoose.Types.ObjectId[];
}

export interface FolderCreateDto {
  title: string;
  isAloned: boolean;
}
export interface FolderUpdateDto {
  id: string;
  title: string;
}
export interface FolderResponseDto {
  aloneFolders: {
    id: mongoose.Schema.Types.ObjectId;
    title: string;
    listNum: number;
  }[];
  togetherFolders: {
    id: mongoose.Schema.Types.ObjectId;
    title: string;
    listNum: number;
  }[];
}
