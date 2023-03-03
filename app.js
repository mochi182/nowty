// Configurar variables de entorno (.env)
var dotenv = require('dotenv');
dotenv_path = './env/.env';
dotenv.config({path: dotenv_path});

// App
var express = require('express');
  
app = express();

var routes = require('./app/routes/appRoutes.js').routes; //importing route
routes(app); //register the route

var port = process.env.SERVER_PORT;
app.listen(port);
console.log('API server started on: ' + port);