import mongoose from 'mongoose';
import { UserInfo } from '../interface/user/UserInfo';

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
    },
    profileImageId: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<UserInfo & mongoose.Document>('User', UserSchema);
