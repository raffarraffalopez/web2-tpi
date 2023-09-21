//captura elementos document
/*const preguntas = JSON.parse('[{ "clave": 14, "tipo": "capital", "pregunta": "Territorio de los (Keeling) Islas Cocos", "respuesta": ["Bucharest", "West Island", "Tehran", "Ottawa"] }, { "clave": 226, "tipo": "bandera", "pregunta": "https://flagcdn.com/ml.svg", "respuesta": ["Rumania", "República Federal de Somalia", "República de Malí", "República Islámica de Irán"] }, { "clave": 169, "tipo": "bandera", "pregunta": "https://flagcdn.com/ye.svg", "respuesta": ["República de Yemen", "República Popular de China", "Rumania", "República Federal de Somalia"] }, { "clave": 172, "tipo": "bandera", "pregunta": "https://flagcdn.com/lr.svg", "respuesta": ["República de Liberia", "República Federal de Somalia", "República Popular de China", "Georgia del Sur y las Islas Sandwich del Sur"] }, { "clave": 88, "tipo": "bandera", "pregunta": "https://flagcdn.com/rw.svg", "respuesta": ["República Popular de China", "República de Rwanda", "Georgia del Sur y las Islas Sandwich del Sur", "República de Nauru"] }, { "clave": 132, "tipo": "bandera", "pregunta": "https://flagcdn.com/um.svg", "respuesta": ["Georgia del Sur y las Islas Sandwich del Sur", "República de Bulgaria", "República de Nauru", "Estados Unidos Islas menores alejadas de"] }, { "clave": 127, "tipo": "bandera", "pregunta": "https://flagcdn.com/iq.svg", "respuesta": ["República de Irak", "República Democrática Popular Lao", "República de Bulgaria", "República de Nauru"] }, { "clave": 65, "tipo": "bandera", "pregunta": "https://flagcdn.com/tl.svg", "respuesta": ["Islas Cook", "República Democrática de Timor-Leste", "República de Bulgaria", "República Democrática Popular Lao"] }, { "clave": 134, "tipo": "capital", "pregunta": "República de Tayikistán", "respuesta": ["Dushanbe", "Lisbon", "Avarua", "Vientiane"] }, { "clave": 70, "tipo": "capital", "pregunta": "Confederación Suiza", "respuesta": ["Avarua", "Lisbon", "Belgrade", "Bern"] }]');
debug(preguntas[0]['clave']);
preguntas.map((element) => {
    debug(element);
});
*/
// captura de todoso lo semepentos necesarios en al pagina//
const apiUrl = 'https://tuds-web2-dev.fl0.io/';
const menuItems = document.querySelectorAll('.menu li'); //menu
const resumenPreguntaElement = document.getElementById('resumen_pregunta'); //resuemn pregutnas
//const mainElement = document.getElementById('main'); //main
const mainElement = document.querySelector('.main'); //main
const menuElement = document.querySelector('.menu'); //main
debug(mainElement);

//DEBUG  para debug
setTimeout(function () {
    //resumenPreguntaElement.style.display = 'hidden';
    //    resumenPreguntaElement.style.visibility = 'hidden';
    //  mainElement.innerHTML = '';
    //    mainElement.style.visibility = 'hidden';
    //resumenPreguntaElement.style.visibility = 'visible';
}, 1000);
//DEBUG

