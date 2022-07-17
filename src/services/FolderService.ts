import { FolderResponseDto } from '../interface/IFolderInfo';
import AlonePackingList from '../models/AlonePackingList';
import Folder from '../models/Folder';
import TogetherPackingList from '../models/TogetherPackingList';
import { folderResponse } from '../modules/folderResponse';

const getFolders = async (userId: string): Promise<FolderResponseDto> => {
  try {
    const data = await folderResponse(userId);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  getFolders,
};
