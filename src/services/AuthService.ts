import axios from 'axios';
import config from '../config';
import { AuthResponseDto } from '../interface/IUser';
import User from '../models/User';
import getToken from '../modules/jwtHandler';
import TogetherPackingList from '../models/TogetherPackingList';
import Group from '../models/Group';
import Folder from '../models/Folder';

const getGoogleUser = async (googleToken: string, inviteCode: string): Promise<AuthResponseDto | null | undefined> => {
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
    if (!user) {
      const data = {
        isAlreadyUser: false,
        email: userEmail,
      };
      return data;
    } else {
      const accessToken = getToken(user._id);
      if(inviteCode) {
        const packingList = await TogetherPackingList.findOne({inviteCode: inviteCode});
        if(!packingList) return null;     // 패킹리스트 없을 때 예외 처리
        const groupId = packingList.groupId;
        const group = await Group.findByIdAndUpdate(groupId,{$push: {members: user._id}});
        if(!group) return null;      // 그룹 존재하지 않을 때 예외 처리

        // await group.members.push(user._id);
        // group.save(); 
        // 기본 폴더 생성 or 찾은 후 초대된 리스트 삽입
        const folder = await Folder.findOne({title: "기본"});
    
        if(!folder) {
          const newFolder = new Folder({
            title: "기본",
            isAloned: false,
            userId: user._id,
            listNum: 1,
            list: [packingList._id],
            listModel: "TogetherPackingList", 
          });
          newFolder.save()
        }
        else {
          folder.list.push(packingList._id)
        }
      }
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

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_AUTH_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_AUTH_REDIRECT_URL = 'http://localhost:8000/auth/google/callback';

const getGoogleInfo = async (code: string): Promise<string | null> => {
  try {
    const { data } = await axios({
      method: 'POST',
      url: `${GOOGLE_AUTH_TOKEN_URL}`,
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      params: {
        grant_type: 'authorization_code',
        client_id: config.googleClientID,
        client_secret: config.googleClientSECRET,
        redirectUri: GOOGLE_AUTH_REDIRECT_URL,
        code: code,
      },
    });

    const access_token = data['access_token'];
    console.log(access_token)
    if (!access_token) return null;
    else {
      const { data: userEmail } = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`,
      );
      const { email } = userEmail;
      return email;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const googleLogin = async (userEmail: string): Promise<AuthResponseDto> => {
  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      const data = {
        isAlreadyUser: false,
        email: userEmail,
      };
      return data;
    } else {
      const data = {
        isAlreadyUser: true,
        _id: user._id,
        email: userEmail,
        name: user.name,
        profileImageId: user.profileImageId,
      };
      return data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  getGoogleInfo,
  googleLogin,
  getGoogleUser,
};
