import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import appRoutes from './routes/app_routes.js';
import gameRoutes from './routes/game_routes.js';
import connDb from './models/conexion.js';

// importaciones  librerias propias
import { DEBUG, CONFIG } from './config.js';
import paisesModel from './models/paises_model.js';
class App {
    constructor() {
        // server http
        this.app = express();
    }

    //IMPORTANTE aca van todas las rutas, verificar que tengan definidos los routes
    appRoute() {
        // Configuracion rutas de la aplicacion personalizadas
        this.app.use(express.static('./src/public'));
        this.app.use(express.static('./src/public', { root: 'index.html' })); // index desde static
        // this.app.get('/index', (req, res) => {            res.redirect('/');          });
        //app.get('/index', (req, res) => { res.sendFile('index.html', { root: './src/public' }); });
        this.app.use('/games', appRoutes);
        this.app.use('/juego', gameRoutes); //TODO esta ruta maneja los POST del juego
        //this.app.use('/games', gameRoutes);
        // respeusta si no encontrado
        this.app.use((req, res) => {
            res.status(404).send('Error 404 - Página no encontrada');
        });
    }
    async appPaises() {
        const pais = new paisesModel();
        const paises = await pais.paisesData();
        // DEBUG(paises);
        this.appPaises = await paises;

    }

    // configura midlware y comrpeison respuestas
    configureRoutes() {
        this.app.use(compression());
        this.app.use(bodyParser.json());
    }

    // inicio asyncrono
    async start() {

        try {
            this.appPaises();
            console.error('Iniciando app');
            this.configureRoutes();
            this.appRoute();
            this.app.listen(CONFIG.APP_PORT, () => {
                console.log(`Servidor escuchando en el puerto ${CONFIG.APP_PORT}`);
            });
        } catch (error) {
            console.error('Error en la inicialización:', error);
        }
    }
}
export default App;
