import mongoose from 'mongoose';

export interface ITogetherPackingList {
  title: string;
  departureDate: string;
  packTotalNum: number;
  packRemainNum: number;
  groupId: mongoose.Types.ObjectId;
  category: mongoose.Types.ObjectId[];
  isDeleted: boolean;
  myPackingListId: mongoose.Types.ObjectId;
  isSaved: boolean;
  inviteCode: string;
}

export interface TogetherPackingListCategoryResponseDto {
  _id: mongoose.Types.ObjectId;
  category: [
    {
      _id: mongoose.Types.ObjectId;
      name: string;
      pack: [
        {
          _id: mongoose.Types.ObjectId;
          name: string;
          isChecked: boolean;
          packer: {
            _id: mongoose.Types.ObjectId;
            name: string;
          };
        },
      ];
    },
  ];
}

export interface TogetherPackingListCreateDTO {
  departureDate: string;
  folderId: string;
  title: string;
  templateId: string;
}

export interface TogetherPackingListResponseDTO {
  _id: string;
  groupId: string;
  category: [
    {
      _id: string;
      name: string;
      pack: [
        {
          _id: string;
          name: string;
          isChecked: boolean;
          packer: {
            _id: string;
            name: string;
          };
        },
      ];
    },
  ];
  inviteCode: string;
  isSaved: boolean;
}

export interface TogetherMyPackingListResponseDTO {
  _id: string;
  category: [
    {
      _id: string;
      name: string;
      pack: [
        {
          _id: string;
          name: string;
          isChecked: boolean;
          packer: mongoose.Types.ObjectId;
        },
      ];
    },
  ];
}
