import { UserCreateDto } from "../interface/user/UserCreateDto";
import { UserResponseDto } from "../interface/user/UserResponseDto";
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
            profileImageId: userCreateDto.email,
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

export default{
    createUser,
}