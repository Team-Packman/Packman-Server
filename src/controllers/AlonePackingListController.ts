import express, { Request, Response } from 'express';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import util from '../modules/util';
import { validationResult } from 'express-validator/check';
import { AlonePackingListCreateDTO } from '../interface/IAlonePackingList';
import AlonePackingListService from '../services/AlonePackingListService';

/**
 *  @route POST /packinglist/alone
 *  @desc Create Alone Packinglist
 *  @access Public
 **/

const createAlonePackingList = async (req: Request, res: Response) => {
  //validation
  // const error = validationResult(req);
  // if (!error.isEmpty()) {
  //     return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
  // }

  const alonePackingListCreateDto: AlonePackingListCreateDTO = req.body;

  try {
    const data = await AlonePackingListService.createAlonePackingList(alonePackingListCreateDto);

    res
      .status(statusCode.CREATED)
      .send(util.success(statusCode.CREATED, message.CREATE_ALONEPACKINGLIST_SUCCESS, data));
  } catch (error) {
    console.log(error);
    //서버 내부에서 오류 발생
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

export default {
  createAlonePackingList,
};
