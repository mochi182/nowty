'use strict';

let model = require('../models/appModel.js');

exports.select_all = async function (req, res) {
    try {
        res.render('index', {data: await model.select_all()})
    } catch(err) {
        res.json({"Error": err})
    }
};

exports.done = async function (req, res) {
    try {
        res.json(await model.done(req))
    } catch(err) {
        res.json({"Error": err})
    }
};

exports.insert = async function (req, res) {
    try {
        res.json(await model.insert(req))
    } catch(err) {
        res.json({"Error": err})
    }
};