'use strict';

let controller = require('../controllers/appController.js');

exports.routes = function (app) {

    app.post("/heh", function (req, res) {
        console.log(req.body.id, req.body.isChecked) // populated!
        res.send(200, req.body);
    });

    app.get('/all', function (req, res) {
        controller.select_all(req, res);
    });

    app.post('/done', function (req, res) {
        controller.done(req, res);
    });

    app.get('/insert', function (req, res) {
        controller.insert(req, res);
    });
};