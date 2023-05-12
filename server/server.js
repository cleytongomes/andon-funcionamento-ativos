const mqtt = require('mqtt');
const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

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
    console.log('a user connected');

    // socket.on('subscribe', (topic) => {

    //     console.log("LENDO DAQUI -> " + topic);

    //     // const [machine] = topic.split('/');

    //     // if (allowedMachines[decodedToken.username].includes(machine)) {
    //     //     socket.join(topic);
    //     // } else {
    //     //     socket.emit('error', 'Você não tem permissão para acessar essa máquina.');
    //     // }
    // });
});

server.listen(3001, () => {
    console.log('listening on *:3001');
});

const mqttOptions = {
    host: 'localhost',
    port: 1883
}

const client = mqtt.connect(mqttOptions);

client.subscribe('equipamento1/estado')
client.subscribe('equipamento2/estado')

client.on('message', (topic, message) => {
    console.log(message.toString());
    io.emit(topic, message.toString());
    console.log(topic);
});
