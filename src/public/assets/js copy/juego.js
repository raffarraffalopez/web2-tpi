import debug from './utils.js';
/* variable para control juego */

debug('caca');


const containerInicio = document.querySelector('.container-inicio');
containerInicio.addEventListener('click', (event) => {
    if (event.target.classList.contains('boton-inicio')) {
        const valor = event.target.value;
        debug(`Clic en el botón con valor: ${valor}`);
        switch (valor) {
            case 'jugar':
                break;
            case 'ranking':
                // Acciones para el botón "Ranking"
                console.log('Haz clic en Ranking');
                break;
            case 'login':
                // Acciones para el botón "Login"
                console.log('Haz clic en Login');
                break;
            default:
                // Acciones por defecto si no coincide con ningún valor
                console.log('Haz clic en un botón con valor desconocido');
                break;
        }

    }
});