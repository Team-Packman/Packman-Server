import express, { Request, Response } from 'express';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import util from '../modules/util';
import { validationResult } from 'express-validator';
import { TogetherPackingListCreateDTO } from '../interface/ITogetherPackingList';
import { TogetherPackingListService } from '../services';
import { PackerUpdateDto } from '../interface/IPack';

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

/**
 *  @route GET /packinglist/together/:listId
 *  @desc Read Together Packinglist
 *  @access Public
 **/

const readTogetherPackingList = async (req: Request, res: Response) => {
  const { listId } = req.params;
  try {
    const data = await TogetherPackingListService.readTogetherPackingList(listId);

    if (data == 'notfoundList')
      res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, message.NO_PACKINGLIST));
    else
      res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, message.READ_TOGETHERPACKINGLIST_SUCCESS, data));
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

/**
 *  @route DELETE /packinglist/together/:folderId/:listId
 *  @desc Delete Together Packinglist
 *  @access Public
 **/

const deleteTogetherPackingList = async (req: Request, res: Response) => {
  const { folderId, listId } = req.params;
  try {
    const data = await TogetherPackingListService.deleteTogetherPackingList(folderId, listId);

    if (data == 'notfoundList')
      res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, message.NO_PACKINGLIST));
    else if (data == 'notfoundFolder')
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NO_FOLDER));
    else
      res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, message.DELETE_TOGETHERPACKINGLIST_SUCCESS, data));
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

const updatePacker = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }

  const packerUpdateDto: PackerUpdateDto = req.body;

  try {
    const data = await TogetherPackingListService.updatePacker(packerUpdateDto);

    if (
      data === 'no_list' ||
      data === 'no_pack' ||
      data === 'no_packer' ||
      data === 'no_user_pack' ||
      data === 'null'
    ) {
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NO_DATA));
    } else {
      res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, message.UPDATE_PACKER_SUCCESS, data));
    }
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

export default {
  createTogetherPackingList,
  readTogetherPackingList,
  deleteTogetherPackingList,
  updatePacker,
};
