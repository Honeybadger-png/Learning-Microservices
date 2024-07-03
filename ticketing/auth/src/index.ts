import mongoose from 'mongoose';
import {app} from './app';

const start = async () => {
  if(!process.env.JWT_KEY){
    throw new Error ('JWT_KEY must be defined');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    console.log('successfully connected to mongodb')
  } catch(err){
    console.log(err);
  }

  app.listen(3000,()=> {
    console.log('Auth is listening on 3000!!!!')
  })
}

start();
