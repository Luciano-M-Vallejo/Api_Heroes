'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Vengadores')
    .then(() => {
        console.log("Conectado...");

        app.listen(port, () => {
            console.log("Servidor corriendo en la url: localhost:3700");
        });
    })
    .catch(err => console.log(err));