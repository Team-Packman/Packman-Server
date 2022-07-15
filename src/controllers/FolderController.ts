import express, { Request, Response} from "express";
import statusCode from "../modules/statusCode"
import message from "../modules/responseMessage";
import util from "../modules/util";
import { validationResult } from "express-validator";
import { FolderService } from "../services";


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

export default {
    getFolders,
}