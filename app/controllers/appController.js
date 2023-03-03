'use strict';

let model = require('../models/appModel.js');

exports.all = async function (req, res) {
    try {
        res.json(await model.all())
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