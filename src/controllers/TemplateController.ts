import express, { Request, Response } from 'express';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import util from '../modules/util';
import { validationResult } from 'express-validator/check';
import TemplateService from '../services/TemplateService';

/**
 *  @route GET /template/alone
 *  @desc Get alone Template
 *  @access Public
 **/

const getAloneTemplate = async (req: Request, res: Response) => {
  try {
    const data = await TemplateService.getAloneTemplate();

    if (data == 'notfoundTemplate')
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NO_DATA));
    else
      res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, message.GET_ALONETEMPLATE_SUCCESS, data));
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

export default {
  getAloneTemplate,
};
