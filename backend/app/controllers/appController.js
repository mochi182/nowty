'use strict';

let model = require('../models/appModel.js');

exports.select_all = async function (req, res) {
    try {
        res.render('index', {data: await model.select_all()})
    } catch(err) {
        res.json({"Error": err})
    }
};

exports.select_all_json = async function (req, res) {
    try {
        res.json(await model.select_all())
    } catch(err) {
        res.json({"Error": err})
    }
};

exports.admin = async function (req, res) {
    try {
        res.render('admin', {data: await model.admin()})
    } catch(err) {
        res.json({"Error": err})
    }
};

exports.admin_json = async function (req, res) {
    try {
        res.json(await model.admin())
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

exports.test = async function (req, res) {
    console.log("Test: ", req.body)
    try {
        res.json({"Hola": "Mundo"})
    } catch(err) {
        res.json({"Error": err})
    }
};

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