import  { Request, Response } from 'express';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import util from '../modules/util';
import { UserCreateDto } from '../interface/IUser';
import { UserService } from '../services';
import { validationResult } from 'express-validator';
import getToken from '../modules/jwtHandler';
import slackWebHook, { SlackMessageFormat } from '../middleware/slackWebHook';
import config from '../config';

/**
 *  @route POST /user/profile
 *  @desc create user
 *  @access public
 **/

const createUser = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }

  const userCreateDto: UserCreateDto = req.body;

  try {
    const data = await UserService.createUser(userCreateDto);
    if (!data)
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, message.FAIL_CREATE_USER));
    const accessToken = getToken(data._id);
    data.accessToken = accessToken;
    res.status(statusCode.OK).send(util.success(statusCode.OK, message.SUCCESS_CREATE_USER, data));
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
 *  @route GET /user
 *  @desc get user profile
 *  @access private
 **/

const getUserInfo = async (req: Request, res: Response) => {
  const userId = req.body.user.id;
  try {
    const data = await UserService.getUserInfo(userId);
    if (!data)
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, message.NO_USER));
    res.status(statusCode.OK).send(util.success(statusCode.OK, message.SUCCESS_GET_USER, data));
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
 *  @route GET /user/profile
 *  @desc update user
 *  @access private
 **/
const updateUser = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }

  const userId = req.body.user.id;
  const userUpdateDto = req.body;
  try {
    const data = await UserService.updateUser(userId, userUpdateDto);
    if (!data)
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, message.NO_USER));
    res.status(statusCode.OK).send(util.success(statusCode.OK, message.SUCCESS_UPDATE_USER, data));
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
  createUser,
  getUserInfo,
  updateUser,
};
