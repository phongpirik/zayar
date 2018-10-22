const WebSocket = require('uws');

const ws = new WebSocket('ws://localhost:3000');

ws.on('open',()=>{
   console.log("Sucessful connected to the server. ");

   // send new message from this client to server
    ws.send('Hello server , my name is client.');

    // listen any message from the server
    ws.on('message',(message) => {
        console.log("got back message from the server with message is: ", message);
        ws.send(message);
    });
});