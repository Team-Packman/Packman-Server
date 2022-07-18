import mongoose from 'mongoose';
export interface PackingListTitleUpdateDTO {
  _id: string;
  title: string;
  isAloned?: boolean;
}

export interface PackingListDateUpdateDTO {
  _id: string;
  departureDate: Date;
  isAloned?: boolean;
}

export interface PackingListResponseDto {
  _id: mongoose.Schema.Types.ObjectId;
  title: string;
}