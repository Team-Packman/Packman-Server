import mongoose from "mongoose";

export interface UserResponseDto {
    id: mongoose.Schema.Types.ObjectId,
    nickname: string,
    profileImageId: string,
}