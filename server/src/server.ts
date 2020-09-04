import express from 'express';
import cors from 'cors';
// import routes from './routes';
import { createServer } from 'http';
import WebSocket from 'ws';

const app = express();
const server = createServer(app);
const wss = new WebSocket.Server({ server });

const connectedUsers: string[] = []

wss.on('connection', (socket) => {
    connectedUsers.push(`${Math.random()}`);
    console.log(`${connectedUsers.length} conectados`);

    socket.on('close', () => {
        connectedUsers.pop();
        console.log(`${connectedUsers.length} conectados`);
    });

    socket.on('message', (message: string) => {
        wss.clients.forEach((client) => {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(message);
                console.log(message);
            }
        });
    });
});


app.use(cors());
app.use(express.json());

server.listen(3333);