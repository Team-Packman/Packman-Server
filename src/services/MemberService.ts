import { GroupResponseDto } from '../interface/IGroup';
import Group from '../models/Group';
import mongoose from 'mongoose';
import User from '../models/User';

const getMembers = async (userId: string, groupId: string): Promise<GroupResponseDto[] | null> => {
  try {
    const group = await Group.findById(groupId);
    if (!group) return null;
    const master = await User.findById(userId);
    if (!master) return null;
    let idx = 0;
    let target;
    console.log(master._id);

    const data = await Promise.all(
      group.members.map(async (memberId) => {
        const mem = await User.findById(memberId);
        const memToString = mem?._id.toString();
        const masterToString = master?._id.toString();
        if (memToString === masterToString) {
          target = idx;
        }
        idx += 1;
        const data: GroupResponseDto = {
          _id: mem?._id,
          nickname: mem?.name as string,
          profileImageId: mem?.profileImageId as string,
        };
        return data;
      }),
    );
    if (!target) {
      return null; // 유저가 멤버에 없을 때
    }
    const swap = data[target];
    data[target] = data[0];
    data[0] = swap;

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  getMembers,
};
