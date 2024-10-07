import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';
import expressWs from "express-ws";
import {WebSocket} from "ws";
import usersRouter from "./routers/users";

const app = express();

expressWs(app)

app.use(cors(config.corsOptions));
app.use(express.json());

app.use('/users', usersRouter);

interface incomingMessage{
    type: string;
    payload: string;
}

const router = express.Router();
const connectedClients: WebSocket[] = []

router.ws('/chat', (ws, req) => {

    connectedClients.push(ws);
    console.log('client connected, total clients',connectedClients.length);
    let username = 'anonymous'

    ws.on('close', () => {
       connectedClients.splice(connectedClients.indexOf(ws), 1);
       console.log('client disconnected, total clients',connectedClients.length);
    })

    ws.on('message', (message) => {
        try {
            const decodedMessage = JSON.parse(message.toString()) as incomingMessage
            if (decodedMessage.type === 'SET_USERNAME') {
                username=decodedMessage.payload

            }else if(decodedMessage.type === 'SEND_MESSAGE'){
                connectedClients.forEach((client) => {
                    client.send(JSON.stringify({
                        type: 'NEW_MESSAGE',
                        payload: {
                            username,
                            message:decodedMessage.payload},
                    }));
                })
            }


        }catch (e){}

    })
})

app.use(router)



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
