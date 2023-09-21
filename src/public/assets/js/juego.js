import debug from './utils.js';

class Juego {

    constructor() {
        this.apiUrl = 'https://tuds-web2-dev.fl0.io';
        this.preguntas = false;
        this.indice = -1;
        this.respuestas = [];

    }
    async fetchData() {
        try {
            const response = await fetch(`${this.apiUrl}/preguntas`);
            if (!response.ok) {
                throw new Error('La solicitud no pudo completarse correctamente.');
            }
            const data = await response.json();
            this.preguntas = data;
            // return true;
        } catch (error) {
            console.error('Error al obtener datos:', error);
            throw error;
        }
    }
    async fetchRespuesta(idResp) {
        try {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            const response = await fetch(`${this.apiUrl}/pregunta?clave=${idResp}`, requestOptions);
            if (!response.ok) {
                throw new Error('La solicitud no pudo completarse correctamente.');
            }

            const data = await response.json();
            return data;
            // return true;
        } catch (error) {
            console.error('Error al obtener datos:', error);
            throw error;
        }
    }
    async obtenerPreguntas() {
        if (!this.preguntas) {
            await this.fetchData();
        }
        return this.preguntas;
    }
    async nuevoJuego() {
        this.obtenerPreguntas();
        this.indice = -1;

    }
    async resetJuego() {
        this.obtenerPreguntas();
        this.indice = -1;
    }
    async crearPregunta() {
        this.indice++;
        return this.preguntas[this.indice];
    }
}
export default Juego;