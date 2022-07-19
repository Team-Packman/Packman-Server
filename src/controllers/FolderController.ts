import express, { Request, Response} from "express";
import statusCode from "../modules/statusCode"
import message from "../modules/responseMessage";
import util from "../modules/util";
import { validationResult } from "express-validator";
import { FolderService } from "../services";

const createFolder = async(req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    }
    const userId = req.body.user.id;
    const folderCreateDto = req.body;
    try {
        const data = await FolderService.createFolder(userId, folderCreateDto);

        res.status(statusCode.OK).send(util.success(statusCode.OK, message.SUCCESS_CREATE_FOLDER, data));
    } catch(error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

const updateFolder = async(req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    }
    const userId = req.body.user.id;
    const folderUpdateDto = req.body;
    try {
        const data = await FolderService.updateFolder(userId, folderUpdateDto);
        if(!data) return res.statusCode(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NOT_FOUND));
        res.status(statusCode.OK).send(util.success(statusCode.OK, message.SUCCESS_UPDATE_FOLDER, data));
    } catch(error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}



const deleteFolder = async (req: Request, res: Response) => {
  const folderId = req.params.folderId;
  const userId = req.body.user.id;

  try {
    const data = FolderService.deleteFolder(userId, folderId);
    if (!data) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
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





const getFolders = async(req: Request, res: Response) => {

    const userId = req.body.user.id;
    try {
        const data = await FolderService.getFolders(userId);
        res.status(statusCode.OK).send(util.success(statusCode.OK, message.SUCCESS_GET_FOLDERS, data));
    } catch(error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

const getAloneFolders = async(req: Request, res: Response) => {
  const userId = req.body.user.id;
  try {
    const data = await FolderService.getAloneFolders(userId);
    res.status(statusCode.OK).send(util.success(statusCode.OK, message.SUCCESS_GET_FOLDERS, {AloneFolders: data}));
  } catch(error) {
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
}

const getTogetherFolders = async(req: Request, res: Response) => {
  const userId = req.body.user.id;
  try {
    const data = await FolderService.getTogetherFolders(userId);
    res.status(statusCode.OK).send(util.success(statusCode.OK, message.SUCCESS_GET_FOLDERS, {TogetherFolders: data}));
  } catch(error) {
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
}

export default {
    createFolder,
    updateFolder,
     deleteFolder,
     getFolders,
     getAloneFolders,
     getTogetherFolders,
}