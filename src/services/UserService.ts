import { UserCreateDto } from "../interface/user/UserCreateDto";
import { UserResponseDto } from "../interface/user/UserResponseDto";
import User from "../models/User";

const createUser = async(userCreateDto: UserCreateDto):  Promise<UserResponseDto> => {

    try {
        const user = new User({
            email: userCreateDto.email,
            nickname: userCreateDto.nickname,
            profileImageId: userCreateDto.email,
        });

        await user.save();
        const data = {
            id: user.id,
            nickname: user.nickname,
            email: user.email,
            profileImageId: userCreateDto.profileImageId,
            // accessToken: 
        };

        return data;

    } catch(error) {
        console.log(error);
        throw error;
    }
}

export default{
    createUser,
}