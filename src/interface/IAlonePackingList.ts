import mongoose from 'mongoose';

export interface IAlonePackingList {
  title: string;
  departureDate: Date;
  packTotalNum: number;
  packRemainNum: number;
  category: mongoose.Types.ObjectId[];
  isDeleted: boolean;
  isSaved: boolean;
}

export interface AlonePackingListCreateDTO {
  departureDate: Date;
  folderId: string;
  title: string;
  templateId: string;
}

//
export interface AlonePackingListResponseDTO {
  _id: mongoose.Types.ObjectId;
  title: string;
  departureDate: Date;
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
