/*

3)
3.1) Dado el siguiente objeto
let carrito = {
    montoTotal: 10,
    productos: [{'nombre':Leche, 'precio':4000, 'unidades':5},{...}...]
}

Crear las clase necesarias para generar carritos respetando la estructura del objeto dado.

3.2) Agregar un metodo a la clase que agregue un producto al carrito y actualice el montoTotal
agregarProducto(nombre, precio, unidades) {
    // Completar aca...
}


Ej:
agregarProducto("Azucar", 5, 2);

//Resultado esperado
carrito = {
    montoTotal: 20,
    productos: ["Leche", "Azucar"]
}


3.3)Agregar al ejercicio anterior una validación para no permitir duplicados e imprimir un mensaje si el item ya existe “ya existe xxx con yyy unidades”

*/

class Carrito {
    constructor(montoTotal, productos) {
        this.montoTotal = montoTotal;
        this.productos = productos;
    }

    agregarProducto(nombre, precio, unidades) {
        let producto = {
            nombre: nombre,
            precio: precio,
            unidades: unidades
        }
        // si ya existe el nombre del producto en el carrito no lo agrego
        let duplicado = this.productos.find(producto => producto.nombre === nombre);
        if (duplicado) {
            console.log(`Ya existe ${duplicado.nombre} con ${duplicado.unidades} unidades`);
        }
        else {
            this.productos.push(producto);
            this.montoTotal += precio * unidades;
        }
    }
}

let micarrito = new Carrito(0, []);
micarrito.agregarProducto("Leche", 10, 2);
micarrito.agregarProducto("Azucar", 5, 1);
console.log(micarrito);



