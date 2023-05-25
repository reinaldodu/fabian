/*
1. Realizar una funcion que reciba un numero y escriba una piramide desde 1 hasta ese numero de la siguiente forma:
para valor 6:

1
12
123
1234
12356
*/

function piramide(numero) {
    let resultado = '';  //variable de tipo string
    for (let i = 1; i <= numero; i++) {
        resultado += i;
        console.log(resultado);
    }
}

piramide(6);