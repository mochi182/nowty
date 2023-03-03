'use strict';

exports.routes = function (app) {
    let controller = require('../controllers/appController.js');

    app.get('/', function (req, res) {
        res.json({ "Hola": "Adiós" });
    });

    app.get('/all', function (req, res) {
        controller.read(req, res);
    });

    app.get('/insert', function (req, res) {
        controller.insert(req, res);
    });
};