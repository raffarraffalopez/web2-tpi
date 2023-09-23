async function obtenerPaises(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const paisesFiltrados = paisesFiltra(data);
        return paisesFiltrados;
    } catch (error) {
        throw error;
    }
}
function obtenerPaisesKey(data) {
    let paisesArrayKey = [];
    for (let i = 0; i < data.length; i++) {
        paisesArrayKey.push(i);
    };
    return paisesArrayKey;
}
function paisesKeyMesclados(datas) {
    let data = [...datas];

    for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [data[i], data[j]] = [data[j], data[i]];
    }
    return data;
}

function paisesFiltra(data) {
    let paises = [];

    for (let i = 0; i < data.length; i++) {
        if (data[i] && data[i].name.common && data[i].flags && data[i].capital) {
            let pais = {
                nombre: data[i].name.common,
                bandera: data[i].flags.png,
                capital: data[i].capital[0]
            }
            paises.push(pais);
        }

    }
    return paises;

}

export { obtenerPaises, obtenerPaisesKey, paisesKeyMesclados };