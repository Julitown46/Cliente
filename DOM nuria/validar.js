function validarFormulario(event) {
    event.preventDefault();  // Evita el envío del formulario para realizar validaciones

    // Variables para los campos
    let nombre = document.getElementById("nombre").value;
    let password = document.getElementById("contrasenya")
    let email = document.getElementById("email").value;

    // Regex para validar el email y teléfono
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // Validar el nombre
    if (nombre.trim() === "") {
        alert("Por favor, ingrese su nombre.");
        return false;
    }

    // Validar el email
    if (!emailRegex.test(email)) {
        alert("Por favor, ingrese un correo electrónico válido.");
        return false;
    }

    // Validar la contraseña
    if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        return false;
    }

    alert("Formulario enviado correctamente.");
    // Aquí puedes proceder con el envío del formulario si la validación fue exitosa
    document.getElementById("formulario").submit();
}
