import { FolderCreateDto, FolderResponseDto } from '../interface/IFolderInfo';
import Folder from '../models/Folder';
import { folderResponse } from '../modules/folderResponse';

const createFolder = async (userId: string, folderCreateDto: FolderCreateDto): Promise<FolderResponseDto> => {
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

export default {
  createFolder,
};
