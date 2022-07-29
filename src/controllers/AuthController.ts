import { Request, Response } from 'express';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import util from '../modules/util';
import { AuthService } from '../services';
import slackWebHook, { SlackMessageFormat } from '../middleware/slackWebHook';
import config from '../config';
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
    if (config.env === 'production') {
      const message: SlackMessageFormat = {
        color: slackWebHook.colors.danger,
        title: 'Packman 서버 에러',
        fields: [
          {
            title: 'Error:',
            value: `\`\`\`${error}\`\`\``,
          },
        ],
      };
      slackWebHook.sendMessage(message);
    }
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

/**
 *  @route GET /auth/kakao
 *  @desc get kakao user
 *  @access public
 **/

const getKakaoUser = async (req: Request, res: Response) => {
  const token = req.body.accessToken;
  if (!token) {
    res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE_TOKEN));
  }
  try {
    const data = await AuthService.getKakaoUser(token);

    if (!data)
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, message.INVALID_TOKEN));
    res.status(statusCode.OK).send(util.success(statusCode.OK, message.SUCCESS_GET_TOKEN, data));
  } catch (error) {
    if (config.env === 'production') {
      const message: SlackMessageFormat = {
        color: slackWebHook.colors.danger,
        title: 'Packman 서버 에러',
        fields: [
          {
            title: 'Error:',
            value: `\`\`\`${error}\`\`\``,
          },
        ],
      };
      slackWebHook.sendMessage(message);
    }
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

export default {
  getGoogleUser,
  getKakaoUser,
};
