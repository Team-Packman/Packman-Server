import mongoose from 'mongoose';

export interface AlonePackingListInfo {
  title: string;
  isSaved: boolean;
  departureDate: Date;
  packTotalNum: number;
  packRemainNum: number;
  categoryIdArray: mongoose.Types.ObjectId[];
  isDeleted: boolean;
}
