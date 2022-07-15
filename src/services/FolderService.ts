import { FolderCreateDto } from '../interface/IFolderInfo';
import Folder from '../models/Folder';

const createFolder = async (userId: string, folderCreateDto: FolderCreateDto) => {
  try {
    const folder = new Folder({
      title: folderCreateDto.title,
      isAloned: folderCreateDto.isAloned,
      userId: userId,
      listNum: 0,
      packingListArray: [],
      listModel: folderCreateDto.isAloned ? "AlonePackingList" : "TogetherPackingList"
    });
    await folder.save();
    const folders = await Folder.find({ userId: userId });
    const aloneFolders: any[] = [];
    const togetherFolders: any[] = [];
    await folders.map((folder) => {
      const data = {
        id: folder.id,
        title: folder.title,
        listNum: folder.listNum,
      };
      if (folder.isAloned === true) {
        aloneFolders.push(data);
      } else {
        togetherFolders.push(data);
      }
    });

    return {
      aloneFolders: aloneFolders,
      togetherFolders: togetherFolders,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createFolder,
};
