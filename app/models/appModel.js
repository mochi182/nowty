'user strict';

let client = require('./db.js');

exports.select_all = async function () {
    let query = 'SELECT * FROM actividad'
    const results = await client.promise().query(query)
    return results[0]
}

exports.done = async function (req) {
    console.log(9009)
    console.log(req.params.id, req.params.isChecked)
    let id = req.params.id;
    let isChecked = req.params.isChecked ? 1 : 0;
    console.log(id, isChecked)
    let query = `UPDATE actividad SET hecho = ${isChecked} WHERE id = ${id}`
    const results = await client.promise().query(query)
    console.log(results)
    return results[0]
}

exports.insert = async function (req) {
    var results = {0: 0};
    return results;
}
