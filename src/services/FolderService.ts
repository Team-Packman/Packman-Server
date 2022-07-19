import {
  FolderInfo,
  FolderCreateDto,
  AllFolderResponseDto,
  FolderResponseDto,
  FolderUpdateDto,
} from '../interface/IFolderInfo';
import Folder from '../models/Folder';
import { CategoryInfo } from '../interface/ICategoryInfo';
import AlonePackingList from '../models/AlonePackingList';
import Category from '../models/Category';
import Folder from '../models/Folder';
import Pack from '../models/Pack';
import TogetherPackingList from '../models/TogetherPackingList';
import { folderResponse } from '../modules/folderResponse';
import mongoose from 'mongoose';

const createFolder = async (
  userId: string,
  folderCreateDto: FolderCreateDto,
): Promise<AllFolderResponseDto> => {
  try {
    const folder = new Folder({
      title: folderCreateDto.title,
      isAloned: folderCreateDto.isAloned,
      userId: userId,
      listNum: 0,
      pack: [],
      listModel: folderCreateDto.isAloned ? 'AlonePackingList' : 'TogetherPackingList',
    });
    await folder.save();

    const data = await folderResponse(userId);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateFolder = async (
  userId: string,
  folderUpdateDto: FolderUpdateDto,
): Promise<AllFolderResponseDto> => {
  try {
    const folders = await Folder.findByIdAndUpdate(folderUpdateDto.id ,{ $set: { title: folderUpdateDto.title } });
    if(!folders) return null;
    const data = await folderResponse(userId);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteFolder = async (
  userId: string,
  folderId: string,
): Promise<AllFolderResponseDto | null> => {
  try {
    const folder = await Folder.findById(folderId);
    if (!folder) return null;
    const packingListArray = folder.pack;
    if (folder.isAloned) {
      await AlonePackingList.findByIdAndUpdate(
        { $in: packingListArray },
        { $set: { isDeleted: true } },
      );
    } else {
      await TogetherPackingList.findByIdAndUpdate(
        { $in: packingListArray },
        { $set: { isDeleted: true } },
      );
    }
    await Folder.findByIdAndDelete(folderId);
    const data = await folderResponse(userId);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getFolders = async (userId: string): Promise<AllFolderResponseDto> => {
  try {
    const data = await folderResponse(userId);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAloneFolders = async (userId: string): Promise<FolderResponseDto[]> => {
  try {
    const folders = await Folder.find({ $and: [{ userId: userId }, { isAloned: true }] });
    const data: FolderResponseDto[] = await folders.map((folder) => ({
      _id: folder.id,
      title: folder.title,
    }));
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getTogetherFolders = async (userId: string): Promise<FolderResponseDto[]> => {
  try {
    const folders = await Folder.find({ $and: [{ userId: userId }, { isAloned: false }] });
    const data: FolderResponseDto[] = await folders.map((folder) => ({
      _id: folder.id,
      title: folder.title,
    }));
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createFolder,
  updateFolder,
  deleteFolder,
  getFolders,
  getAloneFolders,
  getTogetherFolders,
};
