import express, { Request, Response } from 'express';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import util from '../modules/util';
import { validationResult } from 'express-validator';
import { FolderService } from '../services';

const deleteFolder = async (req: Request, res: Response) => {
  const folderId = req.params.folderId;
  const userId = req.body.user.id;

  try {
    const data = FolderService.deleteFolder(userId, folderId);
    if (!data) return res.status(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    res
      .status(statusCode.OK)
      .send(util.success(statusCode.OK, message.SUCCESS_DELETE_FOLDER, data));
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

export default {
  deleteFolder,
};
