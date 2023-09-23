//TODO NO PUEDE EXISTIR IMPORT DE OTRO MODELO AISLADOS ENTRE SI..
//TODO SI TENGO QUE IMPORTAR MODELO VA EN controllers
function obtenerPreguntas(data) {
    let keys = obtenerKey(data);
    paisesKeyMesclados(keys);
    let preguntas = [];
    for (let i = 0; i < 10; i++) {
        let pregunta = {};
        let respuesta = [];
        let num = Math.floor(Math.random() * 2);
        if (num % 2 == 0) {
            pregunta.clave = keys[i];
            pregunta.tipo = 'capital';
            respuesta.push(data[keys[i]].capital);
            pregunta.pregunta = data[keys[i]].nombre;
            pregunta.bandera = data[keys[i]].bandera;
            for (let j = i; j < i + 3; j++) {
                respuesta.push(data[keys[j + 10]].capital);
            }
        } else {
            pregunta.clave = keys[i];
            pregunta.tipo = 'bandera';
            respuesta.push(data[keys[i]].nombre);
            pregunta.pregunta = data[keys[i]].bandera;
            for (let j = i; j < i + 3; j++) {
                respuesta.push(data[keys[j + 10]].nombre);
            }
        }
        paisesKeyMesclados(respuesta);
        pregunta.respuesta = respuesta;
        preguntas.push(pregunta);
    }
    return preguntas;
}
//TODO modelos : pregunta, respuesta, nuevo juego
//TODO aca deberia tener metodos , con devolucion de datos.
//TODO logica interna de cada modelo


function obtenerKey(data) {
    let paisesArrayKey = [];
    for (let i = 0; i < data.length; i++) {
        paisesArrayKey.push(i);
    };
    return paisesArrayKey;
}

function paisesKeyMesclados(keys) {
    for (let i = keys.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [keys[i], keys[j]] = [keys[j], keys[i]];
    }
}
function creaPregunta(keys, data) {
    let pregunta = {};
}
export { obtenerPreguntas };
