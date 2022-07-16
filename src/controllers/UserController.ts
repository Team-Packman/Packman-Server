import express, { Request, Response, NextFunction } from 'express';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import util from '../modules/util';
import { UserCreateDto } from '../interface/IUserInfo';
import { UserService } from '../services';
import { validationResult } from 'express-validator';
import getToken from '../modules/jwtHandler';

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
    const accessToken = getToken(data.id);
    data.accessToken = accessToken;
    res.status(statusCode.OK).send(util.success(statusCode.OK, message.SUCCESS_CREATE_USER, data));
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

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
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

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
