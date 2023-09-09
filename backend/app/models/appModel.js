'user strict';

let client = require('./db.js');

exports.select_all = async function () {
    // Get today's date and the max date (365 days from now)
    const today = new Date()
    const todayFormatted = new Date(today.getTime() - (today.getTimezoneOffset() * 60000)).toISOString().split('T')[0]
    const maxDate = new Date(today.getTime() - (today.getTimezoneOffset() * 60000) + (365 * 24 * 60 * 60 * 1000))
    const maxDateFormatted = maxDate.toISOString().split('T')[0]

    // Query for rows of type "puntual"
    let queryPuntual = `
    SELECT *
    FROM actividad AS a
    JOIN tipo_de_actividad AS ta ON a.id_tipo_de_actividad = ta.id
    JOIN configuracion AS c ON a.id = c.id_actividad
    WHERE ta.tipo = 'puntual'
    AND a.hecho = 0
    AND c.dia IS NOT NULL AND c.mes IS NOT NULL AND c.anho IS NOT NULL
    AND STR_TO_DATE(CONCAT(c.dia, '/', c.mes, '/', c.anho), '%d/%m/%Y') = '${todayFormatted}'
    `

    // Query for rows of type "rango"
    let queryRango = `
    SELECT *
    FROM actividad AS a
    JOIN tipo_de_actividad AS ta ON a.id_tipo_de_actividad = ta.id
    JOIN configuracion AS c ON a.id = c.id_actividad
    WHERE ta.tipo = 'rango'
    AND a.hecho = 0
    AND c.dia IS NOT NULL AND c.mes IS NOT NULL AND c.anho IS NOT NULL
    AND STR_TO_DATE(CONCAT(c.dia, '/', c.mes, '/', c.anho), '%d/%m/%Y') BETWEEN '${todayFormatted}' AND '${maxDateFormatted}'
    `

    // Query for rows of type "rutina"
    let queryRutinaNota = `
    SELECT *
    FROM actividad AS a
    JOIN tipo_de_actividad AS ta ON a.id_tipo_de_actividad = ta.id
    JOIN configuracion AS c ON a.id = c.id_actividad
    WHERE ta.tipo = 'rutina' 
    AND a.hecho = 0 
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

    // Query for rows of type "rutina" with frecuencia_diaria
    let queryRutinaNotaFrecuencia = `
    SELECT *
    FROM actividad AS a
    JOIN tipo_de_actividad AS ta ON a.id_tipo_de_actividad = ta.id
    JOIN configuracion AS c ON a.id = c.id_actividad
    WHERE ta.tipo = 'rutina' 
    AND a.hecho = 0 
    AND c.dia IS NULL AND c.mes IS NULL AND c.anho IS NULL 
    AND SUBSTR(c.frecuencia_diaria, DAYOFWEEK('${todayFormatted}'), 1) = '1'  
    `

    // Combine the queries and get the results
    let query = `${queryPuntual} UNION ${queryRango} UNION ${queryRutinaNota} UNION ${queryRutinaNotaFrecuencia}`
    const results = await client.promise().query(query)
    //console.log(results[0])
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
        const insertActividadQuery = `INSERT INTO actividad (nombre, descripcion, imagen, id_tipo_de_actividad, es_nota) VALUES (?, ?, ?, ?, ?)`;
        const insertActividadResult = await client.promise().query(insertActividadQuery, [
            data.atributos.nombre,
            data.atributos.descripcion || null,
            data.atributos.imagen || null,
            data.entidad,
            data.es_nota
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

exports.reset = async function (req) {
    // Causes reset_actividad_hecho TRIGGER to fire
    try {
        // Get the latest date in the cronjob_log table
        let query = `SELECT DATE(tiempo) as latest_date FROM cronjob_log ORDER BY tiempo DESC LIMIT 1;`
        const results = await client.promise().query(query)
        const latest_date = results[0][0].latest_date.toISOString().slice(0, 10);

        // Insert a new row into the cronjob_log table if the latest date is less than the current date
        current_date = new Date().toISOString().slice(0, 10);

        if (latest_date < current_date) {
            //console.log("Reset will be triggered.")
            query = `INSERT INTO cronjob_log (tiempo) VALUES (CURDATE());`
            await client.promise().query(query)
        }

        return results[0]
    } catch (err) {
        console.log(err)
        throw err;
    }
}


// Reset actividad of type rutina
exports.manualReset = async function (req) {
    try {
        const query = `UPDATE actividad SET hecho = 0 WHERE id_tipo_de_actividad = 2`;
        const results = await client.promise().query(query);
        console.log(results[0])
        return results[0];
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// Delete
exports.delete = async function (req) {
    try {
        const id_actividad = req.body.id;
        
        // Delete record from 'configuracion' table
        const deleteConfiguracionQuery = `DELETE FROM configuracion WHERE id_actividad = ?`;
        await client.promise().query(deleteConfiguracionQuery, [id_actividad]);

        // Delete record from 'actividad' table
        const deleteActividadQuery = `DELETE FROM actividad WHERE id = ?`;
        await client.promise().query(deleteActividadQuery, [id_actividad]);

        return { message: 'Record deleted successfully' };
    } catch (err) {
        console.log(err);
        throw err;
    }
}
