import express, { Request, Response, NextFunction } from "express";
import statusCode from "../modules/statusCode"
import message from "../modules/responseMessage";
import util from "../modules/util";
import { UserCreateDto } from "../interface/user/userCreateDto";

const createUser = async(req: Request, res: Response) => {
    const userCreateDto: UserCreateDto = req.body;
    try {
        
    } catch(error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

export default {

}