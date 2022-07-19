import { Request, Response } from 'express';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import util from '../modules/util';
import { AuthService } from '../services';
import config from '../config';

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_AUTH_REDIRECT_URL = 'http://localhost:8000/auth/google/callback';


/**
 *  @route GET /auth/google
 *  @desc get google user
 *  @access public
 **/

const getGoogleUser = async (req: Request, res: Response) => {
  const token = req.body.accessToken;
  if (!token) {
    res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE_TOKEN));
  }
  try {
    const data = await AuthService.getGoogleUser(token);

    if (!data)
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, message.INVALID_TOKEN));
    res.status(statusCode.OK).send(util.success(statusCode.OK, message.SUCCESS_GET_TOKEN, data));
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};


// 토큰 발급을 위한 코드
const getGoogleToken = async (req: Request, res: Response) => {
  return res.redirect(
    `${GOOGLE_AUTH_URL}?client_id=${config.googleClientID}&redirect_uri=${GOOGLE_AUTH_REDIRECT_URL}&response_type=code&include_granted_scopes=true&scope=https://www.googleapis.com/auth/userinfo.email`,
  );
};

const googleLogin = async (req: Request, res: Response) => {
  const { code } = req.query;
  try {
    const userEmail = await AuthService.getGoogleInfo(code as string);
    if (!userEmail)
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE_TOKEN));

    const data = await AuthService.googleLogin(userEmail);
    res.status(statusCode.OK).send(util.success(statusCode.OK, message.SUCCESS_GET_TOKEN, data));

    // res.status(statusCode.OK).send()
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.success(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
  // return res.redirect('http://localhost:8000');
};

export default {
  googleLogin,
  getGoogleToken,
  getGoogleUser,
};
