
import CONFIG from './config.js';
import debug from './utils.js';
function mostrarPregunta(element, pregunta) {
    let elementoPregunta = `<div class="container-inicio bkg-traslucido">`;
    elementoPregunta += `   <div class="container-pregunta">`;
    if (pregunta.tipo == 'bandera') {

        elementoPregunta += `<img id="img_preg" src="${pregunta.pregunta}" alt="Imagen de la bandera "> </img>`;
        elementoPregunta += `<span id="pregunta">A que pais le corresponde esta bandera...</span>`;

    } else {

        // elementoPregunta += `<img id="img_preg" src="${pregunta.bandera}" alt="Imagen de la bandera "> </img>`;
        elementoPregunta += `<img id="img_preg" src="./assets/img/img_listado.jpeg"  alt="Imagen de la bandera "> </img>`;
        elementoPregunta += `<span id="pregunta">Cual es la capital de ${pregunta.pregunta}...</span>`;
    }
    elementoPregunta += ` </div>`;
    elementoPregunta += `<div><button class="blue-button" name="${pregunta.respuesta[0]}" value="${pregunta.clave}">${pregunta.respuesta[0]}</button></div>`;
    elementoPregunta += `<div><button class="blue-button" name="${pregunta.respuesta[1]}" value="${pregunta.clave}">${pregunta.respuesta[1]}</button></div>`;
    elementoPregunta += `<div><button class="blue-button" name="${pregunta.respuesta[2]}" value="${pregunta.clave}">${pregunta.respuesta[2]}</button></div>`;
    elementoPregunta += `<div><button class="blue-button" name="${pregunta.respuesta[3]}" value="${pregunta.clave}">${pregunta.respuesta[3]}</button></div>`;
    elementoPregunta += `</div>`;
    element.innerHTML = elementoPregunta;
    //debug(elementoPregunta);
}
async function obtenerPreguntas() {
    try {
        const response = await fetch(`${CONFIG.apiUrl}preguntas`);

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        const data = await response.text();
        //  debug(data);
        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
}
export { mostrarPregunta, obtenerPreguntas };
