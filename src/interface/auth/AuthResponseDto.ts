import mongoose from "mongoose"

export interface AuthResponseDto {
    isAlreadyUser: boolean,
    token?: string,
    id?: mongoose.Schema.Types.ObjectId;
    email: string,
    nickname?: string,
    profileImageId?: string,
}