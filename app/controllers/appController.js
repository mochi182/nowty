'use strict';

let model = require('../models/appModel.js');

exports.select_all = async function (req, res) {
    try {
        res.render('index', {data: await model.select_all()})
    } catch(err) {
        res.json({"Error": err})
    }
};

exports.advanced = async function (req, res) {
    try {
        res.render('advanced')
    } catch(err) {
        res.json({"Error": err})
    }
};

exports.stats = async function (req, res) {
    try {
        res.render('stats')
    } catch(err) {
        res.json({"Error": err})
    }
};

exports.config = async function (req, res) {
    try {
        res.render('config')
    } catch(err) {
        res.json({"Error": err})
    }
};

exports.update = async function (req, res) {
    try {
        res.render('update')
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
    console.log("FREEEG", req.body)
    try {
        const data = await buildData(req);
        const result = await model.insert(data);
        res.json(result);
    } catch(err) {
        res.json({"Error": err})
    }
};

async function buildData(req) {
    let data = {}
    data.entidad = req.body['dropdown-select'];
    data.atributos = {
        nombre: req.body['actividad-input'],
    }
    if (req.body['descripcion-textarea']) {
        data.atributos.descripcion = req.body['descripcion-textarea'];
    }
    if (req.body['imagen-input']) {
        data.atributos.imagen = req.body['imagen-input'];
    }
    data.configuracion = {};
    if (req.body['date-dropdown'] === 'por-semana') {
        data.configuracion.frecuencia_horaria = removeCommasAndBrackets(req.body['horas-input']);
        data.configuracion.frecuencia_diaria = moveLastCharToFirst(removeCommasAndBrackets(req.body['dias-input']));
    } else {
        if (req.body['dia']) {
            data.configuracion.dia = req.body['dia'];
        }
        if (req.body['mes']) {
            data.configuracion.mes = req.body['mes'];
        }
        if (req.body['anho']) {
            data.configuracion.anho = req.body['anho'];
        }
    }

    return data;
}

function removeCommasAndBrackets(inputString) {
    return inputString.replace(/[[\],]/g, '');
  }
  
  function moveLastCharToFirst(inputString) {
    const lastCharacter = inputString.slice(-1);
    const newString = lastCharacter + inputString.slice(0, -1);
    return newString;
  }

  exports.reset = async function (req, res) {
    try {
        await model.reset(req)
    } catch(err) {
        res.json({"Error": err})
    }
};