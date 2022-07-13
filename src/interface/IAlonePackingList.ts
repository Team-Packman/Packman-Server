import mongoose from 'mongoose';

export interface AlonePackingListInfo {
  title: string;
  isSaved: boolean;
  departureDate: Date;
  packTotalNum: number;
  packRemainNum: number;
  categoryIdArray: mongoose.Types.ObjectId[];
  isDeleted: boolean;
  remainDay: number;
}

export interface AlonePackingListCreateDTO {
  title: string;
  departureDate: Date;
  folderId: string;
  templateId: string;
}

export interface AlonePackingListResponseDTO {
  id: mongoose.Types.ObjectId;
  title: string;
  departureDate: Date;
  category: [
    {
      id: string;
      name: string;
      pack: [
        {
          id: string;
          name: string;
          isChecked: boolean;
        },
      ];
    },
  ];
  isSaved: boolean;
}
