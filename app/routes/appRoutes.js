'use strict';

exports.routes = function (app) {
    let controller = require('../controllers/appController.js');

    app.get('/', function (req, res) {
        res.json({ "Hola": "Adiós" });
    });

    app.get('/all', function (req, res) {
        controller.select_all(req, res);
    });

    app.get('/done', function (req, res) {
        controller.done(req, res);
    });

    app.get('/insert', function (req, res) {
        controller.insert(req, res);
    });
};