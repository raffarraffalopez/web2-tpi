function debug(msg) {
    if (process.env.NODE_ENV == 'dev') {
        const stack = new Error().stack.split('\n');
        let partes = stack[2].split('\/');
        partes = stack[2].split('\/')[stack[2].split('\/').length - 1].split(':');
        console.log('\n\r', partes[0], 'linea', partes[1], ' -> ', msg);
    }
}
export default debug;