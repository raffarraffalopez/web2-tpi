
import Juego from './juego.js';
import debug from './utils.js';
let clicRealizado = false;
let preguntas;
// instancio juego y precargo preguntas
const juego = new Juego();
if (!preguntas) {
    obtenerDatosDelJuego();
    debug('enr');
}
const containerMain = document.querySelector('.main');
const containerInicio = document.querySelector('.container-inicio');

containerInicio.addEventListener('click', (event) => {
    if (clicRealizado) {
        debug(`Clic DESACTIVADO`);
        return;
    }
    const botones = document.querySelectorAll('.boton-inicio');
    botones.forEach(boton => {
        boton.disabled = true;
    });
    clicRealizado = true;
    if (event.target.classList.contains('boton-inicio')) {
        const valor = event.target.value;
        debug(`Clic en el botón con valor: ${valor}`);
        switch (valor) {
            case 'jugar':
                containerInicio.innerHTML = '';
                containerMain.innerHTML = '';
                if (!preguntas) {
                    obtenerDatosDelJuego();
                    debug('enr2');
                }
                console.log('Haz clic en jugar');
                break;
            case 'ranking':
                console.log('Haz clic en Ranking');
                break;
            case 'login':
                console.log('Haz clic en Login');
                break;
            default:
                console.log('Haz clic en un botón con valor desconocido');
                break;
        }
    }
});
async function obtenerDatosDelJuego() {
    try {
        preguntas = await juego.fetchData();
        debug(preguntas);
        debug('ACA VA EL JUEGO');
        // return preguntas;
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
}