import { UserCreateDto, UserResponseDto, UserUpdateDto } from '../interface/IUser';

import User from '../models/User';

const createUser = async (userCreateDto: UserCreateDto): Promise<UserResponseDto | null> => {
  try {
    const existUser = await User.findOne({
      email: userCreateDto.email,
    });

    if (existUser) return null;
    const user = new User({
      email: userCreateDto.email,
      name: userCreateDto.name,
      profileImageId: userCreateDto.profileImageId,
    });
    await user.save();
    const data = {
      isAlreadyUser: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageId: user.profileImageId,
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getUserInfo = async (userId: string): Promise<UserResponseDto | null> => {
  try {
    const user = await User.findById(userId);
    if (!user) return null;
    const data = {
      _id: user.id,
      name: user.name,
      email: user.email,
      profileImageId: user.profileImageId,
    };
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateUser = async (
  userId: string,
  userUpdateDto: UserUpdateDto,
): Promise<UserResponseDto | null> => {
  try {
    await User.updateOne(
      { _id: userId },
      {
        $set: {
          name: userUpdateDto.name,
          profileImageId: userUpdateDto.profileImageId,
        },
      },
    );

    const user = await User.findById(userId);

    if (!user) {
      return null;
    }

    const data = await {
      _id: user.id,
      name: user.name,
      email: user.email,
      profileImageId: user.profileImageId,
    };
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createUser,
  getUserInfo,
  updateUser,
};
