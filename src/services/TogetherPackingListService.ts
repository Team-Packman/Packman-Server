import {
  TogetherMyPackingListResponseDTO,
  TogetherPackingListCategoryResponseDto,
  TogetherPackingListCreateDTO,
  TogetherPackingListResponseDTO,
} from '../interface/ITogetherPackingList';
import { PackingListResponseDTO } from '../interface/IPackingList';
import AlonePackingList from '../models/AlonePackingList';
import Category from '../models/Category';
import Folder from '../models/Folder';
import Group from '../models/Group';
import Template from '../models/Template';
import TogetherPackingList from '../models/TogetherPackingList';
import PackingListController from '../controllers/PackingListController';
import PackingListService from './PackingListService';
import { PackerUpdateDto } from '../interface/IPack';
import Pack from '../models/Pack';
import User from '../models/User';
import { togetherMyListResponse, togetherListResponse } from '../modules/togetherListResponse';
import MemberService from './MemberService';
import mongoose from 'mongoose';
import { GroupResponseDto } from '../interface/IGroup';

const createTogetherPackingList = async (
  togetherPackingListCreateDto: TogetherPackingListCreateDTO,
): Promise<
  | {
      title: string;
      departureDate: string;
      togetherPackingList: TogetherPackingListResponseDTO;
      myPackingList: TogetherMyPackingListResponseDTO;
    }
  | string
