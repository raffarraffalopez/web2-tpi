(function () {
    // const apiUrl = `https://tuds-web2-dev.fl0.io/preguntas`;
    // const apiUrl = `http://localhost:8080/preguntas`;

    let paises;
    let preguntaIndex = -1;
    let tiempoInicial = 180;
    let tiempoRestante;
    let tiempoTotal = 0;
    let intervalId;
    let resultadoRespuestas = [];
    let puntaje = 0;
    const DEBUG = true;
    const apiUrl = DEBUG ? 'http://localhost:8082' : 'https://tuds-web2-dev.fl0.io';

    (async () => {
        paises = await obtenerDatosPaises();
        debug(paises);
        paises && paises.length > 0 ? presentarPregunta() : console.error('No data available.');
    })();

    async function obtenerDatosPaises() {

        try {
            const response = await fetch(`${apiUrl}/preguntas`);
            if (response.status === 200) {
                const datosPaises = await response.json();
                return datosPaises;
            } else if (response.status === 400) {
                console.error('Error en la solicitud:', response.statusText);
                return null;
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
        debug(preguntaIndex);
        if (preguntaIndex < paises.length) {
            const pregunta = paises[preguntaIndex];
            crearPreguntaYPresentarRespuestas(pregunta);
            tiempoRestante = tiempoInicial;
            intervalId = setInterval(verificarTiempoRestante, 1000);
        } else {

            clearInterval(intervalId);
            debug(`Tiempo total: ${tiempoTotal} segundos`);
            mostrarResultado();

        }
    }
    function mostrarResultado() {

        const container = document.getElementById('contenedor');
        container.innerHTML = '';
        const div = document.createElement('div');
        const p = document.createElement('p');
        p.innerHTML = `Su puntaje fue  ${puntaje} / ${paises.length}.<br> Respondite en ${tiempoTotal} segundos <br> Tu promedio tiempo  ${(tiempoTotal / paises.length).toFixed(2)} Segundos`;
        div.appendChild(p);
        container.appendChild(div);
        debug(resultadoRespuestas);
    }

    async function crearPreguntaYPresentarRespuestas(dato) {
        const container = document.getElementById('contenedor');
        debug(dato);
        container.innerHTML = '';
        const div = document.createElement('div');
        const p = document.createElement('p');
        const pregunta = dato.pregunta;
        dato.tipo === 'capital' ?
            p.innerHTML = `¿Cuál es la capital de ${pregunta}?` : p.innerHTML = `¿Cuál es el país cuya bandera es? <br><img class="bandera" src="${pregunta}"></img>`;
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
            resp.type = 'radio';
            resp.name = 'respuesta';
            resp.value = element;
            resp.addEventListener('click', async () => {
                debug('98', ' Respuesta seleccionada: ' + resp.value);
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

                let clave = claveInput[0].value;
                //let data = {};
                //debug(data);
                // data.resultado = await verificarPregunta(data);

                //console.log(obtenerPregunta(data));
                data.resultado = await obtenerPregunta(clave);


                //   debug(' resultado ->' + JSON.stringify(data));
                debug('122', ' resultado ->' + (data));
                if (data.resultado === 'true') { puntaje++; debug('123', 'puntaje dentro if ' + puntaje); };
                debug('puntaje ' + puntaje);
                resultadoRespuestas.push(data);
                debug(data.resultado);
                presentarPregunta();
            });
            const label = document.createElement('label');
            label.textContent = element;
            divAux.appendChild(resp);
            divAux.appendChild(label);
            div.appendChild(divAux);
        });

        container.appendChild(div);
    }

    function verificarTiempoRestante() {
        if (tiempoRestante <= 0) {
            clearInterval(intervalId);
        } else {
            tiempoRestante -= 1;
            if (tiempoRestante <= 0) {
                clearInterval(intervalId);
            }
        }
    }

    // async function verificarPregunta(data) {
    //     var headers = new Headers();
    //     headers.append("Content-Type", "application/json");
    //     var requestOptions = {
    //         method: 'POST',
    //         headers: headers,
    //         body: JSON.stringify(data),
    //         redirect: 'follow'
    //     };
    //     try {
    //         const response = await fetch(`${apiUrl}/respuesta`, requestOptions);
    //         if (response.ok) {
    //             const resultado = await response.text();
    //             return resultado;
    //         } else {
    //             console.error('Error en la solicitud al servidor:', response.statusText);
    //             return null;
    //         }
    //     } catch (error) {
    //         console.error('Error al realizar la solicitud:', error);
    //         return null;
    //     }
    // }
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
                console.log('linea 185' + typeof (response));
                const preg = await response.json();
                //                console.log('linea 187' + JSON.stringify(preg));
                //const preg = await response;
                const pregunta = Object.values(preg);
                //    console.log(`linea 178 ${pregunta}`);
                // return pregunta;
                return JSON.stringify(preg);
            } else {
                console.error('Error en la solicitud al servidor:', response.statusText);
                return null;
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
            return null;
        }
    }
    function debug(line = '', data) {
        if (DEBUG) { console.log(`linea ${line} datos ${data}`); }
    }
})();