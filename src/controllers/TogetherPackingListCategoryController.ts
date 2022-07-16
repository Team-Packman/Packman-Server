import express, { Request, Response, NextFunction } from 'express';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import util from '../modules/util';
import { validationResult } from 'express-validator';
import { TogetherPackingListCategoryCreateDto } from '../interface/ITogetherPackingList';
import { TogetherPackingListCategoryService } from '../services';

const createCategory = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }

  const togetherPackingListCategoryCreateDto: TogetherPackingListCategoryCreateDto = req.body;

  try {
    const data = await TogetherPackingListCategoryService.createCategory(
      togetherPackingListCategoryCreateDto,
    );

    if (data === 400) {
      res
        .status(statusCode.BAD_REQUEST)
        .send(util.success(statusCode.BAD_REQUEST, message.NO_PACKINGLIST));
    } else {
      res
        .status(statusCode.CREATED)
        .send(
          util.success(statusCode.CREATED, message.SUCCESS_CREATE_TOGETHER_CATEGORY_SUCCESS, data),
        );
    }
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};
export default {
  createCategory,
};
