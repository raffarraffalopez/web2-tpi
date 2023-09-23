import { obtenerPaises } from "../models/obtener_paises.js";
import { obtenerPreguntas } from "../models/obtener_preguntas.js";

async function getPreguntas(paises) {
    try {

        const preguntas = await obtenerPreguntas(paises);
        return preguntas;
    } catch (error) {
        console.error('Error:', error);
    }
}
export { getPreguntas };
//TODO usa modleos para intercomnucacion, reglas negocio distiotons modelos
//TODO  recibe del suaurio la pregiunta y la respeusta,  deberia responder , llamando al metodo si true o false, (TIEMPOS, PUNTAJE. etc)
// TODO 
