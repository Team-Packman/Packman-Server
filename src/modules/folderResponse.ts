import Folder from '../models/Folder';

async function folderResponse(userId: string) {
  const folders = await Folder.find({ userId: userId });
  const aloneFolders: any[] = [];
  const togetherFolders: any[] = [];
  await folders.map((folder) => {
    const data = {
      _id: folder.id,
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
}

export { folderResponse };
