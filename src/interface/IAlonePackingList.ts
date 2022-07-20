import mongoose from 'mongoose';

export interface IAlonePackingList {
  title: string;
  departureDate: string;
  packTotalNum: number;
  packRemainNum: number;
  category: mongoose.Types.ObjectId[];
  isDeleted: boolean;
  isSaved: boolean;
}

export interface AlonePackingListCreateDTO {
  departureDate: string;
  folderId: string;
  title: string;
  templateId: string;
}

//
export interface AlonePackingListResponseDTO {
  _id: mongoose.Types.ObjectId;
  title: string;
  departureDate: string;
  category: [
    {
      _id: mongoose.Types.ObjectId;
      name: string;
      pack: [
        {
          _id: mongoose.Types.ObjectId;
          name: string;
          isChecked: boolean;
          packer: mongoose.Types.ObjectId;
        },
      ];
    },
  ];
  isSaved: boolean;
}

export interface AlonePackingListCategoryResponseDto {
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
export interface AloneListInFolderResponseDto {
  currentFolder: {
    _id: string;
    title: string;
  };
  folder: {
    _id: mongoose.Types.ObjectId;
    title: string;
  }[];
  listNum: number;
  alonePackingList: {
    _id: string;
    title: string;
    departureDate: string;
    packTotalNum: number;
    packRemainNum: number;
  }[];
}
