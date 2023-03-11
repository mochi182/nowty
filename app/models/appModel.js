'user strict';

let client = require('./db.js');

exports.select_all = async function () {
  // Get today's date and the max date (365 days from now)
  const today = new Date()
  const maxDate = new Date(today.getTime() + (365 * 24 * 60 * 60 * 1000))
  const todayFormatted = today.toISOString().split('T')[0]
  const maxDateFormatted = maxDate.toISOString().split('T')[0]

  // Query for rows of type "puntual"
  let queryPuntual = `
    SELECT *
    FROM actividad AS a
    JOIN tipo_de_actividad AS ta ON a.id_tipo_de_actividad = ta.id
    JOIN configuracion AS c ON a.id = c.id_actividad
    WHERE ta.tipo = 'puntual'
    AND c.dia IS NOT NULL AND c.mes IS NOT NULL AND c.anho IS NOT NULL
    AND STR_TO_DATE(CONCAT(c.dia, '/', c.mes, '/', c.anho), '%d/%m/%Y') BETWEEN '${todayFormatted}' AND '${maxDateFormatted}'
  `

  // Query for rows of type "rutina" or "nota"
  let queryRutinaNota = `
    SELECT *
    FROM actividad AS a
    JOIN tipo_de_actividad AS ta ON a.id_tipo_de_actividad = ta.id
    JOIN configuracion AS c ON a.id = c.id_actividad
    WHERE ta.tipo IN ('rutina', 'nota')
    AND (
      (c.dia = ${today.getDate()} AND c.mes IS NULL AND c.anho IS NULL) OR
      (c.mes = ${today.getMonth() + 1} AND c.dia IS NULL AND c.anho IS NULL) OR
      (c.anho = ${today.getFullYear()} AND c.dia IS NULL AND c.mes IS NULL) OR
      (c.dia = ${today.getDate()} AND c.mes = ${today.getMonth() + 1} AND c.anho IS NULL) OR
      (c.dia = ${today.getDate()} AND c.anho = ${today.getFullYear()} AND c.mes IS NULL) OR
      (c.mes = ${today.getMonth() + 1} AND c.anho = ${today.getFullYear()} AND c.dia IS NULL) OR
      (c.dia = ${today.getDate()} AND c.mes = ${today.getMonth() + 1} AND c.anho = ${today.getFullYear()})
    )
  `

  // Query for rows of type "rutina" or "nota" with frecuencia_diaria
  let queryRutinaNotaFrecuencia = `
  SELECT *
  FROM actividad AS a
  JOIN tipo_de_actividad AS ta ON a.id_tipo_de_actividad = ta.id
  JOIN configuracion AS c ON a.id = c.id_actividad
  WHERE ta.tipo IN ('rutina', 'nota')
  AND c.dia IS NULL AND c.mes IS NULL AND c.anho IS NULL
  AND SUBSTR(c.frecuencia_diaria, DAYOFWEEK('${todayFormatted}'), 1) = '1'  
  `

  // Combine the queries and get the results
  let query = `${queryPuntual} UNION ${queryRutinaNota} UNION ${queryRutinaNotaFrecuencia}`
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

