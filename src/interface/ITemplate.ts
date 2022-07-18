import mongoose from 'mongoose';

export interface ITemplate {
  title: string;
  category: mongoose.Types.ObjectId[];
  isAloned: boolean;
  isHelped: boolean;
}

export interface TemplateResponseDTO {
  basicTemplate: {
    _id: mongoose.Types.ObjectId;
    title: string;
  }[];
  myTemplate: {
    _id: mongoose.Types.ObjectId;
    title: string;
  }[];
}
