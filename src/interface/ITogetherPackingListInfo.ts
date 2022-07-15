import mongoose from 'mongoose';

export interface TogetherPackingListInfo {
  title: string;
  isSaved: boolean;
  departureDate: Date;
  packTotalNum: number;
  packRemainNum: number;
  groupId: mongoose.Types.ObjectId;
  categoryIdArray: mongoose.Types.ObjectId[];
  isDeleted: boolean;
  myPackingListId: mongoose.Types.ObjectId;
}
