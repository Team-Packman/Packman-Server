import mongoose from 'mongoose';

export interface ITemplate {
  title: string;
  category: mongoose.Types.ObjectId[];
  isAloned: boolean;
  isHelped: boolean;
}
