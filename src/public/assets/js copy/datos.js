/*const paises = obtenerDatosPaises();
console.log(paises);
console.log('caca');
/*********************************/
/*
async function obtenerDatosPaises() {
  const apiUrl = `https://tuds-web2-dev.fl0.io/preguntas`;
  try {
    const response = await fetch(apiUrl);
    let datosPaises = await response.json();
    //datosPaises = datosPaisesFiltrados(datosPaises);
    //datosPaises = JSON.stringify(datosPaises);
    // console.log(datosPaises);
    return datosPaises;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return null;
  }
}
const container = document.getElementById('contenedor');

for (let i = 0; i < 10; i++) {
  const pregunta = paises[i];
  
  container.innerHTML(pregunta);

}
*/
// let paises;
// (async () => {
//   paises = await obtenerDatosPaises();
//   console.log(paises);
//   console.log('caca');
//   if (paises && paises.length > 0) {
//     for (let i = 0; i < 3; i++) {
//       crearPregunta(paises[i]);
//       crearRespuestas(paises[i]);
//       verRespuesta();

//     }
//   } else {
//     console.error('No data available.');
//   }
// })();

// async function obtenerDatosPaises() {
//   const apiUrl = `https://tuds-web2-dev.fl0.io/preguntas`;
//   try {
//     const response = await fetch(apiUrl);
//     if (response.ok) {
//       const datosPaises = await response.json();
//       return datosPaises;
//     } else {
//       console.error('Error en la solicitud:', response.statusText);
//       return null;
//     }
//   } catch (error) {
//     console.error('Error en la solicitud:', error);
//     return null;
//   }
// }



// function crearRespuestas(dato) {
//   const container = document.getElementById('contenedor');
//   const div = document.createElement('div');
//   const respuesta = dato.respuesta;
//   const clave = document.createElement('input');
//   clave.type = 'hidden';
//   clave.value = dato.clave;
//   clave.name = 'clave';
//   div.appendChild(clave);
//   respuesta.forEach(element => {
//     const divAux = document.createElement('div');
//     const resp = document.createElement('input');
//     resp.type = 'radio'; // Debes usar comillas para 'radio' como tipo de input
//     resp.name = 'respuesta'; // Asigna el mismo nombre a los radios para que sean mutuamente excluyentes
//     resp.value = element;
//     resp.name = 'respuesta';
//     divAux.appendChild(resp);
//     const label = document.createElement('label');
//     label.textContent = element;
//     divAux.appendChild(label);
//     // Agregar un salto de línea para separar las opciones de respuesta
//     //const br = document.createElement('br');
//     div.appendChild(divAux);
//   });

//   container.appendChild(div);
// }
// function crearPregunta(dato) {
//   const container = document.getElementById('contenedor');
//   container.innerHTML = '';
//   const p = document.createElement('p'); // Corrección aquí
//   const pregunta = dato.pregunta;
//   p.innerHTML = pregunta;
//   container.appendChild(p);

// }
// function verRespuesta() {
//   let inicioCronometro;
//   let eventoRealizado = false;
//   // Función para manejar el evento (por ejemplo, clic en un elemento)
//   function manejarEvento() {
//     if (!eventoRealizado) {
//       const tiempoTranscurrido = Date.now() - inicioCronometro;
//       console.log(`Clic realizado después de ${tiempoTranscurrido} milisegundos.`);
//       eventoRealizado = true;
//     }
//   }

//   // Agregar un event listener al elemento (puede ser un clic u otro evento)
//   const miElemento = document.getElementById('contenedor');
//   miElemento.addEventListener('click', manejarEvento);

//   // Iniciar el cronómetro cuando se carga la página
//   window.addEventListener('load', () => {
//     inicioCronometro = Date.now();
//   });
// }

//TODO codigo de prueba no sirve
// let paises;

// (async () => {
//   paises = await obtenerDatosPaises();
//   console.log(paises);
//   console.log('caca');
//   if (paises && paises.length > 0) {
//     for (let i = 0; i < 3; i++) {
//       crearPreguntaYPresentarRespuestas(paises[i]);
//     }
//   } else {
//     console.error('No data available.');
//   }
// })();

