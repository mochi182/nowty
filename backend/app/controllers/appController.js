'use strict';

const path = require('path');
let model = require('../models/appModel.js');

exports.get_client_app = async function (req, res) {
    try {
        res.sendFile(path.join(__dirname, '../../public/index.html'));
    } catch(err) {
        res.json({"Error": err})
    }
}

///// API calls

// Get data

exports.get_activities = async function (req, res) {
    try {
        res.json(await model.get_activities())
    } catch(err) {
        res.json({"Error": err})
    }
};

exports.get_admin_data = async function (req, res) {
    try {
        res.json(await model.get_admin_data())
    } catch(err) {
        res.json({"Error": err})
    }
};

// GUI actions

exports.done = async function (req, res) {
    try {
        res.json(await model.done(req))
    } catch(err) {
        res.json({"Error": err})
    }
};

exports.insert = async function (req, res) {
    //console.log("Controlador: ", req.body)
    try {
        const data = await buildData(req);
        const result = await model.insert(data);
        res.json(result);
    } catch(err) {
        res.json({"Error": err})
    }
};

exports.delete = async function (req, res) {
    try {
        res.json(await model.delete(req))
    } catch(err) {
        res.json({"Error": err})
    }
};

// Helper functions

async function buildData(req) {
    let data = {}

    if (req.body['activityType'] == 'puntual') {
        data.entidad = 1
    } else if (req.body['activityType'] == 'rutina') {
        data.entidad = 2
    } else if (req.body['activityType'] == 'rango') {
        data.entidad = 3
    }

    data.es_nota = req.body['isNote']
    data.atributos = {
        nombre: req.body['activityName'],
    }
    if (req.body['description']) {
        data.atributos.descripcion = req.body['description'];
    }
    if (req.body['image']) {
        data.atributos.imagen = req.body['image'];
    }

    data.configuracion = {};
    data.configuracion.frecuencia_horaria = removeCommasAndBrackets(JSON.stringify(req.body['hours']));

    if (req.body['config'] === 'por-semana') {
        data.configuracion.frecuencia_diaria = moveLastCharToFirst(removeCommasAndBrackets(JSON.stringify(req.body['weekdays'])));
    } else {
        if (req.body['day']) {
            data.configuracion.dia = req.body['day'];
        }
        if (req.body['month']) {
            data.configuracion.mes = req.body['month'];
        }
        if (req.body['year']) {
            data.configuracion.anho = req.body['year'];
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

exports.manualReset = async function (req, res) {
    try {
        res.json(await model.manualReset(req))
    } catch(err) {
        res.json({"Error": err})
    }
};