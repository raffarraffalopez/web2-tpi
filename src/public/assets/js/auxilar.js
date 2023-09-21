const containerInicio = document.querySelector('.container-inicio');
const clave = document.createElement('input');
const divPregunta = document.createElement('div');
const imgPregunta = document.createElement('img');
const spanPregunta = document.createElement('span');
divPregunta.classList.add('container-pregunta');
clave.type = 'hidden';
clave.value = '';
clave.name = 'clave';
containerInicio.appendChild(clave);
containerInicio.classList.add('bkg-traslucido');
containerInicio.appendChild(divPregunta);
imgPregunta.id = 'img_preg';
imgPregunta.src = '';
divPregunta.appendChild(imgPregunta);
spanPregunta.id = 'pregunta';
spanPregunta.innerHTML = '';
divPregunta.appendChild(spanPregunta);
for (let i = 0; i < 4; i++) {
    const divRespuesta = document.createElement('div');
    divPregunta.appendChild(divRespuesta);
    const botonRespuesta = document.createElement('button');
    botonRespuesta.classList.add("blue-button");
    botonRespuesta.name = '';
    botonRespuesta.value = '';
    botonRespuesta.innerHTML = element;
    divRespuesta.appendChild(botonRespuesta);
}

containerInicio.addEventListener('click', (event) => {
    event.preventDefault();
    if (clicRealizado) {
        debug(`Clic DESACTIVADO`);
        return;
    }
    //TODO seccion botnes inicico
    const botones = document.querySelectorAll('.boton-inicio');
    botones.forEach(boton => {
        boton.disabled = true;
    });
    //    clicRealizado = true;
    if (event.target.classList.contains('boton-inicio')) {
        const valor = event.target.value;
        debug(`Clic en el botón con valor: ${valor}`);
        switch (valor) {
            case 'jugar':
                //  containerInicio.innerHTML = '';
                // containerMain.innerHTML = '';
                !preguntas ? juegoNuevo() : false; //TODO peticion pregutnas, para reinicio o juego nuevo juego
                // debug(juego.preguntas);
                // preguntaNueva(juego.preguntas[0]);
                break;
            case 'ranking':
                console.log('Haz clic en Ranking');
                break;
            case 'login':
                console.log('Haz clic en Login');
                break;
            default:
                console.log('Haz clic en un botón con valor desconocido');
                break;
        }
    }
});
/*
containerPregunta.addEventListener('click', (event) => {
    event.preventDefault();
    const botones = document.querySelectorAll('.blue-button');
    botones.forEach(boton => {
        boton.disabled = true;
    });
    if (event.target.classList.contains('blue-button')) {
        const valor = event.target.value;
        debug(`Clic en el botón con valor: ${valor}`);
    }
});
*/
async function juegoNuevo() {
    try {
        preguntas = !preguntas ? await juego.obtenerPreguntas() : false;
        //  debug(juego.preguntas);
        //  juego.preguntas.forEach(pregunta => {
        preguntaNueva(juego.preguntas[0]); //TODO inyecta pregutna en html

        // })


        //  debug(juego);

    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
}
async function preguntaNueva(pregunta) {
    /*  
      const containerPregunta = document.querySelector('.container-pregunta');
      const clave = document.createElement('input');
      const divPregunta = document.createElement('div');
      const imgPregunta = document.createElement('img');
      const spanPregunta = document.createElement('span');
      divPregunta.classList.add('container-pregunta');
  
      clicRealizado = false;
      containerInicio.innerHTML = ''; // borro datos viejos
      clave.type = 'hidden';
      clave.value = (pregunta.clave);
      clave.name = 'clave';
      containerInicio.appendChild(clave);
      // const inicioPregunta = performance.now();
      containerInicio.classList.add('bkg-traslucido');
      containerInicio.appendChild(divPregunta);
      const imagenPregunta = pregunta.tipo === 'bandera' ? pregunta.pregunta : './assets/img/img_listado.jpeg';
      const textoPregunta = pregunta.tipo === 'bandera' ? 'A que pais le corresponde esta bandera...' : `Cual es la capital de ${pregunta.pregunta}...`
      imgPregunta.id = 'img_preg';
      imgPregunta.src = imagenPregunta;
      divPregunta.appendChild(imgPregunta);
      spanPregunta.id = 'pregunta';
      spanPregunta.innerHTML = textoPregunta;
      divPregunta.appendChild(spanPregunta);
      // creacion de botones respuesta
      pregunta.respuesta.forEach(element => {
          const divRespuesta = document.createElement('div');
          divPregunta.appendChild(divRespuesta);
          const botonRespuesta = document.createElement('button');
          botonRespuesta.classList.add("blue-button");
  
          botonRespuesta.name = element;
          botonRespuesta.value = pregunta.clave;
          botonRespuesta.innerHTML = element;
          divRespuesta.appendChild(botonRespuesta);
          //<button class="blue-button" name="${pregunta.respuesta[0]}" value="${pregunta.clave}">${pregunta.respuesta[0]}</button>
          //        divRespuesta.classList.add('respuesta');
      });
      containerPregunta.addEventListener('click', (event) => {
          //        event.preventDefault();
          //        const botones = document.querySelectorAll('.blue-button');
          //        botones.forEach(boton => {
          //            boton.disabled = true;
          //       });
          //       if (event.target.classList.contains('blue-button')) {
          //           const valor = event.target.value;
          //           debug(`Clic en el botón con valor: ${valor}`);
          //       }
      });
      //    debug(pregunta.respuesta);
      //containerInicio.create
  
      // containerInicio.innerHTML = '<h1>Prueba</h1>';
      //debug(pregunta['pregunta']);
  */
}
//<button class="blue-button" name="${pregunta.respuesta[0]}" value="${pregunta.clave}">${pregunta.respuesta[0]}</button>
/*
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
*/


