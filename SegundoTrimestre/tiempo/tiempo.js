console.log('Inicio de programa');

document.getElementById("ciudad").addEventListener("change", function() {
    let q = this.value;
    let apiKey = '6b32863e8f5c47bd91a91158250801';
    let url = "https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${q}";

    let miPromesa = new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject('Error en la respuesta de la API');
                }
            })

            .then(data => resolve(data))
            .catch(error => reject(error));
    });

    miPromesa
        .then((resultado) => {
            // Aquí muestro la información de la API en la consola
            console.log('Resultado:', resultado);
            
            // Y aquí en el html
            document.getElementById("weather-img").src = resultado.current.condition.icon;
            document.getElementById("weather-info").textContent = "Temperatura: ${resultado.current.temp_c}°C, Condición: ${resultado.current.condition.text}";

        })
        .catch((error) => {
            console.log('Error:', error);
            document.getElementById("weather-info").textContent = 'Error 404, no se encuentra la ciudad';
        });
});

console.log('Fin de programa');