import mongoose from 'mongoose';
export interface IUser {
  email: string;
  nickname: string;
  profileImageId: string;
  isDeleted: string;
}

export interface UserUpdateDto {
  nickname: string;
  profileImageId: string;
}

export interface UserResponseDto {
  id: mongoose.Schema.Types.ObjectId;
  nickname: string;
  email: string;
  profileImageId: string;
  accessToken?: string;
}

export interface UserCreateDto {
  email: string;
  nickname: string;
  profileImageId: string;
}

export interface SocialUserInfo {
  email: string;
}

export interface AuthResponseDto {
  isAlreadyUser: boolean;
  token?: string;
  id?: mongoose.Schema.Types.ObjectId;
  email: string;
  nickname?: string;
  profileImageId?: string;
}
