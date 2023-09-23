function obtenerPaises(url) {
    const controlTiempo = new AbortController();
    const tiempoFuera = controlTiempo.signal;
    const timeCancel = setTimeout(() => {
        controlTiempo.abort(); // Cancelar la solicitud después de 20 segundos
    }, 20000);

    return fetch(url, { signal: tiempoFuera })
        .then(response => {
            clearTimeout(timeCancel);
            if (!response.ok) {
                throw new Error('error en solicitud');
            }
            return response.json();
        })
        .then(data => {
            let paises = paisesFiltra(data);
            return paises
        })
        /*        .then(paises => {
                    return obtenerPaisesKey(paises);
                })
        */
        .catch(error => {
            if (error.name === 'AbortError') {
                console.error('Existe un problema con la red, prueba en unos segundos');
            } else {
                console.error('Error:', error);
            }
        });
}
function paisesFiltra(data) {
    let paises = [];
    let pais = {};
    for (let i = 0; i < data.length; i++) {
        //if (data[i] && data[i].translations.spa.official && data[i].capital && data[i].flags.svg) {
        if (data[i] && data[i].translations.spa.common && data[i].capital && data[i].flags.svg) {
            pais = {
                nombre: data[i].translations.spa.official,
                bandera: data[i].flags.svg,
                capital: data[i].capital[0]
            }
            paises.push(pais);
        }
    }
    return paises;
}

function obtenerPaisesKey(data) {
    let paisesArrayKey = [];
    for (let i = 0; i < data.length; i++) {
        paisesArrayKey.push(i);
    };
    return paisesArrayKey;
}


export { obtenerPaises };
