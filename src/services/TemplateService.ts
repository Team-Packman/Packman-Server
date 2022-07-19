import { DetailedTemplateResponseDTO, TemplateResponseDTO } from '../interface/ITemplate';
import AlonePackingList from '../models/AlonePackingList';
import Template from '../models/Template';
import TogetherPackingList from '../models/TogetherPackingList';

const getAloneTemplate = async (): Promise<TemplateResponseDTO | string> => {
  try {
    const basicTemplateTitles = await Template.find({}, { title: 1 });
    const myTemplateTitles = await AlonePackingList.find({ isSaved: true }, { title: 1 });

    if (!basicTemplateTitles) return 'notfoundTemplate';
    const data: TemplateResponseDTO = {
      basicTemplate: basicTemplateTitles,
      myTemplate: myTemplateTitles,
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getTogetherTemplate = async (): Promise<TemplateResponseDTO | string> => {
  try {
    const basicTemplateTitles = await Template.find({}, { title: 1 });
    const myTemplateTitles = await TogetherPackingList.find({ isSaved: true }, { title: 1 });

    if (!basicTemplateTitles) return 'notfoundTemplate';
    const data: TemplateResponseDTO = {
      basicTemplate: basicTemplateTitles,
      myTemplate: myTemplateTitles,
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const readTemplate = async (
  templateId: string,
  type: string,
): Promise<DetailedTemplateResponseDTO | string> => {
  try {
    let data: DetailedTemplateResponseDTO | null;
    if (type == 'basic') {
      data = await Template.findOne({ _id: templateId }, { title: 1, category: 1 }).populate({
        path: 'category',
        model: 'Category',
        options: { sort: { createdAt: 1 } },
        select: { _id: 1, name: 1, pack: 1 },
        populate: {
          path: 'pack',
          model: 'Pack',
          select: { _id: 1, name: 1 },
          options: { sort: { createdAt: 1 } },
        },
      });
    } else if (type == 'alone') {
      data = await AlonePackingList.findOne(
        { _id: templateId },
        { title: 1, category: 1 },
      ).populate({
        path: 'category',
        model: 'Category',
        options: { sort: { createdAt: 1 } },
        select: { _id: 1, name: 1, pack: 1 },
        populate: {
          path: 'pack',
          model: 'Pack',
          select: { _id: 1, name: 1 },
          options: { sort: { createdAt: 1 } },
        },
      });
    } else {
      data = await TogetherPackingList.findOne(
        { _id: templateId },
        { title: 1, category: 1 },
      ).populate({
        path: 'category',
        model: 'Category',
        options: { sort: { createdAt: 1 } },
        select: { _id: 1, name: 1, pack: 1 },
        populate: {
          path: 'pack',
          model: 'Pack',
          select: { _id: 1, name: 1 },
          options: { sort: { createdAt: 1 } },
        },
      });
    }
    if (!data) return 'notfoundTemplate';

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  getAloneTemplate,
  getTogetherTemplate,
  readTemplate,
};
