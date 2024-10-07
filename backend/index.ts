import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';
import expressWs from 'express-ws';
import usersRouter from './routers/users';
import User from './models/User';
import {ConnectedClients, OnlineUser} from './types';
import Message from './models/Message';

const app = express();

expressWs(app);

app.use(cors(config.corsOptions));
app.use(express.json());

app.use('/users', usersRouter);

interface incomingMessage {
  type: string;
  payload: string;
}

const router = express.Router();
const connectedClients: ConnectedClients[] = [];

router.ws('/chat', (ws, req) => {
  let user: OnlineUser = {
    _id: 'id',
    username: 'anonymous',
    role: 'user',
  };
  connectedClients.push({ws, user});
  console.log('client connected, total clients', connectedClients.length);


  ws.on('close', () => {
    const index = connectedClients.findIndex((client => client.ws === ws));
    connectedClients.splice(index, 1);
    console.log('client disconnected, total clients', connectedClients.length);
  });

  ws.on('message', async (message) => {
    try {
      const decodedMessage = JSON.parse(message.toString()) as incomingMessage;

      if (decodedMessage.type === 'LOGIN') {
        const currentUser = await User.findOne({token: decodedMessage.payload});
        if (currentUser) {
          user = {
            _id: currentUser._id.toString(),
            username: currentUser.username,
            role: currentUser.role,
          };
          if (connectedClients.find((client) => client.user === user)) {
            return ws.close();
          }
          const index = connectedClients.findIndex((client => client.ws === ws));
          connectedClients[index].user = user;
          const users = connectedClients.map(user => {
            return user.user;
          });

          connectedClients.forEach((client) => {
            client.ws.send(JSON.stringify({
              type: 'LOGINED',
              payload: users,
            }));
          });

          const messages = await Message.find().populate('author', 'username');
          ws.send(JSON.stringify({
            type: 'OLD_MESSAGES',
            payload: messages.length > 30 ? messages.slice(-30) : messages,
          }));

        } else {
          return ws.close();
        }
      } else if (decodedMessage.type === 'SEND_MESSAGE') {
        const index = connectedClients.findIndex((client => client.ws === ws));
        const newMessage = {
          author: connectedClients[index].user._id,
          message: decodedMessage.payload,
        };
        const message = new Message(newMessage);
        await message.save();
        await message.populate('author', 'username');

        connectedClients.forEach((client) => {
          client.ws.send(JSON.stringify({
            type: 'NEW_MESSAGE',
            payload: message,
          }));
        });
      }
    } catch (e) {
    }

  });
});

app.use(router);

const port = 8000;
const run = async () => {
  await mongoose.connect(config.database);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
