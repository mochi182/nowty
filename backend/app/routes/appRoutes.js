'use strict';

let controller = require('../controllers/appController.js');

exports.routes = function (app) {
    
    // Get:

    app.get('/', function (req, res) {
        controller.get_client_app(req, res);
    });

    app.get('/api/activities', function (req, res) {
        controller.get_activities(req, res);
    });  

    app.get('/api/admindata', function (req, res) {
        controller.get_admin_data(req, res);
    })

    app.get('/api/reset', function (req, res) {
        controller.reset(req, res);
    });

    app.get('/api/manualreset', function (req, res) {
        controller.manualReset(req, res);
    });

    // Post:

    app.post('/api/done', function (req, res) {
        console.log("HOLAAAAA")
        controller.done(req, res);
    });

    app.post('/api/insert', function (req, res) {
        controller.insert(req, res);
    });

    app.post('/api/delete', function (req, res) {
        controller.delete(req, res);
    });

};