import { CONFIG } from '../config.js';
class paisesModel {

    paisesData = async () => {
        try {
            const response = await fetch(CONFIG.URL_GAME);
            if (!response.ok) {
                console.error('Error en la solicitud a la API');
            }
            const data = await response.json();
            const resultados = await data.map(element => {
                //    if (element.translations.spa.official && element.capital && element.flags.svg) {
                if (element.translations.spa.common && element.capital && element.flags.svg) {
                    const nombre = element.translations.spa.official;
                    const capital = element.capital[0];
                    const bandera = element.flags.svg;
                    return {
                        nombre: nombre,
                        capital: capital,
                        bandera: bandera
                    };
                }
            });
            return resultados;
        } catch (error) {
            throw new Error('Error en la solicitud a la API: ' + error.message);
        }
    }
    async obtenerPaisesKeyMap(paises) {
        let i = 0;
        return paises.map(() => i++);
    }
    // async paisesFiltraMap(data) { //usando map
    //     const resultados = data.map(element => {
    //         if (element.translations.spa.official && element.capital && element.flags.svg) {
    //             const nombre = element.translations.spa.official;
    //             const capital = element.capital[0];
    //             const bandera = element.flags.svg;
    //             return {
    //                 nombre: nombre,
    //                 capital: capital,
    //                 bandera: bandera
    //             };
    //         }
    //     });
    //     return resultados;
    // }

}
export default paisesModel;
