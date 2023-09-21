(function () {
    let paises;
    let preguntaIndex = -1;
    let tiempoInicial = 5000;
    let tiempoRestante;
    let tiempoTotal = 0;
    let intervalId;
    let resultadoRespuestas = [];
    let puntaje = 0;
    const DEBUG = true;
    const apiUrl = DEBUG ? 'http://localhost:8082' : 'https://tuds-web2-dev.fl0.io';

    // capturas de document element
    const timer = document.getElementById('time');
    const nroPregunta = document.getElementById('nro_preg');
    const cardRespuesta = document.getElementById('respuesta');

    async function obtenerDatosPaises() {
        try {
            const response = await fetch(`${apiUrl}/preguntas`);
            if (response.status === 200) {
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
        preguntaIndex++;
        nroPregunta.innerHTML = preguntaIndex + 1;
        if (preguntaIndex < paises.length) {
            const pregunta = paises[preguntaIndex];
            crearTrivia(pregunta);
            tiempoRestante = tiempoInicial;
            intervalId = setInterval(verificarTiempoRestante, 1000);
        } else {
            clearInterval(intervalId);
            mostrarResultado();
        }
    }

    function mostrarResultado() {
        timer.innerHTML = '0';
        tiempoRestante = 0;
        const container = document.getElementById('contenedor');
        container.innerHTML = '';
        cardRespuesta.innerHTML = '';
        const div = document.createElement('div');
        const p = document.createElement('p');
        p.innerHTML = `Su puntaje fue  ${puntaje} / ${paises.length}.<br> Respondite en ${tiempoTotal} segundos <br> Tu promedio tiempo  ${(tiempoTotal / paises.length).toFixed(2)} Segundos`;
        div.appendChild(p);
        container.appendChild(div);
    }

    async function crearTrivia(dato) {
        const container = document.getElementById('contenedor');

        container.innerHTML = '';
        cardRespuesta.innerHTML = '';
        const div = document.createElement('div');
        const p = document.createElement('p');
        const pregunta = dato.pregunta;
        dato.tipo === 'capital' ?
            p.innerHTML = `¿Cuál es la capital de ${pregunta}?` :
            p.innerHTML = `¿A que país pertenece esta bandera ? <br><img class="bandera" src="${pregunta}"></img>`;
        div.appendChild(p);
        const clave = document.createElement('input');
        clave.type = 'hidden';
        clave.value = dato.clave;
        clave.name = 'clave';
        div.appendChild(clave);
        const tipo = document.createElement('input');
        tipo.type = 'hidden';
        tipo.value = dato.tipo;
        tipo.name = 'tipo';
        div.appendChild(tipo);
        const respuesta = dato.respuesta;
        respuesta.forEach(element => {
            const divAux = document.createElement('div');
            const resp = document.createElement('input');
            resp.type = 'button';
            resp.name = 'respuesta';
            resp.value = element;
            resp.classList.add('button');
            resp.addEventListener('click', async () => {
                const claveInput = document.getElementsByName('clave');
                const tipoInput = document.getElementsByName('tipo');
                const tiempo = tiempoInicial - tiempoRestante;
                tiempoTotal += tiempo;
                let data = {
                    clave: claveInput[0].value,
                    tipo: tipoInput[0].value,
                    pregunta: dato.pregunta,
                    respuesta: resp.value,
                    tiempo: tiempo
                };
                debug(105, data.respuesta);
                let clave = claveInput[0].value;
                const resultado = JSON.parse(await obtenerPregunta(clave));
                if (resultado[data.tipo] === data.respuesta) { puntaje++; debug(109, resultado.nombre); } else { debug(110, resultado.nombre); }
                presentarPregunta();
                if (data.resultado === 'true') { puntaje++; debug('123', 'puntaje dentro if ' + puntaje); };
                resultadoRespuestas.push(data);

            });
            divAux.appendChild(resp);
            div.appendChild(divAux);
        });
        cardRespuesta.appendChild(div);
    }
    function verificarTiempoRestante() {
        if (tiempoRestante <= 0) {
            clearInterval(intervalId);
        } else {

            console.log(tiempoRestante);
            tiempoRestante -= 1;
            timer.innerHTML = tiempoRestante;

            if (tiempoRestante <= 0) {
                presentarPregunta();
                clearInterval(intervalId);

            }
        }
    }
    async function obtenerPregunta(clave) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };
        try {
            const response = await fetch(`${apiUrl}/pregunta?clave=${clave}`, requestOptions);
            if (response.ok) {
                const preg = JSON.stringify(await response.json());
                return preg;
            } else {
                console.error('Error en la solicitud al servidor:', response.statusText);
                return null;
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
            return null;
        }
    }
    function debug(line = ' n/d ', data) {
        if (DEBUG) { console.log(`linea ${line} datos ${data}`); }
    }

    (async () => {
        paises = await obtenerDatosPaises();
        paises && paises.length > 0 ? presentarPregunta() : console.error('No data available.');
    })();
})();