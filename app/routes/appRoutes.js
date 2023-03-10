'use strict';

let controller = require('../controllers/appController.js');

exports.routes = function (app) {
    
    // Get:

    app.get('/', function (req, res) {
        controller.select_all(req, res);
    });

    app.get('/advanced', function (req, res) {
        controller.advanced(req, res);
    });

    app.get('/stats', function (req, res) {
        controller.stats(req, res);
    });

    app.get('/config', function (req, res) {
        controller.config(req, res);
    });

    app.get('/update', function (req, res) {
        controller.update(req, res);
    });

    // Post:

    app.post('/done', function (req, res) {
        controller.done(req, res);
    });

    app.post('/insert', function (req, res) {
        controller.insert(req, res);
    });

};