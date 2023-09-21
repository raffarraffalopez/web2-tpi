import Juego from './juego.js';
import debug from './utils.js';
// import Web from './web.js';
const imgBanderas = [];
const userPreguntasRespondidas = [];
//TODO datos juego especifico para guardar, cada pregunta, tiempo total, puntaje total
const userJuegoData = {
    preguntas: '',
    tiempoTotal: '',
    puntosTotal: '',
    respuesta: ''
}
let tiempoTotal;
let tiempo;
let puntosTot = 0;
let count = 0;
let preguntas = false;
const mainContainer = document.getElementById('main');
const juegoContainer = document.getElementById('juego');
const juegoImg = document.getElementById('juego-img');
const juegoPregunta = document.getElementById('pregunta');
const juegoBotones = juegoContainer.getElementsByClassName('blue-button');
const puntajeContainer = document.getElementById('puntaje');

// inicio sistema
juegoContainer.classList.add('visible');
const juego = new Juego();
!preguntas ? juegoNuevo() : false;  //TODO primer peticion de pregutnas, acelera el sistema

async function juegoNuevo() {
    try {
        setBoton(false);
        preguntas = !preguntas ? await juego.obtenerPreguntas() : false;
        // predescarga img banderas
        for (let j = 0; j < preguntas.length; j++) {
            let imgSrc = '';
            preguntas[j].tipo === 'bandera' ? imgSrc = preguntas[j].pregunta : imgSrc = preguntas[j].bandera;
            await precargarImagen(imgSrc);
        }
        correrRonda();

    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
}
function mostrarPregunta(pregunta) {
    debug(pregunta);
    if (pregunta.tipo === 'bandera') {
        juegoImg.style.backgroundImage = `url(${pregunta.pregunta})`;
        juegoPregunta.innerHTML = "A que pais pertence esta bandera ...";
    } else {
        juegoImg.style.backgroundImage = 'url(./assets/img/img_listado.jpeg)';
        juegoPregunta.innerHTML = `Cual es la capital de ${pregunta.pregunta} ...`;
    }
    for (let i = 0; i < 4; i++) {
        juegoBotones[i].innerHTML = pregunta.respuesta[i];
        juegoBotones[i].setAttribute('respuesta', pregunta.respuesta[i]);
        juegoBotones[i].setAttribute('clave', pregunta.clave);
    }
    debug(juegoBotones);

}

mainContainer.classList.add('invisible');
// juegoContainer.classList.remove('invisible');
// puntajeContainer.classList.add('puntaje-visible');
async function precargarImagen(url) {
    var img = new Image();
    img.src = url;
    imgBanderas.push(img);
}
async function correrRondax() {
    if (count < 10) {
        setBoton(false);
        mostrarPregunta(preguntas[count]); // Muestra la pregunta actual
        const respuestaServer = (await verificarRespuesta());
        debug(respuestaServer);

        userPreguntasRespondidas.push(respuestaServer);
        count++; // Incrementa count después de mostrar la pregunta
        debug(count);
        debug(puntosTot);
        debug(puntosTot);
        correrRonda();
    } else {
        userJuegoData.preguntas = userPreguntasRespondidas;
        userJuegoData.tiempoTotal = tiempoTotal;
        userJuegoData.puntosTotal = puntosTot;
        // Fin del juego
        debug(userJuegoData);
        debug('fin');
    }
}
async function verificarRespuesta() {
    let contador = 0;
    return new Promise(resolve => {
        for (let i = 0; i < juegoBotones.length; i++) {
            let encontrado = 0;
            const boton = juegoBotones[i];
            boton.addEventListener("click", async function () {
                setBoton(true);
                const respuestaValue = boton.getAttribute('respuesta');
                const respuestaClave = boton.getAttribute('clave');
                // //leerRespuesta(respuestaValue, respuestaClave);
                debug(respuestaClave);
                debug(respuestaValue);
                let resultadoRespueta = await juego.fetchRespuesta(respuestaClave);
                debug(resultadoRespueta);
                const valoresRespueta = Object.values(resultadoRespueta);
                for (let i = 0; i < 3; i++) {
                    const valor = valoresRespueta[i];
                    if (valor === respuestaValue) {
                        i = 3;
                        encontrado = 1;
                        contador++;
                    }
                }
                puntosTot += encontrado;
                const userRespuesta = {
                    pregunta: preguntas[count],
                    respuestaOk: resultadoRespueta,
                    resultado: encontrado,
                    tiempo: ''
                }
                resolve(userRespuesta);
            });
        }
    });
}
function setBoton(setValue) {
    for (let j = 0; j < juegoBotones.length; j++) {
        juegoBotones[j].disabled = setValue;
    }
}