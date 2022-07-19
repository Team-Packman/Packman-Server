import { Request, Response } from 'express';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import util from '../modules/util';
import { validationResult } from 'express-validator';
import { PackingListDateUpdateDTO, PackingListTitleUpdateDTO, PackingListMyTemplateUpdateDTO } from '../interface/IPackingList';
import PackingListService from '../services/PackingListService';
import { nanoid } from 'nanoid';
/**
 *  @route PATCH /packingList/title
 *  @desc Update Packinglist Title
 *  @access Public
 **/

const updatePackingListTitle = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }

  const packingListTitleUpdateDto: PackingListTitleUpdateDTO = req.body;

  try {
    const data = await PackingListService.updatePackingListTitle(packingListTitleUpdateDto);

    if (data == 'notfoundList')
      res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, message.NO_PACKINGLIST));
    else if (data == 'duplication')
      res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, message.DUPLICATION_PACKINGLIST));
    else if (data == 'notfoundUpdatedTitle')
      res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, message.NO_UPDATEDTITLE));
    else
      res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, message.UPDATE_PACKINGLIST_TITLE_SUCCESS, data));
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

/**
 *  @route PATCH /packingList/departureDate
 *  @desc Update Packinglist Departure Date
 *  @access Public
 **/

const updatePackingListDate = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }

  const packingListDateUpdateDto: PackingListDateUpdateDTO = req.body;

  try {
    const data = await PackingListService.updatePackingListDate(packingListDateUpdateDto);

    if (data == 'notfoundUpdatedDate')
      res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, message.NO_UPDATEDDATE));
    else
      res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, message.UPDATE_PACKINGLIST_TITLE_SUCCESS, data));
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

/**
 *  @route PATCH /packingList/myTemplate
 *  @desc Update Packinglist Is Saved
 *  @access Public
 **/

 const updatePackingListMyTemplate = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }

  const packingListMyTemplateUpdateDto: PackingListMyTemplateUpdateDTO = req.body;

  try {
    const data = await PackingListService.updatePackingListMyTemplate(
      packingListMyTemplateUpdateDto,
    );

    if (data == 'notfoundUpdatedMyTemplate')
      res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, message.NO_UPDATEDMYTEMPLATE));
    else
      res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, message.UPDATE_PACKINGLIST_MYTEMPLATE_SUCCESS, data));
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};
/**
 *  @route GET /invite/:inviteCode
 *  @desc find packingList by inviteCode
 *  @access Public
 **/

 const generateInviteCode = () => {
  const code = nanoid(6);
  return code;
};
const invitePackingList = async (req: Request, res: Response) => {
  const inviteCode = req.params.inviteCode;
  try {
    const data = await PackingListService.getPackingByInviteCode(inviteCode);
    if(!data) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    res
      .status(statusCode.OK)
      .send(util.success(statusCode.OK, message.SUCCESS_INVITE_TOGETHER_PACKING, data));
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};
export default {
  updatePackingListTitle,
  updatePackingListDate,
  updatePackingListMyTemplate,
  invitePackingList,
  generateInviteCode,
};
