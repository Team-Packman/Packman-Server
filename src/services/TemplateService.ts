import { TemplateResponseDTO } from '../interface/ITemplate';
import AlonePackingList from '../models/AlonePackingList';
import Template from '../models/Template';

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

export default {
  getAloneTemplate,
};
