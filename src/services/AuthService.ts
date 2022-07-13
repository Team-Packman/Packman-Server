import axios from 'axios';
import config from '../config';

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_AUTH_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_AUTH_REDIRECT_URL = 'http://localhost:8000/auth/google/callback';

const getGoogleInfo = async (code: string): Promise<string| null> => {
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

export default {
  getGoogleInfo,
};
