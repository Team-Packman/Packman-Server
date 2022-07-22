import mongoose from 'mongoose';
export interface IUser {
  email: string;
  name: string;
  profileImageId: string;
  isDeleted: string;
}

export interface UserUpdateDto {
  name: string;
  profileImageId: string;
}

export interface UserResponseDto {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  profileImageId: string;
  accessToken?: string;
}

export interface UserCreateDto {
  email: string;
  name: string;
  profileImageId: string;
}

export interface SocialUserInfo {
  email: string;
}

export interface AuthResponseDto {
  _id?: string;
  isAlreadyUser: boolean;
  token?: string;
  email: string;
  name?: string;
  profileImageId?: string;
}
