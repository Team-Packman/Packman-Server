import mongoose from 'mongoose';
import config from '../config';
import TogetherPackingList from '../models/TogetherPackingList';
import Group from '../models/Group';

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI);

    mongoose.set('autoCreate', true);

    console.log('Mongoose Connected ...');

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
};

export default connectDB;
