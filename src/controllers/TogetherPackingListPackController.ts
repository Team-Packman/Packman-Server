import express, { Request, Response, NextFunction } from 'express';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import util from '../modules/util';
import { validationResult } from 'express-validator';
import { PackCreateDto } from '../interface/IPack';
import { TogetherPackingListPackService } from '../services';
import { PackUpdateDto } from '../interface/IPack';

const createPack = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }

  const PackCreateDto: PackCreateDto = req.body;

  try {
    const data = await TogetherPackingListPackService.createPack(PackCreateDto);

    if (data === 'no_list') {
      res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, message.NO_PACKINGLIST));
    } else if (data === 'no_category') {
      res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, message.NO_CATEGORY));
    } else if (data === 'no_list_category') {
      res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, message.NO_LIST_CATEGORY));
    } else {
      res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, message.CREATE_TOGETHER_PACK_SUCCESS, data));
    }
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

const updatePack = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }

  const packUpdateDto: PackUpdateDto = req.body;

  try {
    const data = await TogetherPackingListPackService.updatePack(packUpdateDto);

    if (
      data === 'no_pack' ||
      data === 'no_list' ||
      data === 'no_category' ||
      data === 'no_list_category' ||
      data === 'no_category_pack'
    ) {
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NO_DATA));
    } else {
      res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, message.UPDATE_TOGETHER_CATEGORY_SUCCESS, data));
    }
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

const deletePack = async (req: Request, res: Response) => {
  const { listId, categoryId, packId } = req.params;
  try {
    const data = await TogetherPackingListPackService.deletePack(listId, categoryId, packId);

    if (
      data === 'no_pack' ||
      data === 'no_list' ||
      data === 'no_category' ||
      data === 'no_list_category' ||
      data === 'no_category_pack'
    ) {
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NO_DATA));
    } else {
      res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, message.DELETE_TOGETHER_PACK_SUCCESS, data));
    }
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

export default {
  createPack,
  updatePack,
  deletePack,
};
