// Configurar variables de entorno
var dotenv = require('dotenv');
dotenv_path = './env/.env';
dotenv.config({path: dotenv_path});

// App
var express = require('express');  
app = express();

// Cors
const cors = require('cors');
app.use(cors());

// Usar JSON
app.use(express.json());

// Recursos
app.use(express.static(__dirname + '/public'));
//app.use(express.static(path.join(__dirname, 'public/client')));

// Configurar plantillas
app.set('view engine', 'ejs');
app.set('views', './app/views');

// Configurar carpeta de archivos estáticos
app.use('/recursos', express.static(__dirname + '/public'));

// Configurar rutas
var routes = require('./app/routes/appRoutes.js').routes; //importing route
routes(app); //register the route

// Servidor
var port = process.env.SERVER_PORT;
const server = app.listen(port, 'localhost', () => {
    server.keepAliveTimeout = 0; // Disable default keep-alive timeout
    server.headersTimeout = 0;   // Disable default headers timeout
    console.log('Server is running on port ' + port);
});
  

// Cronjob ----------
var timeout = require('connect-timeout');
app.use(timeout('600s'));
const cron = require('node-cron');

// Schedule the job to run every minute
cron.schedule('* * * * *', () => {
    //console.log(`Running the job at ${new Date()}`);
    //fetch('http://localhost:3000/reset')
    //  .then(response => console.log(response))
    //  .catch(err => console.error(err));
  });