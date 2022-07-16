import mongoose from 'mongoose';
import config from '../config';
import AlonePackingList from '../models/AlonePackingList';
import TogetherPackingList from '../models/TogetherPackingList';
import Group from '../models/Group';
import Category from '../models/Category';
import Pack from '../models/Pack';
import Template from '../models/Template';

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI);

    mongoose.set('autoCreate', true);

    console.log('Mongoose Connected ...');

    AlonePackingList.createCollection().then((collection) => {
      console.log('AlonePackingList Collection Created');
    });
    Category.createCollection().then((collection) => {
      console.log('Category Collection Created');
    });
    Pack.createCollection().then((collection) => {
      console.log('Pack Collection Created');
    });
    Template.createCollection().then((collection) => {
      console.log('Template Collection Created');
    });
    TogetherPackingList.createCollection().then((collection) => {
      console.log('TogetherPackingList Collection Created');
    });

    Group.createCollection().then((collection) => {
      console.log('Group Collection Created');
    });
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }

export default connectDB;
