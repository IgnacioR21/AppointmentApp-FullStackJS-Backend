const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');

// crear el servidor 

const app = express();


//Habilitar Cors
const whitelist = ['http://localhost:3000'];
const corsOptions = {
    origin: (origin, callback) => {
        const existe = whitelist.some( dominio => dominio === origin);
        if(existe) {
            callback(null, true)
        } else {
            callback (new Error('No Permitido por CORS'))
        }
    }
}

//Este es para bloquear
//app.use(cors(corsOptions));
//Este es para tenerlo abierto
app.use(cors());

// Conectar a mongo DB

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/veterinaria', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    //useFindAndModify: false
});

// Habilitar el body parser

app.use(express.json());
app.use(express.urlencoded({extended: true}));
/*
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
*/

//habilitar routing
app.use('/', routes())

// puerto y arrancar el servidor 

app.listen(4000, () => {
    console.log('Servidor funcionando');
})

