import express, { Request, Response } from 'express';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import util from '../modules/util';
import TemplateService from '../services/TemplateService';
import slackWebHook, { SlackMessageFormat } from '../middleware/slackWebHook';
import config from '../config';
/**
 *  @route GET /template/alone
 *  @desc Get alone Template
 *  @access Public
 **/

const getAloneTemplate = async (req: Request, res: Response) => {
  try {
    const data = await TemplateService.getAloneTemplate();

    if (data == 'notfoundTemplate')
      res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, message.NO_TEMPLATE));
    else
      res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, message.GET_ALONETEMPLATE_SUCCESS, data));
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

/**
 *  @route GET /template/together
 *  @desc Get togther Template
 *  @access Public
 **/

const getTogetherTemplate = async (req: Request, res: Response) => {
  try {
    const data = await TemplateService.getTogetherTemplate();

    if (data == 'notfoundTemplate')
      res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, message.NO_TEMPLATE));
    else
      res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, message.GET_TOGETHERTEMPLATE_SUCCESS, data));
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

/**
 *  @route GET /template/:templateId/:isAloned
 *  @desc Get togther Template
 *  @access Public
 **/

const readTemplate = async (req: Request, res: Response) => {
  const { templateId, type } = req.params;
  try {
    const data = await TemplateService.readTemplate(templateId, type);

    if (data == 'notfoundTemplate')
      res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, message.NO_TEMPLATE));
    else
      res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, message.READ_DETAILEDTEMPLTATE_SUCCESS, data));
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

export default {
  getAloneTemplate,
  getTogetherTemplate,
  readTemplate,
};
