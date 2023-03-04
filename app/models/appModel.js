'user strict';

let client = require('./db.js');

exports.select_all = async function () {
    let query = 'SELECT * FROM actividad'
    const results = await client.promise().query(query)
    return results[0]
}

exports.insert = async function (req) {
    var results = {0: 0};
    return results;
}
