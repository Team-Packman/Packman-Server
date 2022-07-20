import { Request, Response } from 'express';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import util from '../modules/util';
import { validationResult } from 'express-validator';
import { MemberService } from '../services';

const getMembers = async(req: Request, res: Response) => {
    const groupId = req.params.groupId;
    const userId = req.body.user.id;
    try {
        const data = await MemberService.getMembers(userId, groupId);
        if(!data) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NO_DATA));
        res.status(statusCode.OK).send(util.success(statusCode.OK, message.SUCCESS_GET_MEMBERS , data));
    } catch(error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

export default {
    getMembers,
}