import express, { Request, Response } from 'express';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import util from '../modules/util';
import { validationResult } from 'express-validator';
import { PackCreateDto, PackUpdateDto } from '../interface/IPack';
import AlonePackingListPackService from '../services/AlonePackingListPackService';
import slackWebHook, { SlackMessageFormat } from '../middleware/slackWebHook';
import config from '../config';
const createPack = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }

  const packCreateDto: PackCreateDto = req.body;

  try {
    const data = await AlonePackingListPackService.createPack(packCreateDto);

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
        .send(util.success(statusCode.OK, message.CREATE_ALONE_PACK_SUCCESS, data));
    }
  } catch (error) {
    if (config.env === 'production') {
      const message: SlackMessageFormat = {
        color: slackWebHook.colors.danger,
        title: 'Packman 서버 에러',
        fields: [
          {
            title: 'Error:',
            value: `\`\`\`${error}\`\`\``,
          },
        ],
      };
      slackWebHook.sendMessage(message);
    }
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
    const data = await AlonePackingListPackService.updatePack(packUpdateDto);

    if (
      data === 'no_pack' ||
      data === 'no_list' ||
      data === 'no_category' ||
      data === 'no_list_category' ||
      data === 'no_category_pack' ||
      data === 'null'
    ) {
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NO_DATA));
    } else {
      res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, message.UPDATE_ALONE_PACK_SUCCESS, data));
    }
  } catch (error) {
    if (config.env === 'production') {
      const message: SlackMessageFormat = {
        color: slackWebHook.colors.danger,
        title: 'Packman 서버 에러',
        fields: [
          {
            title: 'Error:',
            value: `\`\`\`${error}\`\`\``,
          },
        ],
      };
      slackWebHook.sendMessage(message);
    }
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

const deletePack = async (req: Request, res: Response) => {
  const { listId, categoryId, packId } = req.params;
  try {
    const data = await AlonePackingListPackService.deletePack(listId, categoryId, packId);

    if (
      data === 'no_pack' ||
      data === 'no_list' ||
      data === 'no_category' ||
      data === 'no_list_category' ||
      data === 'no_category_pack' ||
      data === 'null'
    ) {
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NO_DATA));
    } else {
      res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, message.DELETE_ALONE_PACK_SUCCESS, data));
    }
  } catch (error) {
    if (config.env === 'production') {
      const message: SlackMessageFormat = {
        color: slackWebHook.colors.danger,
        title: 'Packman 서버 에러',
        fields: [
          {
            title: 'Error:',
            value: `\`\`\`${error}\`\`\``,
          },
        ],
      };
      slackWebHook.sendMessage(message);
    }
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};
export default { createPack, updatePack, deletePack };
