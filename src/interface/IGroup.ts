import mongoose from 'mongoose';

export interface IGroup {
  members: mongoose.Types.ObjectId[];
}

export interface GroupResponseDto {
  _id: mongoose.Types.ObjectId,
  name: string,
  profileImageId: string,
}