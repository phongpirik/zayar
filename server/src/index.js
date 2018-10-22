import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import {version} from '../package.json';
import WebSocketServer, {Server} from 'uws';

const PORT = 3000;
const app = express();
app.server = http.createServer(app);


app.use(morgan('dev'));


app.use(cors({
    exposedHeaders: "*"
}));

app.use(bodyParser.json({
    limit: '50mb'
}));
app.set('root', __dirname);


app.wss = new Server({
    server: app.server
});

let client = [];

app.wss.on('connection', (connection) => {
    console.log('New client connected');

    // listen event new message from client.
    connection.on('message',(message) => {
       console.log("Got new message from client, the message is:", message);

       // after getting new message grom client . We send back to the client with new message

        //connection.send(message + " " + new Date());
    });


    const userId = client.length;
    connection.userId = userId;

    const newClient = {
        ws:connection,
        userId: userId,
    };

    client.push(newClient);

    console.log('New client connected with user id:', userId);

    connection.on('close', ()=>{
       console.log('client dissconnected with Id ',userId);
       client = client.filter((client)=> client.userId !== userId);
    });
});

app.get('/',(req, res) => {
    res.json({
       version: version
    });
});

app.get('/api/all_connection',(req, res, next) => {
    console.log('phong');
   return res.json({
      pelple: client,
   });
});

setInterval(()=>{
    console.log(`There ${client.length} people in the connection`);

    //each 3 seconds this function will be executed.
    if (client.length > 0){
        client.forEach((client) => {
            console.log("Client ID ", client.userId);
            const msg = `Hey ID: ${client.userId}: you got a new message from server`;
            client.ws.send(msg);
        });
    }
},3000);

app.server.listen(process.env.PORT || PORT, () => {
    console.log(`App is running on port ${app.server.address().port}`);
});

export default app;