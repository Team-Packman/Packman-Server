import { FolderUpdateDto } from '../interface/IFolder';
import { FolderCreateDto, FolderResponseDto } from '../interface/IFolder';
import Folder from '../models/Folder';
import { folderResponse } from '../modules/folderResponse';
import mongoose from 'mongoose';

const createFolder = async (
  userId: string,
  folderCreateDto: FolderCreateDto,
): Promise<FolderResponseDto> => {
  try {
    const folder = new Folder({
      title: folderCreateDto.title,
      isAloned: folderCreateDto.isAloned,
      userId: userId,
      listNum: 0,
      packingListArray: [],
      listModel: folderCreateDto.isAloned ? 'AlonePackingList' : 'TogetherPackingList',
    });
    await folder.save();

    const data = folderResponse(userId);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateFolder = async (
  userId: string,
  folderUpdateDto: FolderUpdateDto,
): Promise<FolderResponseDto> => {
  try {
    await Folder.findByIdAndUpdate(folderUpdateDto.id ,{ $set: { title: folderUpdateDto.title } });
    const data = await folderResponse(userId);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createFolder,
  updateFolder,
};
