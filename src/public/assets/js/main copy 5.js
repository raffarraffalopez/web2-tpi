import Juego from './juego.js';
import debug from './utils.js';
const imgBanderas = [];
let clicRealizado = false;
let count = 0;
let tiempoInicial = 500;
let tiempoRestante;
let intervalId;
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
        for (let j = 0; j < preguntas.length; j++) {
            let imgSrc = '';
            preguntas[j].tipo === 'bandera' ? imgSrc = preguntas[j].pregunta : imgSrc = preguntas[j].bandera;
            await precargarImagen(imgSrc);
        }
        presentarPregunta();
        debug('mmm');
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
async function precargarImagen(url) {
    var img = new Image();
    img.src = url;
    imgBanderas.push(img);
}
async function sleep() {
    return new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });

}
async function presentarPregunta() {
    if (count < 10) {
        setBoton(false);
        mostrarPregunta(preguntas[count]);
        await verificarRespuesta();
        debug(count);
        count++;
        debug(count);
        presentarPregunta();

    } else {
        //TODO fin del juego tengo que hacer algo aca ? vpedirle lso dato spara guardado?
        debug('Fin');
    }
}

async function verificarRespuesta() {
    return new Promise(resolve => {
        for (let i = 0; i < 4; i++) {
            const boton = juegoBotones[i];
            boton.addEventListener("click", function () {
                setBoton(true);
                const respuestaValue = boton.getAttribute('respuesta');
                const respuestaClave = boton.getAttribute('clave');
                debug(respuestaClave);
                debug(respuestaValue);
                resolve();
            });
        }
    });
}
function setBoton(setValue) {
    for (let j = 0; j < juegoBotones.length; j++) {
        juegoBotones[j].disabled = setValue;
    }
}