import dotenv from 'dotenv';
import paisesModel from './models/paises_model.js';
const entorno = process.env.NODE_ENV || 'dev';
entorno === 'dev' ? dotenv.config({ path: './config.dev.env' }) : dotenv.config({ path: './config.prod.env' });
const CONFIG = {
    APP_ENTORNO: entorno,
    URL_GAME: process.env.URL_GAME,
    // persistencia
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PORT: process.env.DATABASE_PORT,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_PASS: process.env.DATABASE_PASS,
    DATABASE_PREFIX: process.env.DATABASE_PREFIX,
    DATABASE_SSL: process.env.DATABASE_SSL,
    APP_PORT: process.env.APP_PORT || 3000,
}
const DEBUG = (msg) => {
    if (process.env.NODE_ENV == 'dev') {
        const stack = new Error().stack.split('\n');
        let partes = stack[2].split('\/');
        partes = stack[2].split('\/')[stack[2].split('\/').length - 1].split(':');
        console.log('\n\r', partes[0], 'linea', partes[1], ' -> ', msg);
    }
};
const fechaActual = new Date();
console.log(fechaActual);
const pais = new paisesModel();
CONFIG.PAISES_DATA = await pais.paisesData();
CONFIG.PAISES_KEY = await pais.obtenerPaisesKeyMap(CONFIG.PAISES_DATA);

export { DEBUG, CONFIG, fechaActual };
