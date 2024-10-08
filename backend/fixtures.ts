import mongoose from 'mongoose';
import User from './models/User';
import config from './config';
import Message from './models/Message';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;
  try {
    await db.dropCollection('messages');
    await db.dropCollection('users');

  } catch (err) {
    console.log('skipping drop');
  }

  const admin = new User({
    username: 'admin@admin.loc',
    password: '12345',
    confirmPassword: '12345',
    role: 'admin',
  });
  admin.generateToken();
  await admin.save();

  const moderator = new User({
    username: 'moderator@mod.loc',
    password: '12345',
    confirmPassword: '12345',
    role: 'admin',
  });
  moderator.generateToken();
  await moderator.save();

  const user = new User({
    username: 'user@user.loc',
    password: '12345',
    confirmPassword: '12345',
  });
  user.generateToken();
  await user.save();

  await Message.create(
    {
      author: admin,
      message: 'first',
      datetime: Date.now() - 39000000,
    },
    {
      author: user,
      message: '12345',
      datetime: Date.now() - 38000000,
    },
    {
      author: user,
      message: 'first',
      datetime: Date.now() - 37000000,
    },
    {
      author: user,
      message: '12123',
      datetime: Date.now() - 36000000,
    },
    {
      author: user,
      message: 'fi123123rst',
      datetime: Date.now() - 35000000,
    }, {
      author: admin,
      message: 'firsdfgst',
      datetime: Date.now() - 34000000,
    },
    {
      author: moderator,
      message: 'fasdfasirst',
      datetime: Date.now() - 33000000,
    },
    {
      author: admin,
      message: 'firsta asdf asd fa ',
      datetime: Date.now() - 32000000,
    },
    {
      author: moderator,
      message: 'firsasd fas dfa sdfas  asdt',
      datetime: Date.now() - 31000000,
    },
    {
      author: admin,
      message: 'firsd fa dsf sd f st',
      datetime: Date.now() - 30000000,
    },
    {
      author: moderator,
      message: 'fia sdf asd fft rrst',
      datetime: Date.now() - 29000000,
    },
    {
      author: admin,
      message: 'fire fadf adsf asdf st',
      datetime: Date.now() - 28000000,
    },
    {
      author: moderator,
      message: 'firasd fasd fs dfasd st',
      datetime: Date.now() - 27000000,
    }, {
      author: moderator,
      message: 'fia sdf asd fft rrst',
      datetime: Date.now() - 26000000,
    },
    {
      author: admin,
      message: 'fire fadf adsf asdf st',
      datetime: Date.now() - 25000000,
    },
    {
      author: moderator,
      message: 'firasd fasd fs dfasd st',
      datetime: Date.now() - 24000000,
    }, {
      author: moderator,
      message: 'fia sdf asd fft rrst',
      datetime: Date.now() - 23000000,
    },
    {
      author: admin,
      message: 'fire fadf adsf asdf st',
      datetime: Date.now() - 22000000,
    },
    {
      author: moderator,
      message: 'firasd fasd fs dfasd st',
      datetime: Date.now() - 21000000,
    },
  );


  await db.close();
};

run().catch(console.error);
