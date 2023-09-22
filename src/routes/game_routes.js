import Express from "express";
const gameRoutes = Express.Router();

/* GET */
gameRoutes.get('/', function (req, res, next) {
    res.send('responder con GET game');
});
gameRoutes.get('/preguntas/', function (req, res, next) {
    res.send('responder con GET preguntas');
});
/* POST */
gameRoutes.post('/', function (req, res, next) {
    res.send('responder con POST game');
});
gameRoutes.post('/game', function (req, res, next) {
    // controla el resultado de una repuesta , deb devolver el vlaor correcto de una pregunta
    //res.send('responder con POST respuesta');
    res.send('controla el resultado de una repuesta , deb devolver el vlaor correcto de una pregunta');
});

export default gameRoutes;