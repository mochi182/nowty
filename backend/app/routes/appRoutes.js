'use strict';

let controller = require('../controllers/appController.js');

exports.routes = function (app) {
    
    // Get:

    app.get('/', function (req, res) {
        controller.get_client(req, res);
    });

    app.get('/api/activities', function (req, res) {
        controller.select_all(req, res);
    });  

    app.get('/api/admindata', function (req, res) {
        controller.admindata(req, res);
    })

    /*

    app.get('/update', function (req, res) {
        controller.update(req, res);
    });

    app.get('/reset', function (req, res) {
        controller.reset(req, res);
    });

    app.get('/manualreset', function (req, res) {
        controller.manualReset(req, res);
    });

    */

    // Post:

    app.post('/api/test', function (req, res) {
        controller.test(req, res);
    });

    app.post('/api/done', function (req, res) {
        controller.done(req, res);
    });

    app.post('/api/insert', function (req, res) {
        controller.insert(req, res);
    });

    app.post('/api/delete', function (req, res) {
        controller.delete(req, res);
    });

};