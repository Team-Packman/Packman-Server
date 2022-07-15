import mongoose from 'mongoose';

export interface FolderInfo {
  title: string;
  isAloned: boolean;
  userId: mongoose.Types.ObjectId;
  listNum: number;
  packingListArray: mongoose.Types.ObjectId[];
}

export interface FolderCreateDto {
  title: string;
  isAloned: boolean;
}

export interface FolderResponseDto {
  aloneFolders : {
    id: mongoose.Schema.Types.ObjectId;
    title: string;
    listNum: number;
  }[];
  togetherFolders : {
    id: mongoose.Schema.Types.ObjectId;
    title: string;
    listNum: number;
  }[];
}