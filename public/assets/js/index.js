import Juego from './juego.js';
import debug from './utils.js';
import { game, generarRanking } from './main.js';
const mainContainer = document.getElementById('main');
const juegoContainer = document.getElementById('juego');
//const botonesInicio = document.getElementsByClassName('boton-inicio');
// const botonJugar = document.getElementById('jugar');
// const botonRanking = document.getElementById('ranking');
// const botonLogin = document.getElementById('login');

const botonReinicio = document.getElementById('reinicio');
const botonContacto = document.getElementById('contacto');
const botonesInicio = document.querySelectorAll('.boton-inicio');
const avisoRanking = document.getElementById('aviso-ranking');
juegoContainer.classList.add('invisible');
for (let i = 0; i < botonesInicio.length; i++) {
    botonesInicio[i].addEventListener("click", async function (event) {
        let valorDelBoton = event.target.value;
        //       debug(valorDelBoton);
        if (valorDelBoton === "jugar") {
            //       botonContacto.classList.add('invisible');
            botonReinicio.classList.remove('invisible');
            mainContainer.classList.add('invisible');
            juegoContainer.classList.remove('invisible');
            juegoContainer.classList.add('visible');
            game();
            console.log("Botón 'Jugar' fue clickeado.");
        } else if (valorDelBoton === "ranking") {
            generarRanking();
            avisoRanking.showModal();
            console.log("Botón 'Ranking' fue clickeado.");
        } else if (valorDelBoton === "login") {
            console.log("Botón 'Login' fue clickeado.");
            //            formRegistro.showModal();
        } else {
            console.log("DEFAULT");
        }
    });
}

// botonReinicio.classList.add('invisible');
// botonReinicio.addEventListener("click", () => {
//     mainContainer.classList.add('invisible');
//     juegoContainer.classList.remove('invisible');
//     juegoContainer.classList.add('visible');
//    // game();
// });