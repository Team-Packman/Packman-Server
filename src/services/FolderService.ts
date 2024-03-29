import {
  FolderCreateDto,
  AllFolderResponseDto,
  FolderResponseDto,
  FolderUpdateDto,
} from '../interface/IFolder';
import Folder from '../models/Folder';
import AlonePackingList from '../models/AlonePackingList';
import TogetherPackingList from '../models/TogetherPackingList';
import { folderResponse } from '../modules/folderResponse';
import mongoose from 'mongoose';
import { TogetherListInFolderResponseDto } from '../interface/ITogetherPackingList';
import { AloneListInFolderResponseDto } from '../interface/IAlonePackingList';
import { RecentCreatedPackingListDto } from '../interface/IPackingList';
import dayjs from 'dayjs';

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
): Promise<AllFolderResponseDto | null> => {
  try {
    const folders = await Folder.findByIdAndUpdate(folderUpdateDto._id, {
      $set: { title: folderUpdateDto.title },
    });
    if (!folders) return null;
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
    const packingListArray = folder.list;
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

const getTogetherListInFolders = async (
  userId: string,
  folderId: string,
): Promise<TogetherListInFolderResponseDto | null> => {
  try {
    const folders = await Folder.find({ userId: userId, isAloned: false });
    const currentFd = await Folder.findById(folderId);
    if (!currentFd) return null;
    const currentTitle = currentFd.title;
    const currentFolder = {
      _id: folderId,
      title: currentTitle,
    };

    const folder: {
      _id: mongoose.Types.ObjectId;
      title: string;
    }[] = [];

    folders.map((fd) => {
      const tmp = {
        _id: fd.id,
        title: fd.title,
      };
      folder.push(tmp);
    });

    const lists: {
      _id: string;
      title: string;
      departureDate: string;
      packTotalNum: number;
      packRemainNum: number;
    }[] = [];

    for await (const lt of currentFd.list) {
      const list = await TogetherPackingList.findById(lt);
      if (!list) return null;
      const data = {
        _id: list._id,
        title: list.title,
        departureDate: list.departureDate,
        packTotalNum: list.packTotalNum,
        packRemainNum: list.packRemainNum,
      };
      lists.push(data);
    }
    const listNum = lists.length;

    const data: TogetherListInFolderResponseDto | null = {
      currentFolder: currentFolder,
      folder: folder,
      listNum: listNum,
      togetherPackingList: lists,
    };
    if (!data) return null;
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAloneListInFolders = async (
  userId: string,
  folderId: string,
): Promise<AloneListInFolderResponseDto | null> => {
  try {
    const folders = await Folder.find({ userId: userId, isAloned: true });
    const currentFd = await Folder.findById(folderId);
    if (!currentFd) return null;
    const currentFolder = {
      _id: folderId,
      title: currentFd.title,
    };

    const folder: {
      _id: mongoose.Types.ObjectId;
      title: string;
    }[] = [];

    for await (const element of folders) {
      const tmp = {
        _id: element.id,
        title: element.title,
      };
      folder.push(tmp);
    }

    const lists: {
      _id: string;
      title: string;
      departureDate: string;
      packTotalNum: number;
      packRemainNum: number;
    }[] = [];

    for await (const listId of currentFd.list) {
      const list = await AlonePackingList.findById(listId);
      if (!list) return null;
      const data = {
        _id: list._id,
        title: list.title,
        departureDate: list.departureDate,
        packTotalNum: list.packTotalNum,
        packRemainNum: list.packRemainNum,
      };
      lists.push(data);
    }

    const listNum = lists.length;

    const data: AloneListInFolderResponseDto | null = {
      currentFolder: currentFolder,
      folder: folder,
      listNum: listNum,
      alonePackingList: lists,
    };
    if (!data) return null;
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getRecentCreatedList = async (
  userId: string,
): Promise<RecentCreatedPackingListDto | null | string> => {
  try {
    const folders = await Folder.find({ userId: userId });
    if (folders.length === 0) return '204';

    const list: {
      _id: mongoose.Types.ObjectId;
      aloneFolder: boolean;
      createdAt: Date;
    }[] = [];

    for await (const fd of folders) {
      if (fd.list.length !== 0) {
        for await (const fl of fd.list) {
          // 혼자 패킹리스트 폴더
          if (fd.isAloned) {
            const alone = await AlonePackingList.findById(fl);
            if (!alone) return null;
            const data = {
              _id: alone._id,
              aloneFolder: true,
              createdAt: alone.createdAt,
            };
            list.push(data);
          } else {
            // 함께 패킹리스트 폴더
            const together = await TogetherPackingList.findById(fl);
            if (!together) return null;
            const data = {
              _id: together._id,
              aloneFolder: false,
              createdAt: together.createdAt,
            };
            list.push(data);
          }
        }
      }
    }
    if (list.length === 0) return '204';
    list.sort(function (a, b) {
      if (a.createdAt > b.createdAt) return -1;
      else return 1;
    });
    const recentListId = list[0]._id;
    let remainDay;
    let recentList;
    let url = '';
    // alone 폴더에서 추가된 list
    if (list[0].aloneFolder) {
      recentList = await AlonePackingList.findById(recentListId);
      if (!recentList) return null;
      remainDay = dayjs(recentList.departureDate).diff(dayjs(), 'day');
      url = `${url}/alone/${recentListId}`;
      const data: RecentCreatedPackingListDto | null = {
        _id: recentListId,
        title: recentList.title,
        remainDay: remainDay,
        packTotalNum: recentList.packTotalNum,
        packRemainNum: recentList.packRemainNum,
        url: url,
      };
      return data;
    } else {
      // together 폴더에서 추가된 list
      recentList = await TogetherPackingList.findById(recentListId);
      if (!recentList) return null;
      remainDay = dayjs(recentList.departureDate).diff(dayjs(), 'day');
      url = `${url}/together/${recentListId}`;
      const data: RecentCreatedPackingListDto | null = {
        _id: recentListId,
        title: recentList.title,
        remainDay: remainDay,
        packTotalNum: recentList.packTotalNum,
        packRemainNum: recentList.packRemainNum,
        url: url,
      };
      return data;
    }
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
  getTogetherListInFolders,
  getAloneListInFolders,
  getRecentCreatedList,
};
