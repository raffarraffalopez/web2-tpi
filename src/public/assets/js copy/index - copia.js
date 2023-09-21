const contenedor = document.getElementById("contenedor");
let count=0;
let buttons = '';
async function mostrarPreguntas() {
    for (let i = 0; i < 10; i++) {
        const pregunta = preguntas[i];
        debug(preguntas[i].respuesta);
        const preguntaContent = pregunta.type === 'capital' ?
            `¿Cuál es la capital de ${pregunta.capital}?` :
            `¿De qué país es la siguiente bandera?<img class="bandera" src="${preguntas[i].bandera}"></img>`;
    
       buttons = '';
       for (let j = 0; j < 4; j++) {
            buttons += `
                <label>
                    <button class="button">${respuestasAll[i][j]}</button>
                </label>
            `;
        }
    
        const preguntaHTML = `
            <div class="card" id="preg-${i}">
            <p>Puntaje ${count}</p>
                <div class="card-header">
                    <h2>${"Pregunta nº" + (i + 1)}</h2>
                    <div class="card-pregunta">
                        <h3>${preguntaContent}</h3>
                    </div>
                </div>
                <div class="card-body">
                    <div class="buttons">
                        ${buttons}
                    </div>
                </div>
            </div>
        `;
        contenedor.innerHTML = preguntaHTML;
        const respuestaSeleccionada = await esperarRespuesta();       
       
        preguntas[i].respuesta===respuestaSeleccionada ? count++ : count;
    }
    const respuestaSeleccionada = await esperarRespuesta();       
    preguntas[i].respuesta===respuestaSeleccionada ? count++ : count;

}

function esperarRespuesta() {
    return new Promise(resolve => {
        const buttons = document.querySelectorAll(".button");
        buttons.forEach(button => {
            button.addEventListener("click", (event) => {
                const respuesta = event.target.textContent;
                resolve(respuesta);
            });
        });
    });
}

mostrarPreguntas();

