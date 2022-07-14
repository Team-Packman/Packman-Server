import mongoose from "mongoose"

export interface AuthResponseDto {
    isAlreadyUser: boolean,
    id?: mongoose.Schema.Types.ObjectId;
    email: string,
    nickname?: string,
    profileImageId?: string,
}