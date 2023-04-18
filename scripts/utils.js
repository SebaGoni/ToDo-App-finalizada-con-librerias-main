
/* ---------------------------------- nombre --------------------------------- */
function validarNombre(nombre) {
    const inputValue = nombre.trim();
    
    if (inputValue === '') {
        return false;
    }
    return /^[a-zA-ZÀ-ÿ]+([ a-zA-ZÀ-ÿ'\-\.]*)*$/.test(inputValue) ? true : false
}

/* ---------------------------------- apellido --------------------------------- */
function validarApellido(apellido) {
    const inputValue = apellido.trim();
    
    if (inputValue === '') {
        return false;
    }
    return /^[a-zA-ZÀ-ÿ]+([ a-zA-ZÀ-ÿ'\-\.]*)*$/.test(inputValue) ? true : false
}

/* ---------------------------------- email --------------------------------- */
function validarEmail(email) {
    const inputValue = email.trim();
    if (inputValue === '') {
        return false;
    }
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue) ? true : false
    
}

/* -------------------------------- password -------------------------------- */
function validarContrasenia(contrasenia) {
    const inputValue = contrasenia.trim();
    if (inputValue === '') {
        return false;
    }
    return /^(?=.*[A-Z]).{8,}$/.test(inputValue) ? true : false
}

function compararContrasenias(contrasenia_1, contrasenia_2) {
    if(contrasenia_1===contrasenia_2){
    return true;
    }
}