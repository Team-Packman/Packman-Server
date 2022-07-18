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
  listId: mongoose.Types.ObjectId;
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

export interface TogetherPackingListPackCreateDto {
  name: string;
  categoryId: mongoose.Types.ObjectId;
  listId: mongoose.Types.ObjectId;
}

export interface TogetherPackingListCreateDTO {
  departureDate: Date;
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
