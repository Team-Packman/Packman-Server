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

export interface AlonePackingListCreateDTO {
  title: string;
  departureDate: Date;
  folderId: string;
  templateId: string;
}

//
export interface AlonePackingListResponseDTO {
  _id: mongoose.Types.ObjectId;
  title: string;
  departureDate: Date;
  categoryIdArray: [
    {
      _id: mongoose.Types.ObjectId;
      name: string;
      packIdArray: [
        {
          _id: mongoose.Types.ObjectId;
          name: string;
          isChecked: boolean;
        },
      ];
    },
  ];
  isSaved: boolean;
}
