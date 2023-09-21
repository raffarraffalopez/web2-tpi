
import Juego from './juego.js';
import debug from './utils.js';
function game() {
    debug('mierda');
    const imgBanderas = [];
    const userPreguntasRespondidas = [];
    const userJuegoData = {
        preguntasMal: '',
        tiempoTotal: '',
        puntosTotal: '',
    }
    let tiempoTotal = 0;
    let tiempo = 0;
    let puntosTotal = 0;
    let preguntasMal = 0;
    let count = 0;
    let preguntas = false;
    //  const mainContainer = document.getElementById('main');
    const juegoContainer = document.getElementById('juego');
    const juegoImg = document.getElementById('juego-img');
    const juegoPregunta = document.getElementById('pregunta');
    const juegoBotones = juegoContainer.querySelectorAll('.blue-button');
    const puntajeContainer = document.getElementById('puntaje');
    const puntajeP = puntajeContainer.querySelectorAll('p');
    const badgePuntos = document.getElementById('pts');
    const badgeMal = document.getElementById('mal');
    const badgeTime = document.getElementById('time');
    const dialogoAvisoBien = document.getElementById('aviso-bien');
    const dialogoAvisoMal = document.getElementById('aviso-mal');
    const dialogoAvisoResultado = document.getElementById('aviso-resultado');
    puntajeContainer.classList.add('puntaje-visible')

    juegoContainer.classList.add('visible');
    const juego = new Juego();
    !preguntas ? juegoNuevo() : false;

    //   juegoContainer.classList.add('invisible');
    function procesaRespuesta(tipoPregunta, respuestaUser, respuestaServer, tiempoPregunta) {
        const valorVerificar = tipoPregunta === 'bandera' ? respuestaServer['nombre'] : respuestaServer[tipoPregunta];
        const respuestaCorrecta = (valorVerificar === respuestaUser);
        if (respuestaCorrecta) {
            puntosTotal++;
            dialogoAvisoBien.showModal();
            setTimeout(function () {
                dialogoAvisoBien.close();
            }, 1000);
        } else {
            preguntasMal++;
            dialogoAvisoMal.showModal();
            setTimeout(function () {
                dialogoAvisoMal.close();
            }, 1000);

        }

        const userRespuesta = {
            pregunta: preguntas[count],
            respuestaUser: respuestaUser,
            respuestaServer: respuestaServer,
            respuestaCorrecta: respuestaCorrecta,
            tiempo: tiempoPregunta
        }
        userPreguntasRespondidas.push(userRespuesta);
        return respuestaCorrecta;
    }
    function mostrarDatosPartido() {
        badgePuntos.textContent = `${puntosTotal} Pts`;
        badgeMal.innerHTML = `${preguntasMal} Mal`;
        badgeTime.innerHTML = `${(tiempoTotal / 1000).toFixed(2)} Time`;
    }
    async function correrRonda() {
        if (count < 10) {
            setBoton(false);
            const inicioPregunta = performance.now();
            mostrarPregunta(preguntas[count]);
            const botonUser = (await capturaRespuesta());
            const respuestaValue = botonUser.getAttribute('respuesta');
            const respuestaClave = botonUser.getAttribute('clave');
            const respuestaServerClave = await juego.fetchRespuesta(respuestaClave);
            const tiempoPregunta = performance.now() - inicioPregunta;
            tiempoTotal += tiempoPregunta;
            procesaRespuesta(preguntas[count].tipo, respuestaValue, respuestaServerClave, tiempoPregunta);
            mostrarDatosPartido();

            count++;
            correrRonda();
        } else {
            userJuegoData.preguntas = userPreguntasRespondidas;
            userJuegoData.tiempoTotal = tiempoTotal;
            userJuegoData.puntosTotal = puntosTotal;
            userJuegoData.tiempoTotal = tiempoTotal;

            debug(userJuegoData);
            dialogoAvisoResultado.showModal();
            setTimeout(function () {
                dialogoAvisoResultado.showModal();
            }, 3000);
            debug('fin');
        }
    }
    async function capturaRespuesta() {
        return new Promise(resolve => {
            let botonClicado = null;
            for (let i = 0; i < juegoBotones.length; i++) {
                const boton = juegoBotones[i];
                boton.addEventListener("click", async function () {
                    setBoton(true);
                    const respuestaValue = boton.getAttribute('respuesta');
                    const respuestaClave = boton.getAttribute('clave');
                    botonClicado = boton;
                    resolve(botonClicado);
                });
            }
        });
    }
    async function juegoNuevo() {
        try {
            setBoton(false);
            preguntas = !preguntas ? await juego.obtenerPreguntas() : false;

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
    }
    async function precargarImagen(url) {
        var img = new Image();
        img.src = url;
        imgBanderas.push(img);
    }
    function setBoton(setValue) {
        for (let j = 0; j < juegoBotones.length; j++) {
            juegoBotones[j].disabled = setValue;
        }
    }
}
export default game;