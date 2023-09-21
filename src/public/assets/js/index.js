import Juego from './juego.js';
import debug from './utils.js';
import game from './main.js';

const mainContainer = document.getElementById('main');
const juegoContainer = document.getElementById('juego');

const botonesInicio = document.getElementsByClassName('boton-inicio');
// const botonJugar = document.getElementById('jugar');
// const botonRanking = document.getElementById('ranking');
// const botonLogin = document.getElementById('login');
const botonReinicio = document.getElementById('reinicio');
const botonContacto = document.getElementById('contacto');
const botonesAll = document.querySelectorAll('.boton-inicio');
botonReinicio.classList.add('invisible');
juegoContainer.classList.add('invisible');
for (let i = 0; i < botonesAll.length; i++) {
    botonesAll[i].addEventListener("click", function (event) {
        let valorDelBoton = event.target.value;
        if (valorDelBoton === "jugar") {
            botonContacto.classList.add('invisible');
            botonReinicio.classList.remove('invisible');
            mainContainer.classList.add('invisible');
            juegoContainer.classList.remove('invisible');
            juegoContainer.classList.add('visible');
            game();
            console.log("Botón 'Jugar' fue clickeado.");
        } else if (valorDelBoton === "ranking") {
            console.log("Botón 'Ranking' fue clickeado.");
        } else if (valorDelBoton === "login") {
            console.log("Botón 'Login' fue clickeado.");
        } else {
            console.log("DEFAULT");
        }
    });
}
botonReinicio.addEventListener("click", () => {
    mainContainer.classList.add('invisible');
    juegoContainer.classList.remove('invisible');
    juegoContainer.classList.add('visible');
    game();
});

