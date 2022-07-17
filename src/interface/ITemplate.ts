import mongoose from 'mongoose';

export interface ITemplate {
  title: string;
  categoryIdArray: mongoose.Types.ObjectId[];
  isAloned: boolean;
  isHelped: boolean;
}
