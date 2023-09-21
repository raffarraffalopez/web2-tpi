/**
 * este script incicia el juego en forma asyncrona
 * toda la logica se modularizo.
 * @app.js contiene toda la logica de creacion servidor, maneja routas
 * @game.js crear las pregutnas con los datos obtenidos de la url,
 * los datos de paises se procesa los datos para eliminiar dato sincesarios o paises con errores
 * 
 */
import App from './src/app.js';
async function iniciarApp() {
    console.log('Estoy en tpi.js')
    const app = new App(); // innstancia la aplicacoin
    await app.start(); // espero respuesta de paises  para iniciar efectivamente     

}
iniciarApp()
    // vcapturo errores
    .catch(error => {
        console.error('Error general de la aplicación:', error);
    });
