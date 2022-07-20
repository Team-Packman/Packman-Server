import axios from 'axios';
import { AuthResponseDto } from '../interface/IUser';
import User from '../models/User';
import getToken from '../modules/jwtHandler';

const getGoogleUser = async (googleToken: string): Promise<AuthResponseDto | null | undefined> => {
  try {
    const response = await axios({
      method: 'get',
      url: 'https://www.googleapis.com/oauth2/v2/userinfo',
      headers: {
        Authorization: `Bearer ${googleToken}`,
      },
    });

    if (!response) return null;

    // 존재하는 유저인지 판별
    const userEmail = response.data.email;
    const user = await User.findOne({ email: userEmail });
    if (!user || user.isDeleted) {
      if (user?.isDeleted) {
        await User.findByIdAndDelete(user._id);
      }
      const data = {
        isAlreadyUser: false,
        email: userEmail,
      };
      return data;
    } else {
      const accessToken = getToken(user._id);
      const data = {
        isAlreadyUser: true,
        token: accessToken,
        _id: user._id,
        email: userEmail,
        name: user.name,
        profileImageId: user.profileImageId,
      };
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

const getKakaoUser = async (kakaoToken: string): Promise<AuthResponseDto | null | undefined> => {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        Authorization: `Bearer ${kakaoToken}`,
      },
    });

    if (!response) return null;

    // 존재하는 유저인지 판별
    const userEmail = response.data.kakao_account.email;
    const user = await User.findOne({ email: userEmail });
    if (!user || user.isDeleted) {
      if (user?.isDeleted) {
        await User.findByIdAndDelete(user._id);
      }
      const data = {
        isAlreadyUser: false,
        email: userEmail,
      };
      return data;
    } else {
      const accessToken = getToken(user._id);
      const data = {
        isAlreadyUser: true,
        token: accessToken,
        _id: user._id,
        email: userEmail,
        name: user.name,
        profileImageId: user.profileImageId,
      };
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
export default {
  getGoogleUser,
  getKakaoUser,
};
