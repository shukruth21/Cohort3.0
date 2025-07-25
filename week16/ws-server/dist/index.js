"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8000 });
//event handler 
//whenever a connection is made give me the socket of the person
wss.on('connection', function (socket) {
    console.log("user connected");
    //this shows how a server can send a message 
    setInterval(() => {
        socket.send("hello the price of solana is " + Math.random());
    }, 5000);
    //client sending message to server
    socket.on("message", (event) => {
        if (event.toString() === "ping") {
            socket.send("pong");
        }
    });
});
