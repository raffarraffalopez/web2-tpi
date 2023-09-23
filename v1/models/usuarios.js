async function consultaUsuarios() {
    try {
        await clientDB.connect(); // Conecta a la base de datos

        // Define la consulta preparada con marcadores de posición
        const consultaPreparada = 'INSERT INTO mi_tabla (campo1, campo2) VALUES ($1, $2)';

        // Valores que se insertarán en lugar de los marcadores de posición
        const valor1 = 'Valor 1';
        const valor2 = 'Valor 2';

        // Ejecuta la consulta preparada con los valores
        await clientDB.query(consultaPreparada, [valor1, valor2]);

        console.log('Consulta preparada ejecutada con éxito');
    } catch (error) {
        console.error('Error al ejecutar la consulta preparada:', error);
    } finally {
        await clientDB.end(); // Cierra la conexión a la base de datos
    }
}
export { consultaUsuarios }; 