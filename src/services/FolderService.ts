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
      var packingListArrayObjs = await AlonePackingList.find({ _id: { $in: packingListArray } });
    } else {
      var packingListArrayObjs = await TogetherPackingList.find({
        _id: { $in: packingListArray },
      });
    }

    const categoryIdArray = await packingListArrayObjs.reduce(
      (tmp, x) => [...tmp, ...x.categoryIdArray],
      [],
    );
    const categoryObjs = await Category.find({ _id: { $in: categoryIdArray } });
    const packIdArray = await categoryObjs.reduce((tmp, x) => [...tmp, ...x.packIdArray], []);

    await Pack.deleteMany({ _id: { $in: packIdArray } });
    await Category.deleteMany({ _id: { $in: categoryIdArray } });
    if (folder.isAloned) {
      await AlonePackingList.deleteMany({ _id: { $in: packingListArray } });
    } else {
      await TogetherPackingList.deleteMany({ _id: { $in: packingListArray } });
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
