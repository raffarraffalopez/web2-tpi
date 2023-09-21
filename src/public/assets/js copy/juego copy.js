
// Variables
let paises;
let preguntaIndex = -1;
let tiempoInicial = 500;
let tiempoRestante;
let tiempoTotal = 0;
let intervalId;
let resultadoRespuestas = [];
let puntaje = 0;
const DEBUG = false;
const apiUrl = DEBUG ? 'http://localhost:8080' : 'https://tuds-web2-dev.fl0.io';

// Captura de elementos del documento
const timer = document.getElementById('time');
const nroPregunta = document.getElementById('nro_preg');
const cardRespuesta = document.getElementById('respuesta');
async function obtenerDatosPaises() {
    try {
        const response = await fetch(`${apiUrl}/preguntas`);
        if (response.status === 200) {
            const datosPaises = await response.json();
            return datosPaises;
        } else {
            console.error('Error en la solicitud:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return null;
    }
}

function presentarPregunta() {
    preguntaIndex++;
    nroPregunta.textContent = preguntaIndex + 1;
    if (preguntaIndex < paises.length) {
        const pregunta = paises[preguntaIndex];
        crearTrivia(pregunta);
        tiempoRestante = tiempoInicial;
        intervalId = setInterval(verificarTiempoRestante, 1000);

    } else {
        clearInterval(intervalId);
        mostrarResultado();
    }
}
function mostrarResultado() {
    timer.textContent = '0';
    tiempoRestante = 0;
    const container = document.getElementById('pregunta');
    container.innerHTML = '';
    cardRespuesta.innerHTML = '';
    const div = document.createElement('div');
    const p = document.createElement('p');
    p.innerHTML = `Su puntaje fue  ${puntaje} / ${paises.length}.<br> Respondió en ${(tiempoTotal.toFixed(2))} segundos <br> Su tiempo promedio fue ${(tiempoTotal / paises.length).toFixed(2)} segundos`;
    div.appendChild(p);
    container.appendChild(div);
    resultadoRespuestas = JSON.stringify(resultadoRespuestas);
    console.log(`Array de respuestas -> ${resultadoRespuestas}`);
}
/**
 * Crea l aprguta para la trivia en base a la dta recibida del server
 * la data contien , tipo pregunta, pregunta y 4 repsuestas poibles 
 * no identifica la repsuesta correcta pra evitar que el usario pueda ver a repsuesta
 * en e caso d ebandera, se cpomplica, tal vez deberia venir codificado como base64 desde el server,
 *  pero de todas maenra el jugado rpuede busca rimagen en google
 */
async function crearTrivia(dato) {
    const inicioPregunta = performance.now();
    const container = document.getElementById('pregunta');
    container.innerHTML = '';
    cardRespuesta.innerHTML = '';
    const div = document.createElement('div');
    const p = document.createElement('p');
    const pregunta = dato.pregunta;
    dato.tipo === 'capital' ?
        p.innerHTML = `¿Cuál es la capital de ${pregunta}?` :
        p.innerHTML = `<img class="bandera" src="${pregunta}"></img><br>¿A qué país pertenece esta bandera?`;
    div.appendChild(p);
    const clave = document.createElement('input');
    clave.type = 'hidden';
    clave.value = dato.clave;
    clave.name = 'clave';
    div.appendChild(clave);
    const tipo = document.createElement('input');
    tipo.type = 'hidden';
    tipo.value = dato.tipo;
    tipo.name = 'tipo';
    div.appendChild(tipo);
    const respuesta = dato.respuesta;
    respuesta.forEach(element => {
        const divAux = document.createElement('div');
        const resp = document.createElement('input');
        resp.type = 'button';
        resp.name = 'respuesta';
        resp.value = element;
        resp.classList.add('button');
        resp.addEventListener('click', async () => {
            const claveInput = document.getElementsByName('clave');
            const tipoInput = document.getElementsByName('tipo');
            const finPregunta = performance.now();
            //        const inicioPregunta = performance.now();
            //            const tiempo = tiempoInicial - tiempoRestante;
            const tiempo = (finPregunta / 1000 - inicioPregunta / 1000).toFixed(2);
            tiempoTotal += Number(tiempo);
            let data = {
                clave: claveInput[0].value,
                tipo: tipoInput[0].value,
                pregunta: dato.pregunta,
                respuesta: resp.value,
                tiempo: tiempo
            };
            let clave = claveInput[0].value;
            const resultado = JSON.parse(await obtenerPregunta(clave));
            const respuestaCorrecta = (data.tipo == 'bandera') ? resultado['nombre'] : resultado[data.tipo];
            if (respuestaCorrecta === data.respuesta) {
                //TODO codigo para vcambio color button true
                puntaje++;

            } else {
                //TODO codigo para cambio boton errone, resaltar boton correcto, 

            }
            resultadoRespuestas.push(data);
            console.log(`Tiempo ${tiempo}`);
            presentarPregunta();
            //  if (data.resultado === 'true') { puntaje++; };

        });
        divAux.appendChild(resp);
        cardRespuesta.appendChild(divAux);
    });
    container.appendChild(div);
}
/**
 * Verifica tiempo restante para repsonde rpregunta
 */
function verificarTiempoRestante() {
    if (tiempoRestante <= 0) {
        clearInterval(intervalId);
    } else {
        tiempoRestante -= 1;
        timer.textContent = tiempoRestante;
        if (tiempoRestante <= 0) {
            clearInterval(intervalId);
            presentarPregunta();

        }
    }
}
/* obtiene los datos s que corresponden al key de la pregunta
* se utiliza par apoder verificar si esta Ok o no la respeusta y admeas para mostrar cual es correcta ne caso de errro
*/
async function obtenerPregunta(clave) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };
    try {
        const response = await fetch(`${apiUrl}/pregunta?clave=${clave}`, requestOptions);
        if (response.ok) {
            const preg = JSON.stringify(await response.json());
            return preg;
        } else {
            console.error('Error en la solicitud al servidor:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        return null;
    }
}
function debug(line = 'n/d', data) {
    if (DEBUG) {
        console.log(`linea ${line} datos ${data}`);
    }
}
// Inicializar el juego
export async function iniciarJuego() {
    paises = await obtenerDatosPaises();
    if (paises && paises.length > 0) {
        presentarPregunta();
    } else {
        console.error('No Puede iniciarse el juego.');
    }
}
