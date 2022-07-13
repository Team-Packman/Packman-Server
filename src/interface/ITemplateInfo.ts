import mongoose from 'mongoose';

export interface TemplateInfo {
  title: string;
  categoryIdArray: mongoose.Types.ObjectId[];
  isAloned: boolean;
  isHelped: boolean;
}
