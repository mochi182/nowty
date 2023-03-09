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

exports.insert = async function (data) {
    try {
      const insertQuery = `INSERT INTO ${data.entidad} (${Object.keys(data.atributos).join(',')}) VALUES (${Object.values(data.atributos).map(value => `"${value}"`).join(',')})`;
      const insertResult = await client.promise().query(insertQuery);
  
      const insertConfiguracionQuery = `INSERT INTO configuracion (${Object.keys(data.configuracion).join(',')}) VALUES (${Object.values(data.configuracion).map(value => `"${value}"`).join(',')})`;
      const insertConfiguracionResult = await client.promise().query(insertConfiguracionQuery);
  
      const insertEntityVsConfiguracionQuery = `INSERT INTO ${data.entidad}_vs_configuracion (id_${data.entidad}, id_configuracion) VALUES (${insertResult[0].insertId}, ${insertConfiguracionResult[0].insertId})`;
      const insertEntityVsConfiguracionResult = await client.promise().query(insertEntityVsConfiguracionQuery);
  
      return insertEntityVsConfiguracionResult[0];
    } catch (err) {
      throw err;
    }
  };
  