const salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
}

const numeroPersonas = Object.keys(salaries).length;

function sumarSalarios(){
    let sum = 0;
    Object.values(salaries).forEach(element => {
        sum += element;
    });
    return sum;
}

const sumaSalarios = sumarSalarios();

const personasOrdenadas = Object.keys(salaries).sort();

console.log(numeroPersonas);
console.log(sumaSalarios);
console.log(personasOrdenadas.toString());