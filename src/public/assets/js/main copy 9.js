import Juego from './juego.js';
import debug from './utils.js';
//BUG cuando reseteo jeugo me mantien por un instante lso datos del anteiror
async function game() {
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
    const mainContainer = document.getElementById('main');
    const juegoContainer = document.getElementById('juego');
    const juegoImg = document.getElementById('juego-img');
    const juegoPregunta = document.getElementById('pregunta');
    const juegoBotones = juegoContainer.querySelectorAll('.blue-button');
    const puntajeContainer = document.getElementById('puntaje');
    const badgePuntos = document.getElementById('pts');
    const badgeMal = document.getElementById('mal');
    const badgeTime = document.getElementById('time');
    const badgeProm = document.getElementById('prom');
    const dialogoAvisoBien = document.getElementById('aviso-bien');
    const dialogoAvisoMal = document.getElementById('aviso-mal');
    const dialogoAvisoCorrecta = document.getElementById('correcta');
    mostrarDatosPartido();
    // const dialogoAvisoResultado = document.getElementById('aviso-resultado');
    /*seccion registro*/
    const formularioRegistro = document.getElementById('form-registro');
    const botonRegistro = document.getElementById('registro');
    const botonCancelar = document.getElementById('cancelar');
    const nombreRegistro = document.getElementById('nombre');
    botonRegistro.addEventListener('click', () => {
        userJuegoData.name = nombreRegistro.value;
        registrarGame();
        formularioRegistro.close();
        game();
    });
    botonCancelar.addEventListener('click', () => {
        formularioRegistro.close();
    });
    puntajeContainer.classList.add('puntaje-visible')
    juegoContainer.classList.add('visible');
    const juego = new Juego();
    !preguntas ? juegoNuevo() : false;
    //   juegoContainer.classList.add('invisible');
    async function procesaRespuesta(tipoPregunta, respuestaUser, respuestaServer, tiempoPregunta) {
        const valorVerificar = tipoPregunta === 'bandera' ? respuestaServer['nombre'] : respuestaServer[tipoPregunta];
        const respuestaCorrecta = (valorVerificar === respuestaUser);
        if (respuestaCorrecta) {
            puntosTotal++;
            mostrarDatosPartido();
            dialogoAvisoBien.showModal();
            setTimeout(() => {
                dialogoAvisoBien.close();
                correrRonda();
            }, 1000);
        } else {
            preguntasMal++;
            mostrarDatosPartido();
            dialogoAvisoCorrecta.innerHTML = valorVerificar;
            dialogoAvisoMal.showModal();
            setTimeout(() => {
                dialogoAvisoMal.close();
                correrRonda();
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
        const prom = (count > 0) ? ((tiempoTotal / 1000) / count).toFixed(2) : 0;
        badgePuntos.textContent = `${puntosTotal} Bien`;
        badgeProm.textContent = `${prom} Prom `;
        badgeMal.innerHTML = `${preguntasMal} Mal`;
        badgeTime.innerHTML = `${(tiempoTotal / 1000).toFixed(2)} Tiempo`;
    }
    async function correrRonda() {
        if (count < 4) {
            setBoton(false);
            await mostrarPregunta(preguntas[count]);
            const inicioPregunta = performance.now();
            const botonUser = (await capturaRespuesta());
            const respuestaValue = botonUser.getAttribute('respuesta');
            const respuestaClave = botonUser.getAttribute('clave');
            const respuestaServerClave = await juego.fetchRespuesta(respuestaClave);
            const tiempoPregunta = performance.now() - inicioPregunta;
            tiempoTotal += tiempoPregunta;
            procesaRespuesta(preguntas[count].tipo, respuestaValue, respuestaServerClave, tiempoPregunta);
            count++;
            mostrarDatosPartido();
        } else {
            userJuegoData.preguntas = userPreguntasRespondidas;
            userJuegoData.tiempoTotal = tiempoTotal;
            userJuegoData.puntosTotal = puntosTotal;
            userJuegoData.tiempoTotal = tiempoTotal;
            userJuegoData.preguntasMal = preguntasMal;
            formularioRegistroLLenado();
            formularioRegistro.showModal();
            mainContainer.classList.remove('invisible');
            juegoContainer.classList.add('invisible');
            juegoContainer.classList.remove('visible');
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
    async function mostrarPregunta(pregunta) {
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
    function formularioRegistroLLenado() {
        const pCorrectas = document.getElementById('correctas');
        const pIncorrectas = document.getElementById('incorrectas');
        const pPromedio = document.getElementById('promedio');
        const pTiempo = document.getElementById('tiempo');
        pCorrectas.innerHTML = `Preguntas bien respondidas ${puntosTotal}`;
        pIncorrectas.innerHTML = `Preguntas Mal respondidas: ${preguntasMal}`;
        pPromedio.innerHTML = `Tiempo pormedio por pregutna ${(tiempoTotal / 1000 / count).toFixed(2)}`;
        pTiempo.innerHTML = `Tiempo total ${(tiempoTotal / 1000).toFixed(2)}`;
    }
    function registrarGame() { debug(JSON.stringify(userJuegoData)); }
}
function registro() {
    //    const formRegistro = document.getElementById('form-registro');
    formRegistro.show();
}
export { game, registro };