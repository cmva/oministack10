const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebSocket } = require('./websockets');

const app = express();
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect('mongodb+srv://Caio:oministack@cluster0-ctwet.mongodb.net/oministack10?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true,

});

app.use(cors());
app.use(express.json()); //entender requisiçoes .json para nao retornar undefined Obs:antes da rota
app.use(routes);

server.listen(3333);