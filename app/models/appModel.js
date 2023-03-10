'user strict';

let client = require('./db.js');

exports.select_all = async function () {
  let query = `
    SELECT *
    FROM actividad AS a
    JOIN tipo_de_actividad AS ta ON a.id_tipo_de_actividad = ta.id
    JOIN configuracion AS c ON a.id = c.id_actividad
  `
  const results = await client.promise().query(query)
  console.log(results[0])
  return results[0]
}

exports.done = async function (req) {
  try {
    let id = req.body.id;
    let isChecked = req.body.isChecked ? 1 : 0;
    let query = `UPDATE actividad SET hecho = ${isChecked} WHERE id = ${id}`
    const results = await client.promise().query(query)
    return results[0]
  } catch (err) {
    console.log(err)
    throw err;
  }
}

exports.insert = async function (data) {
  try {
    // Insert data into 'actividad' table
    const insertActividadQuery = `INSERT INTO actividad (nombre, descripcion, imagen, id_tipo_de_actividad) VALUES (?, ?, ?, ?)`;
    const insertActividadResult = await client.promise().query(insertActividadQuery, [
      data.atributos.nombre,
      data.atributos.descripcion || null,
      data.atributos.imagen || null,
      data.entidad
    ]);
    const actividadId = insertActividadResult[0].insertId;

    // Insert data into 'configuracion' table with reference to 'actividad' table
    const insertConfiguracionQuery = `INSERT INTO configuracion (frecuencia_horaria, frecuencia_diaria, dia, mes, anho, id_actividad) VALUES (?, ?, ?, ?, ?, ?)`;
    const insertConfiguracionResult = await client.promise().query(insertConfiguracionQuery, [
      data.configuracion.frecuencia_horaria || null,
      data.configuracion.frecuencia_diaria || null,
      data.configuracion.dia || null,
      data.configuracion.mes || null,
      data.configuracion.anho || null,
      actividadId
    ]);

    return insertConfiguracionResult[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

