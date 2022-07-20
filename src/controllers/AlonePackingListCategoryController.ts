import express, { Request, Response, NextFunction } from 'express';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import util from '../modules/util';
import { validationResult } from 'express-validator';
import { CategoryCreateDto } from '../interface/ICategory';
import { CategoryUpdateDto } from '../interface/ICategory';
import AlonePackingListCategoryService from '../services/AlonePackingListCategoryService';

const createCategory = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }

  const categoryCreateDto: CategoryCreateDto = req.body;

  try {
    const data = await AlonePackingListCategoryService.createCategory(categoryCreateDto);
    if (data === 400) {
      res
        .status(statusCode.BAD_REQUEST)
        .send(util.success(statusCode.BAD_REQUEST, message.NO_DATA));
    } else {
      res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, message.CREATE_ALONE_CATEGORY_SUCCESS, data));
    }
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

const updateCategory = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }

  const categoryUpdateDto: CategoryUpdateDto = req.body;

  try {
    const data = await AlonePackingListCategoryService.updateCategory(categoryUpdateDto);

    if (
      data === 'no_list' ||
      data === 'no_category' ||
      data === 'no_list_category' ||
      data === 'null'
    ) {
      res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, message.NO_PACKINGLIST));
    } else {
      res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, message.UPDATE_ALONE_CATEGORY_SUCCESS, data));
    }
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  const { listId, categoryId } = req.params;
  try {
    const data = await AlonePackingListCategoryService.deleteCategory(listId, categoryId);
    if (
      data === 'no_list' ||
      data === 'no_category' ||
      data === 'no_list_category' ||
      data === 'null'
    ) {
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NO_DATA));
    } else {
      res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, message.DELETE_ALONE_CATEGORY_SUCCESS, data));
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
  updateCategory,
  deleteCategory,
};
