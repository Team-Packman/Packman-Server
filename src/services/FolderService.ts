import { CategoryInfo } from '../interface/ICategoryInfo';
import { FolderInfo, FolderResponseDto } from '../interface/IFolderInfo';
import AlonePackingList from '../models/AlonePackingList';
import Category from '../models/Category';
import Folder from '../models/Folder';
import Pack from '../models/Pack';
import TogetherPackingList from '../models/TogetherPackingList';
import { folderResponse } from '../modules/folderResponse';

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
  deleteFolder,
};