> => {
  try {
    const duplicatedData = await TogetherPackingList.findOne({
      title: togetherPackingListCreateDto.title,
    });
    if (duplicatedData) return 'duplication';

    const group = new Group({
      members: [],
    });
    await group.save();

    let inviteCode = await PackingListController.generateInviteCode();
    while (await PackingListService.getPackingByInviteCode(inviteCode)) {
      inviteCode = await PackingListController.generateInviteCode();
    }

    const togetherPackingList = new TogetherPackingList({
      title: togetherPackingListCreateDto.title,
      departureDate: togetherPackingListCreateDto.departureDate,
      groupId: group.id,
      inviteCode: inviteCode,
    });

    if (!togetherPackingListCreateDto.templateId) {
      togetherPackingList.category = [];
    } else {
      const innerTemplate = await Template.findById(togetherPackingListCreateDto.templateId);
      if (innerTemplate) {
        togetherPackingList.category = innerTemplate.category;
        for await (const element of togetherPackingList.category) {
          const myCategory = await Category.findById(element);
          if (!myCategory) return 'notfoundCategory';
          togetherPackingList.packTotalNum += myCategory.pack.length;
          togetherPackingList.packRemainNum += myCategory.pack.length;
        }
      } else return 'notfoundTemplate';
    }

    const alonePackingList = new AlonePackingList({
      title: togetherPackingListCreateDto.title,
      departureDate: togetherPackingListCreateDto.departureDate,
      category: [],
      isAloned: false,
    });
    await alonePackingList.save();

    togetherPackingList.myPackingListId = alonePackingList.id;
    await togetherPackingList.save();

    await Folder.findByIdAndUpdate(togetherPackingListCreateDto.folderId, {
      $push: { list: togetherPackingList.id },
    });

    const togetherData: TogetherPackingListResponseDTO | null = await togetherListResponse(
      togetherPackingList.id,
    );

    const aloneData: TogetherMyPackingListResponseDTO | null = await togetherMyListResponse(
      alonePackingList.id,
    );

    if (!togetherData || !aloneData) return 'notfoundList';

    const response = {
      title: togetherPackingList.title,
      departureDate: togetherPackingList.departureDate,
      togetherPackingList: togetherData,
      myPackingList: aloneData,
    };
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const readTogetherPackingList = async (
  listId: string,
  userId: string,
): Promise<
  | {
      title: string;
      departureDate: string;
      togetherPackingList: TogetherPackingListResponseDTO;
      myPackingList: TogetherMyPackingListResponseDTO;
      group: {
        _id: string;
        members: GroupResponseDto[];
      };
    }
  | string
> => {
  try {
    const togetherData: TogetherPackingListResponseDTO | null = await TogetherPackingList.findOne(
      { _id: listId },
      { category: 1, isSaved: 1, groupId: 1, inviteCode: 1 },
    ).populate({
      path: 'category',
      model: 'Category',
      select: { _id: 1, name: 1, pack: 1 },
      options: { sort: { createdAt: 1 } },
      populate: {
        path: 'pack',
        model: 'Pack',
        select: { _id: 1, name: 1, isChecked: 1, packer: 1 },
        options: { sort: { createdAt: 1 } },
        populate: {
          path: 'packer',
          model: 'User',
          select: {
            _id: 1,
            name: 1,
          },
        },
      },
    });

    const togetherRawData = await TogetherPackingList.findById(listId);

    if (!togetherRawData) return 'notfoundList';
    const aloneData: TogetherMyPackingListResponseDTO | null = await togetherMyListResponse(
      togetherRawData.myPackingListId,
    );

    if (!togetherData || !aloneData) return 'notfoundList';

    const response = {
      title: togetherRawData.title,
      departureDate: togetherRawData.departureDate,
      togetherPackingList: togetherData,
      myPackingList: aloneData,
      group: {
        _id: togetherData.groupId.toString(),
        members: (await MemberService.getMembers(
          userId,
          togetherData.groupId,
        )) as GroupResponseDto[],
      },
    };
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteTogetherPackingList = async (
  folderId: string,
  listId: string,
): Promise<
  | {
      togetherPackingList: PackingListResponseDTO[];
    }
  | string
> => {
  try {
    const deleteLists = listId.split(',');
    const data = [];
    const strlists = [];

    const responseFolder = await Folder.findById(folderId);
    if (!responseFolder) return 'notfoundFolder';

    for await (const element of responseFolder.list) {
      strlists.push(element.toString());
    }

    for await (const element of deleteLists) {
      const deleteList = await TogetherPackingList.findByIdAndUpdate(element, {
        isDeleted: true,
      });
      if (!deleteList) return 'notfoundList';
      await AlonePackingList.findByIdAndUpdate(deleteList.myPackingListId, {
        isDeleted: true,
      });
      responseFolder.list.splice(strlists.indexOf(element), 1);
    }

    await Folder.findByIdAndUpdate(folderId, {
      list: responseFolder.list,
    });

    for await (const element of responseFolder.list) {
      const responseList = await TogetherPackingList.findById(element);
      if (responseList) {
        const innerData: PackingListResponseDTO = {
          _id: responseList.id,
          departureDate: responseList.departureDate,
          title: responseList.title,
          packTotalNum: responseList.packTotalNum,
          packRemainNum: responseList.packRemainNum,
        };
        data.push(innerData);
      }
    }

    return { togetherPackingList: data };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updatePacker = async (
  packerUpdateDto: PackerUpdateDto,
): Promise<TogetherPackingListCategoryResponseDto | string> => {
  try {
    const listId = packerUpdateDto.listId;
    const packId = packerUpdateDto.packId;
    const packerId = packerUpdateDto.packerId;

    const list = await TogetherPackingList.findById(listId);
    if (!list) return 'no_list';

    const pack = await Pack.findById(packId);
    if (!pack) return 'no_pack';

    const packer = await User.findById(packerId);
    if (!packer) return 'no_packer';

    const category = list.category;
    const packs = [];

    for await (const cate of category) {
      const cat = await Category.findById(cate);
      if (cat) {
        for await (const pk of cat.pack) {
          packs.push(pk.toString());
        }
      }
    }

    if (!packs.includes(packId.toString())) return 'no_user_pack';

    await Pack.updateOne(
      { _id: packId },
      {
        $set: {
          packer: packerId,
        },
      },
    );

    const data: TogetherPackingListCategoryResponseDto | null = await TogetherPackingList.findOne(
      { _id: listId },
      { category: 1 },
    ).populate({
      path: 'category',
      model: 'Category',
      select: { _id: 1, name: 1, pack: 1 },
      options: { sort: { createdAt: 1 } },
      populate: {
        path: 'pack',
        model: 'Pack',
        select: { _id: 1, name: 1, isChecked: 1, packer: 1 },
        options: { sort: { createdAt: 1 } },
        populate: {
          path: 'packer',
          model: 'User',
          select: {
            _id: 1,
            name: 1,
          },
        },
      },
    });
    if (!data) return 'null';
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createTogetherPackingList,
  readTogetherPackingList,
  deleteTogetherPackingList,
  updatePacker,
};
