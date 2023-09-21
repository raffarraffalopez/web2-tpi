var preguntas = [];
var respuestasTrue = [];
var respuestasAll = [];
debug('cargado preguntas');
//debug(paisesClaves);
// puedo crear preguntas mientras tenga claves
for (let i = 0; i < 10; i++) {
    //debug(paisesClaves.pop());
}
preguntasCrear(paises,paisesClaves);
function preguntasCrear(paises, paisesClaves) {
    for (let i = 0; i < 10; i++) {
        let clave = paisesClaves.pop();
        let rest = [];
        let pregunta;
        if (Math.floor(Math.random() * 2)) {
            // capital
            pregunta = {
                type: 'capital',
                capital: paises[clave].nombre,
                respuesta:paises[clave].capital
            }
            preguntas.push(pregunta);
            //      preguntas.push(paises[clave].nombre);
            respuestasTrue.push(paises[clave].capital);
            rest.push(paises[clave].capital);
            for (let j = 0; j < 3; j++) {
                clave = paisesClaves.pop();
                rest.push(paises[clave].capital);
            }
        } else {
            // bandera
            //preguntas.push(paises[clave].bandera);
            pregunta = {
                type: 'bandera',
                bandera: paises[clave].bandera,
                respuesta: paises[clave].nombre
            }
            preguntas.push(pregunta);
            respuestasTrue.push(paises[clave].nombre);
            rest.push(paises[clave].nombre);

            for (let j = 0; j < 3; j++) {
                clave = paisesClaves.pop();
                rest.push(paises[clave].nombre);
            }
            rest=datosMezclados(rest);

        }
        respuestasAll.push(rest);
    }
}
