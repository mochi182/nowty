'user strict';

let client = require('./db.js');

exports.select_all = async function () {
    let query = 'SELECT * FROM actividad'
    const results = await client.promise().query(query)
    return results[0]
}

exports.done = async function (req) {
    let id = req.body.id;
    let isChecked = req.body.isChecked ? 1 : 0;
    let query = `UPDATE actividad SET hecho = ${isChecked} WHERE id = ${id}`
    const results = await client.promise().query(query)
    return results[0]
}

exports.insert = async function (req) {
    let body = req.body;
    console.log(req.body)
    return req.body;
}