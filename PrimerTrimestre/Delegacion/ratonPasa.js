const divs = document.querySelectorAll(".espacio");
const elementoSeleccionado = document.getElementById("elem");

divs.forEach(div => {
    div.addEventListener("mouseenter", () => {
        div.style.backgroundColor = "lightblue";
        elementoSeleccionado.textContent = `Elemento donde esta: ${div.id}`;  
    });

    div.addEventListener("mouseleave", () => {
        div.style.backgroundColor = "";
        elementoSeleccionado.textContent = `Elemento donde esta: NADA`;    
    });
});

const posicionElemento = document.getElementById("posicion");

document.addEventListener("mousemove", (event) => {
    let x = event.clientX;
    let y = event.clientY;

    posicionElemento.textContent = `Posición del mouse: X: ${x}, Y: ${y}`;
}); 