async function obtenerPreguntas() {
    try {
        const response = await fetch(`${apiUrl}preguntas`);

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        const data = await response.text();
        debug(data);
        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
}

// Llama a la función para obtener las preguntas
const preg = await obtenerPreguntas();
// Captura la lista de elementos de menu
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        // Obtener el ID del elemento de menú (puedes usar el atributo id)
        const menuItemId = item.getAttribute('id');
        const peticion = `/${menuItemId}`;

        debug(peticion);
        if (peticion != '/index') { mainElement.innerHTML = ''; }
        if (peticion === '/juego') {
            mainElement.innerHTML = '';
            mostrarElement(puntaje);
            //            ocultarElement(menuElement);
        }
        //        debug(peticion);

        // Realizar una solicitud Fetch según el elemento de menú seleccionado
        fetch(peticion)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status}`);
                }
                return response.text();
            })
            .then((data) => {
                // Mostrar la respuesta o realizar cualquier acción deseada
                console.log(data);
                debug(`Respuesta para ${menuItemId}: ${data}`);
            })
            .catch((error) => {
                debug(`Error en la solicitud para ${menuItemId}: ${error}`);
            });
    });
});


function debug(msg) {
    const stack = new Error().stack.split('\n');
    let partes = stack[2].split('\/');
    partes = stack[2].split('\/')[stack[2].split('\/').length - 1].split(':');
    console.log('\n\r', partes[0], 'linea', partes[1], ' -> ', msg);
    //console.log('\n\r', partes[1], ' -> ', msg);
}

// Espera a que el contenido de la página se cargue completamente
//document.addEventListener("DOMContentLoaded", function () {
const puntaje = document.querySelector(".puntaje");

// Función para mostrar la sección de puntaje
function mostrarElement(element) {
    element.classList.add("visible");
}
function ocultarElement(element) {
    element.classList.add("invisible");
}
function mostrarPregunta(element, pregunta) {
    let elementoPregunta = `<div class="container-inicio bkg-traslucido"><div>`;
    elementoPregunta += `   <div class="container-pregunta">`;
    if (pregunta.tipo == 'bandera') {
        elementoPregunta += `<span id="pregunta">A que pais le corresponde esta bandera...</span>`;
        elementoPregunta += `<img id="img_preg" src="${pregunta.pregunta}" alt="Imagen de la bandera "> </img>`;

    } else {
        elementoPregunta += `<span id="pregunta">Cual es la capital de <b>${pregunta.pregunta}</b>...</span>`;
        // elementoPregunta += `<img id="img_preg" src="${pregunta.pregunta}" alt="Imagen de la bandera "> </img>`;
        // preguntaMostar = `<p id="pregunta">Cual es la capital de ${pregunta.pregunta}...</p>`;
    }
    elementoPregunta += ` </div>`;
    elementoPregunta += `<div class="pregunta"><button class="blue-button" name="${pregunta.respuesta[0]}" value="${pregunta.clave}">${pregunta.respuesta[0]}</button></div>`;
    elementoPregunta += `<div><button class="blue-button" name="${pregunta.respuesta[1]}" value="${pregunta.clave}">${pregunta.respuesta[1]}</button></div>`;
    elementoPregunta += `<div><button class="blue-button" name="${pregunta.respuesta[2]}" value="${pregunta.clave}">${pregunta.respuesta[2]}</button></div>`;
    elementoPregunta += `<div><button class="blue-button" name="${pregunta.respuesta[3]}" value="${pregunta.clave}">${pregunta.respuesta[3]}</button></div>`;
    elementoPregunta += `</div>`;
    /*        let elementoPregunta = `<div class="container-inicio bkg-traslucido"><div>`;
        elementoPregunta += `<div style="border:solid 1px red">${preguntaMostar}</div>`;
        elementoPregunta += `<div><button class="blue-button" value="${pregunta.clave}">${pregunta.respuesta[0]}</button></div>`;
        elementoPregunta += `<div><button class="blue-button" value="${pregunta.clave}">${pregunta.respuesta[1]}</button></div>`;
        elementoPregunta += `<div><button class="blue-button" value="${pregunta.clave}">${pregunta.respuesta[2]}</button></div>`;
        elementoPregunta += `<div><button class="blue-button" value="${pregunta.clave}">${pregunta.respuesta[3]}</button></div>`;
        elementoPregunta += `</div>`;
       */
    element.innerHTML = elementoPregunta;
    debug(elementoPregunta);
}
/*

        <div class="container-inicio bkg-traslucido">
            <div class="container-pregunta">
                <!-- <p id="pregunta">A que pais le corresponde esta bandera...</p> -->
                <span id="pregunta">A que pais le corresponde esta bandera...</span>
                <img id="img_preg" src="https://flagcdn.com/td.svg" alt="Imagen de la pregunta">
            </div>
            <div><button class="blue-button" value="111">República de las Maldivas</button></div>
            <div><button class="blue-button" value="111">Rumania</button></div>
            <div><button class="blue-button" value="111">Islas Cook</button></div>
            <div><button class="blue-button" value="111">República de Chad</button></div>
        </div>
*/

//setTimeout(mostrarPuntaje, 100);
/*
  <div class="pregunta-container">
            <p id="pregunta">A que pais le corresponde esta bandera...</p>
            <img id="img_preg" src="https://flagcdn.com/mr.svg" alt="Imagen de la pregunta">
        </div>
        <!-- <div class="body"> -->
        <div class="container">
            <button class="blue-button">Botón 1</button>
            <button class="blue-button">Botón 2</button>
            <button class="blue-button">Botón 3</button>
            <button class="blue-button">Botón 4</button>
        </div>
        */

//captura botones inciales:
const containerInicio = document.querySelector('.container-inicio');
containerInicio.addEventListener('click', (event) => {
    if (event.target.classList.contains('boton-inicio')) {
        const valor = event.target.value;
        debug(`Clic en el botón con valor: ${valor}`);
        mainElement.innerHTML = '';
        switch (valor) {
            case 'jugar':
                // Acciones para el botón "Jugar"
                iniciarJuego();
                console.log('Haz clic en Jugar');
                break;
            case 'ranking':
                // Acciones para el botón "Ranking"
                console.log('Haz clic en Ranking');
                break;
            case 'login':
                // Acciones para el botón "Login"
                console.log('Haz clic en Login');
                break;
            default:
                // Acciones por defecto si no coincide con ningún valor
                console.log('Haz clic en un botón con valor desconocido');
                break;
        }

    }
});
/*
async function iniciarJuego() {
    const preguntas = JSON.parse(preg);

    for (let i = 0; i < preguntas.length; i++) {
        const pregunta = preguntas[i];

        // Mostrar la pregunta
        mostrarPregunta(mainElement, pregunta);

        // Crear una Promesa para esperar hasta que se presione un botón
        await new Promise(resolve => {
            // Función de control de clic
            const clicEnBoton = (event) => {
                const valorBoton = event.target.value;
                debug(valorBoton);

                // Remover el event listener del botón para evitar múltiples clics
                event.target.removeEventListener('click', clicEnBoton);

                resolve(valorBoton); // Resuelve la Promesa con el valor del botón cuando se presiona un botón
            };

            // Agregar un event listener a los botones
            const botones = document.querySelectorAll('.blue-button');
            botones.forEach(boton => {
                boton.addEventListener('click', clicEnBoton);
            });
        }).then(valorBoton => {
            // Aquí puedes usar el valor del botón para realizar cualquier acción necesaria
            debug(`Valor del botón: ${valorBoton}`);
        });
    }
}
*/










/*
function iniciarJuego() {
    const preguntas = JSON.parse(preg);
    preguntas.forEach(element => {
        setTimeout(() => {
            mostrarPregunta(mainElement, element);
        }, 2000);
        debug(element.respuesta);
    })
}
*/
function pausa() {
    setTimeout(() => {
        console.log('Pausa de 2 segundos completada');
    }, 2000);
}


async function iniciarJuego() {
    const preguntas = JSON.parse(preg);

    for (let i = 0; i < preguntas.length; i++) {
        const pregunta = preguntas[i];
        debug(pregunta);
        // Mostrar la pregunta
        debug(pregunta.respuesta.length);
        mostrarPregunta(mainElement, pregunta);

        // Crear una Promesa para esperar hasta que se presione un botón
        await new Promise(resolve => {
            // Función de control de clic
            const clicEnBoton = async (event) => {
                const valorBoton = event.target.value;
                const valorName = event.target.name;
                debug(valorName);
                debug(valorBoton);


                // Remover el event listener del botón para evitar múltiples clics
                event.target.removeEventListener('click', clicEnBoton);

                // Realizar una solicitud Fetch con el valor del botón
                try {
                    //                    const response = await fetch(`${apiUrl}/pregunta?clave=${clave}`, requestOptions);
                    const respuesta = await fetch(`${apiUrl}pregunta?clave=${valorBoton}`);
                    if (!respuesta.ok) {
                        throw new Error(`Error en la solicitud: ${respuesta.status}`);
                    }
                    const data = await respuesta.json();
                    debug(data);
                    // Puedes hacer algo con la respuesta JSON aquí
                } catch (error) {
                    console.error(`Error en la solicitud: ${error.message}`);
                }

                resolve(); // Resuelve la Promesa cuando se presiona un botón y se completa la solicitud Fetch
            };

            // Agregar un event listener a los botones
            const botones = document.querySelectorAll('.blue-button');
            botones.forEach(boton => {
                boton.addEventListener('click', clicEnBoton);
            });
        });
    }
}
