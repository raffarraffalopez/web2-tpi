//calss DOM mircoframework
class DOM {
    constructor() {
        this.id = str => document.getElementById(str);// selecciona por id
        this.query = (regla_css, one = false) =>
            one ? document.querySelector(regla_css) : document.querySelectorAll(regla_css);
    }

    create(nombreEtiqueta, propiedades = {}) {
        return Object.assign(document.createElement(nombreEtiqueta), propiedades);
    }

    append(hijos, padre = document.body) {
        if (Array.isArray(hijos)) {
            hijos.map(hijo => parent.appendChild(hijo));
        } else {
            padre.appendChild(hijos);
        }
    }

    remove(element) {
        element.remove();
    }
}
export default DOM;