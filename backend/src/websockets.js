const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringasArray');
const calculateDistance = require('./utils/calculateDistance');
//anotar conexoes

let io;
const connections = [];

//fazer as configuracao do servidor para aceitar as requisicoes
exports.setupWebSocket = (server) =>{
    io = socketio(server);

    //quando receber uma conexao, ouve um evento
    io.on('connection', socket=>{
        const {latitude, longitude, techs} = socket.handshake.query; //parametros enviados do front end
        
        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },  
            techs: parseStringAsArray(techs),
        });
    });
};

//Filtro 
exports.findConnections = (coordinates, techs) => {
    return connections.filter(connection => {
        return calculateDistance(coordinates, connection.coordinates) < 10
        && connection.techs.some(item => techs.includes(item))
    })
}

exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
    })
}

