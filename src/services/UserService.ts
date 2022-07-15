import { UserCreateDto } from "../interface/user/UserCreateDto";
import { UserResponseDto } from "../interface/user/UserResponseDto";
import { UserUpdateDto } from "../interface/user/UserUpdateDto";
import User from "../models/User";

const createUser = async(userCreateDto: UserCreateDto):  Promise<UserResponseDto|null> => {

    try {
        const existUser = await User.findOne({
            email: userCreateDto.email
        });

        if (existUser) return null;
        const user = new User({
            email: userCreateDto.email,
            nickname: userCreateDto.nickname,
            profileImageId: userCreateDto.profileImageId,
        });
        await user.save();
        const data = {
            id: user._id,
            nickname: user.nickname,
            email: user.email,
            profileImageId: user.profileImageId,
        };

        return data;

    } catch(error) {
        console.log(error);
        throw error;
    }
}

const getUserInfo = async(userId: string): Promise<UserResponseDto|null> => {
    try {  
        const user = await User.findById(userId);
        if(!user) return null;
        const data = {
            id: user.id,
            nickname: user.nickname,
            email: user.email,
            profileImageId: user.profileImageId 

        }
        return data;
    } catch(error) {
        console.log(error);
        throw error;
    }
};

const updateUser = async(userId: string, userUpdateDto: UserUpdateDto): Promise<UserResponseDto|null> => {
    try {  

        await User.updateOne({_id: userId}, {$set: {
            nickname: userUpdateDto.nickname,
            profileImageId: userUpdateDto.profileImageId,
        } })
        
        const user = await User.findById(userId);

        if(!user){
            return null;
        }
        
        const data = await {
            id: user.id,
            nickname: user.nickname,
            email: user.email,
            profileImageId: user.profileImageId 
        }
        return data;
    } catch(error) {
        console.log(error);
        throw error;
    }
};

export default{
    createUser,
    getUserInfo,
    updateUser,
}