import mongoose from 'mongoose';

export interface ITogetherPackingList {
  title: string;
  departureDate: Date;
  packTotalNum: number;
  packRemainNum: number;
  groupId: mongoose.Types.ObjectId;
  category: mongoose.Types.ObjectId[];
  isDeleted: boolean;
  myPackingListId: mongoose.Types.ObjectId;
  isSaved: boolean;
}

export interface TogetherPackingListCategoryCreateDto {
  name: string;
  listId: mongoose.Schema.Types.ObjectId;
}

export interface TogetherPackingListCategoryResponseDto {
  _id: mongoose.Schema.Types.ObjectId;
  category: [
    {
      _id: mongoose.Schema.Types.ObjectId;
      name: string;
      pack: [
        {
          _id: mongoose.Schema.Types.ObjectId;
          name: string;
          isChecked: boolean;
          packer: {
            _id: mongoose.Schema.Types.ObjectId;
            name: string;
          };
        },
      ];
    },
  ];
}

export interface TogetherPackingListCreateDTO {
  title: string;
  departureDate: Date;
  folderId: string;
  templateId: string;
}

export interface TogetherPackingListResponseDTO {
  _id: string;
  title: string;
  departureDate: string;
  categoryIdArray: [
    {
      _id: string;
      name: string;
      packIdArray: [
        {
          _id: string;
          name: string;
          isChecked: boolean;
          myPackingListId: {
            _id: string;
            name: string;
          };
        },
      ];
    },
  ];
}
