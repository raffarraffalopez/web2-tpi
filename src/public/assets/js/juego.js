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
    async guardarJuego2(data) {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(data),
            redirect: 'follow'
        };

        fetch("localhost:8090/game", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .then(re)
            .catch(error => console.log('error', error));
    }
    async guardarJuego(data) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        try {

            const response = await fetch(`${this.apiUrl}/game`, requestOptions);
            //            const response = await fetch(`http://localhost:8090/game`, requestOptions);
            if (!response.ok) {
                throw new Error('La solicitud no pudo completarse correctamente.');
            }
            console.log(response);
            const data = await response.json();
            this.preguntas = data;
        } catch (error) {
            console.error('Error al enviar datos:', error);
            throw error;
        }
    }
}
export default Juego;
/*
            .then(response => response.json())
            .then(data => {
                console.log('Respuesta del servidor:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
*/