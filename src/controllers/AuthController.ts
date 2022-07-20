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



export default {
  getGoogleUser,
};
