// este script es importante, procesa toda l ainfo de index.html
/** defincion variables y const */
const contenedor = document.getElementById("contenedor");
let count = 0;
let buttons = "";
let puntaje = 0;
let respuestas = "";
const cantPreguntas = 2;
/* funcio incio app */
main();

/** FUNCIONES **/
// async main contra la toda la app ,
async function main() {
  // envia pregunta app
  await esperarBoton(); // el await maneja la espea d erepeusta uan vez dedevuelta sigue curso app
  count++;
  //verifica respuesta
  verificarRespuesta();
}
function fin() {
  console.log(
    fetch("http://rafalopez.ar")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        console.log(data); // Aquí puedes trabajar con los datos recibidos
      })
      .catch((error) => {
        console.error("Hubo un error:", error);
      })
  );

  contenedor.innerHTML = `<button class="final" >PUNTAJE <b>${puntaje}</b></button>`;
}

setTimeout(() => {
  main();
}, 1000);
// creacion de seccion
function btnRsepuesta() {
  //    debug(`linea 26 ${count}`);
  let msg = "";
  for (let i = 0; i < 4; i++) {
    msg += `<button class="button" value="${respuestasAll[count][i]}">${respuestasAll[count][i]}</button>`;
  }

  /*    contenedor.innerHTML = `
        <button class="button" value="${respuestasAll[count][0]}">${respuestasAll[count][0]}</button>
        <button class="button" value="${respuestasAll[count][1]}">${respuestasAll[count][1]}</button>
        <button class="button" value="${respuestasAll[count][2]}">${respuestasAll[count][2]}</button>
        <button class="button" value="${respuestasAll[count][3]}">${respuestasAll[count][3]}</button>
    `;
    */
  contenedor.innerHTML = msg;
}
//contenedor.innerHTML = `<button class="button" >Saludar 0</button><br><button class="button" >Saludar 1</button><br><button class="button" >Saludar 2</button><br><button class="button" >Saludar 3</button><br>`;

async function esperarBoton() {
  //crea botones respeusta
  btnRsepuesta();
  return new Promise((resolve) => {
    const buttons = document.querySelectorAll(".button");
    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        //respuesta = event.target.textContent;
        respuesta = event.target.value;
        debug("resp" + respuesta);
        resolve();
      });
    });
  });
}
function verificarRespuesta() {
  debug("leng:" + respuesta.length);
  debug(respuesta + " <-> " + respuestasTrue[count - 1]);
  debug(typeof respuesta + " <-> " + typeof respuestasTrue[count - 1]);
  debug("ooo" + respuestasTrue[count]);
  if (respuesta == respuestasTrue[count - 1]) {
    puntaje++;
    respuestaCorrecta();
  } else {
    respuestaInCorrecta();
  }
  //    debug(`VERIFICAR respusta . ${count}`);
  //   debug(`verifico rest ${count}`);
  if (count < cantPreguntas) {
    setTimeout(() => {
      main();
    }, 1000);
  } else {
    setTimeout(() => {
      fin();
    }, 1000);
  }
}
function respuestaCorrecta() {
  contenedor.innerHTML = `<button class="button" >CORRECTA PUNTAJE <b>${puntaje}</b></button>`;
}
function respuestaInCorrecta() {
  contenedor.innerHTML = `<button class="button" >IN CORRECTA PUNTAJE <b>${puntaje}</b></button>`;
}
//  contenedor.innerHTML = `<button class="button" >${respuestasAll[count-1][0]}<br><button class="button" >${respuestasAll[count-1][1]}<br><button class="button" >${respuestasAll[count-1][2]}<br><button class="button" >${respuestasAll[count-1][3]}<br>`;
