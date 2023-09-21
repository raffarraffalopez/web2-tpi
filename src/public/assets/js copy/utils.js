function debug(msg) {
    const stack = new Error().stack.split('\n');
    let partes = stack[2].split('\/');
    partes = stack[2].split('\/')[stack[2].split('\/').length - 1].split(':');
    console.log('\n\r', partes[0], 'linea', partes[1], ' -> ', msg);
    //console.log('\n\r', partes[1], ' -> ', msg);
}
export default debug;