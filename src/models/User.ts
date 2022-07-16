import mongoose from 'mongoose';
import { IUser } from '../interface/IUser';

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
    versionKey: false,
  },
);

export default mongoose.model<IUser & mongoose.Document>('User', UserSchema);
