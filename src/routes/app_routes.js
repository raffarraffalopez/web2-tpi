import Express from "express";
import { DEBUG, CONFIG, fechaActual } from '../config.js';
const appRoutes = Express.Router();

/* GET */
appRoutes.get('/', function (req, res, next) {
    res.send('responder con GET gamevcx');
});
appRoutes.get('/preguntas', function (req, res, next) {
    res.send(`responder con GET preguntas ${CONFIG.PAISES_DATA[0].nombre} `);
});
/* POST */
appRoutes.post('/', function (req, res) {
    console.log('14');
    res.send('responder con POST game');
});
appRoutes.post('/respuesta', function (req, res, next) {
    // controla el resultado de una repuesta , deb devolver el vlaor correcto de una pregunta
    //res.send('responder con POST respuesta');
    res.send('controla el resultado de una repuesta , deb devolver el vlaor correcto de una pregunta');
});

export default appRoutes;
