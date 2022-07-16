import mongoose from 'mongoose';

export interface ITogetherPackingList {
  title: string;
  isSaved: boolean;
  departureDate: Date;
  packTotalNum: number;
  packRemainNum: number;
  groupId: mongoose.Types.ObjectId;
  categoryIdArray: mongoose.Types.ObjectId[];
  isDeleted: boolean;
  myPackingListId: mongoose.Types.ObjectId;
}

export interface TogetherPackingListCategoryCreateDto {
  name: string;
  listId: mongoose.Schema.Types.ObjectId;
}

export interface TogetherPackingListCategoryResponseDto {
  _id: mongoose.Schema.Types.ObjectId;
  categoryIdArray: [
    {
      _id: mongoose.Schema.Types.ObjectId;
      name: string;
      packIdArray: [
        {
          _id: mongoose.Schema.Types.ObjectId;
          name: string;
          isChecked: boolean;
          packerId: {
            _id: mongoose.Schema.Types.ObjectId;
            nickname: string;
          };
        },
      ];
    },
  ];
}
