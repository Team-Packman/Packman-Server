import express, { Request, Response } from 'express';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import util from '../modules/util';
import { validationResult } from 'express-validator';
import { AlonePackingListCreateDTO } from '../interface/IAlonePackingList';
import AlonePackingListService from '../services/AlonePackingListService';

/**
 *  @route POST /packinglist/alone
 *  @desc Create Alone Packinglist
 *  @access Public
 **/

const createAlonePackingList = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }

  const alonePackingListCreateDto: AlonePackingListCreateDTO = req.body;

  try {
    const data = await AlonePackingListService.createAlonePackingList(alonePackingListCreateDto);
    if (data == 'notfoundList')
      res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, message.NO_PACKINGLIST));
    else if (data == 'duplication')
      res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, message.DUPLICATION_PACKINGLIST));
    else if (data == 'notfoundCategory')
      res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, message.NO_CATEGORY));
    else if (data == 'notfoundTemplate')
      res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, message.NO_TEMPLATE));
    else
      res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, message.CREATE_ALONEPACKINGLIST_SUCCESS, data));
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

export default {
  createAlonePackingList,
};
