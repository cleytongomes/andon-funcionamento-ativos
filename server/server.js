const mqtt = require('mqtt');
const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const socketsTopics = {};

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3002",
        methods: ["GET", "POST"]
    }
});

io.use((socket, next) => {
    const token = socket.handshake.query.token;

    console.log("TOLKIEN: " + token);

    // verificar se o token é válido
    if (token === 'TESTE') {
        return next();
    }

    return
});

io.on('connection', (socket) => {
    // todas as funções do socket em uma lista?
    // são:  on, emit, join, leave, disconnect,  broadcast, to, in, 
    // 
    socket.on('event', (data) => {
        console.log(data);
     });
    console.log('a user connected');
    
    socket.on('subscribe', (topic) => {
        console.log("SUB TOPIC : " + topic);
        client.subscribe(topic);

        if (!socketsTopics[socket.id]) {
            socketsTopics[socket.id] = new Set();
        } 

        socketsTopics[socket.id].add(topic);

    });
    socket.on('unsubscribe', (topic) => {
        console.log("UNSUB TOPIC : " + topic);
        client.unsubscribe(topic);
    });
    socket.on('disconnect', ( topic ) => {
        socketsTopics[socket.id].forEach((topic) => {
            client.unsubscribe(topic);
            console.log("DISCON TOPIC : " + topic);
        });
        // Remover o socket da lista de sockets
        delete socketsTopics[socket.id];
    });
    socket.on('leave', (topic) => {
        console.log("LEAVE TOPIC : " + topic);
        client.unsubscribe(topic);
    });
});

server.listen(3001, () => {
    console.log('listening on *:3001');
});

const mqttOptions = {
    host: 'localhost',
    port: 1883
}

const client = mqtt.connect(mqttOptions);

// client.subscribe('equipamento/FND001/estado')
// client.subscribe('equipamento/FND002/estado')

client.on('message', (topic, message) => {
    console.log(topic, 'VALOR =>' ,message.toString());
    io.emit(topic, message.toString());
});