// async function obtenerDatosPaises() {
//   const apiUrl = `https://tuds-web2-dev.fl0.io/preguntas`;
//   try {
//     const response = await fetch(apiUrl);
//     if (response.ok) {
//       const datosPaises = await response.json();
//       return datosPaises;
//     } else {
//       console.error('Error en la solicitud:', response.statusText);
//       return null;
//     }
//   } catch (error) {
//     console.error('Error en la solicitud:', error);
//     return null;
//   }
// }

// function crearPreguntaYPresentarRespuestas(dato) {
//   const container = document.getElementById('contenedor');
//   container.innerHTML = '';
//   const div = document.createElement('div');

//   const p = document.createElement('p');
//   const pregunta = dato.pregunta;
//   p.innerHTML = pregunta;

//   div.appendChild(p);

//   const respuesta = dato.respuesta;
//   respuesta.forEach(element => {
//     const divAux = document.createElement('div');
//     const resp = document.createElement('input');
//     resp.type = 'radio';
//     resp.name = 'respuesta-' + dato.clave; // Crea un grupo de radio único por pregunta
//     resp.value = element;
//     resp.addEventListener('click', manejarEvento);

//     divAux.appendChild(resp);

//     const label = document.createElement('label');
//     label.textContent = element;
//     divAux.appendChild(label);

//     div.appendChild(divAux);
//   });

//   container.appendChild(div);
// }

// function manejarEvento() {
//   if (!eventoRealizado) {
//     const tiempoTranscurrido = Date.now() - inicioCronometro;
//     console.log(`Clic realizado después de ${tiempoTranscurrido} milisegundos.`);
//     eventoRealizado = true;
//   }
// }

// let inicioCronometro;
// let eventoRealizado = false;

// window.addEventListener('load', () => {
//   inicioCronometro = Date.now();
// });

let paises;
let preguntaIndex = 0;
let tiempoRestante = 1800;
let intervalId;

(async () => {
  paises = await obtenerDatosPaises();
  console.log(paises);

  if (paises && paises.length > 0) {
    presentarPregunta();

  } else {
    console.error('No data available.');
  }
})();

async function obtenerDatosPaises() {
  const apiUrl = `https://tuds-web2-dev.fl0.io/preguntas`;
  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const datosPaises = await response.json();
      return datosPaises;
    } else {
      console.error('Error en la solicitud:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return null;
  }
}

function presentarPregunta() {
  console.log(preguntaIndex);
  if (preguntaIndex < paises.length) {
    const pregunta = paises[preguntaIndex];
    crearPreguntaYPresentarRespuestas(pregunta);

    // Iniciar el temporizador de 3 minutos
    tiempoRestante = 2000;
    clearInterval(intervalId);
    intervalId = setInterval(verificarTiempoRestante, 1000);
  } else {
    console.log('Todas las preguntas han sido respondidas.');
  }
}

function crearPreguntaYPresentarRespuestas(dato) {
  console.log(`DATO ${dato.clave} ${dato.pregunta}`);
  const container = document.getElementById('contenedor');
  container.innerHTML = '';
  const div = document.createElement('div');
  // seccion  pregunta
  const p = document.createElement('p');
  const pregunta = dato.pregunta;
  dato.tipo === 'capital' ?
    p.innerHTML = `¿Cuál es la capital de ${pregunta}?`
    :
    p.innerHTML = `¿Cuál es el pais cuya bandera es? <br><img class="bandera" src="${pregunta}"></img>`;
  //p.innerHTML = pregunta;
  div.appendChild(p);
  container.appendChild(div);
  // secc calve pregunta
  const clave = document.createElement('input');
  clave.type = 'input';
  clave.value = dato.clave;
  clave.name = 'clave';
  div.appendChild(clave);
  // seccion repuestas
  const respuesta = dato.respuesta;
  respuesta.forEach(element => {
    console.log(element);
    const divAux = document.createElement('div');
    const resp = document.createElement('input');
    resp.type = 'radio';
    resp.name = 'respuesta';
    resp.value = element;
    const label = document.createElement('label');
    label.textContent = element;
    divAux.appendChild(resp);
    divAux.appendChild(label);
    div.appendChild(divAux);
  })
  clearInterval(intervalId);
}

function verificarTiempoRestante() {
  if (tiempoRestante <= 0) {
    clearInterval(intervalId);
    console.log('Se acabó el tiempo para esta pregunta.');
    preguntaIndex++;
    presentarPregunta();
  } else {
    tiempoRestante -= 1000;
    console.log(`Tiempo restante: ${tiempoRestante / 1000} segundos`);
  }
}
