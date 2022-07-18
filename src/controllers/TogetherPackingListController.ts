import express, { Request, Response } from 'express';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import util from '../modules/util';
import { validationResult } from 'express-validator';
import { TogetherPackingListCreateDTO } from '../interface/ITogetherPackingList';
import { TogetherPackingListService } from '../services';

/**
 *  @route POST /packinglist/together
 *  @desc Create Together Packinglist
 *  @access Public
 **/

const createTogetherPackingList = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }

  const togetherPackingListCreateDto: TogetherPackingListCreateDTO = req.body;

  try {
    const data = await TogetherPackingListService.createTogetherPackingList(
      togetherPackingListCreateDto,
    );

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
        .send(util.success(statusCode.OK, message.CREATE_TOGETHERPACKINGLIST_SUCCESS, data));
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

export default {
  createTogetherPackingList,
};
