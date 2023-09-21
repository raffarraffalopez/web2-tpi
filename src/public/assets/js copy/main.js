import debug from './utils.js';
const containerInicio = document.querySelector('.container-inicio');
let clicRealizado = false; // Variable para verificar si se ha hecho clic

containerInicio.addEventListener('click', (event) => {
    if (clicRealizado) {
        debug(`Clic DESACTIVADO`);
        return; // Si ya se ha hecho clic, no hacer nada
    }

    if (event.target.classList.contains('boton-inicio')) {
        const valor = event.target.value;
        debug(`Clic en el botón con valor: ${valor}`);
        switch (valor) {
            case 'jugar':
                // Acciones para el botón "Jugar"
                console.log('Haz clic en Jugar');
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

        // Una vez hecho clic en un botón, deshabilitar los botones
        const botones = document.querySelectorAll('.boton-inicio');
        botones.forEach(boton => {
            boton.disabled = true;
        });

        // Marcar que se ha realizado un clic
        //   clicRealizado = true;
    }
});
