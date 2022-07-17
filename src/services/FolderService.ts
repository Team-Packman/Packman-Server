import { FolderInfo, FolderCreateDto, FolderResponseDto } from '../interface/IFolderInfo';
import Folder from '../models/Folder';
import { CategoryInfo } from '../interface/ICategoryInfo';
import AlonePackingList from '../models/AlonePackingList';
import Category from '../models/Category';
import Folder from '../models/Folder';
import Pack from '../models/Pack';
import TogetherPackingList from '../models/TogetherPackingList';
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





const deleteFolder = async (
  userId: string,
  folderId: string,
): Promise<FolderResponseDto | null> => {
  try {
    const folder = await Folder.findById(folderId);
    if (!folder) return null;
    var packingListArray = folder.packingListArray;
    if (folder.isAloned) {
      await AlonePackingList.findByIdAndUpdate({ $in: packingListArray } ,{ $set: { isDeleted: true } });
    } else {
      await TogetherPackingList.findByIdAndUpdate({ $in: packingListArray } , { $set: { isDeleted: true } } );
    }
    await Folder.findByIdAndDelete(folderId);
    const data = await folderResponse(userId);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createFolder,
  deleteFolder,
};
