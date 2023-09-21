import debug from './utils.js';

class Juego {

    constructor() {
        this.apiUrl = 'https://tuds-web2-dev.fl0.io/preguntas';

    }


    async fetchData() {
        try {
            const response = await fetch(this.apiUrl);

            if (!response.ok) {
                throw new Error('La solicitud no pudo completarse correctamente.');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al obtener datos:', error);
            throw error;
        }
    }


}

export default Juego;