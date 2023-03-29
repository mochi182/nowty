Readme

Problemas resueltos:

const today = new Date() no da el día correcto.
Problema:
El formato ISO 8601 no toma en cuenta el timezone. Por eso se adelanta 5 horas.
Solución:
Ajustar la nueva fecha con la diferencia de tiempo entre UTC timezone y timezone local:
const today = new Date()
const todayFormatted = new Date(today.getTime() - (today.getTimezoneOffset() * 60000))
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
Stackoverflow con la solución:
https://stackoverflow.com/questions/10830357/javascript-toisostring-ignores-timezone-offset