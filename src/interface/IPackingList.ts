import mongoose from 'mongoose';

export interface PackingListTitleUpdateDTO {
  _id: string;
  title: string;
  isAloned?: boolean;
}

export interface PackingListDateUpdateDTO {
  _id: string;
  departureDate: string;
  isAloned?: boolean;
}

export interface PackingListMyTemplateUpdateDTO {
  _id: string;
  isSaved: boolean;
  isAloned?: boolean;
}

export interface PackingListResponseDTO {
  _id: string;
  departureDate: string;
  title: string;
  packTotalNum: number;
  packRemainNum: number;
}

export interface RecentCreatedPackingListDto {
  _id: mongoose.Types.ObjectId;
  title: string;
  remainDay: number;
  packTotalNum: number;
  packRemainNum: number;
  url: string;
}
