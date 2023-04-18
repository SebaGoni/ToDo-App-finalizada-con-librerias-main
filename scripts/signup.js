window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.forms[0];
    const nombre = document.querySelector('#inputNombre');
    const apellido = document.querySelector('#inputApellido');
    const email = document.querySelector('#inputEmail');
    const password = document.querySelector('#inputPassword');
    const passwordRepetida = document.querySelector('#inputPasswordRepetida');
    const nombreError = document.querySelector('#nombreError');
    const apellidoError = document.querySelector('#apellidoError');
    const emailError = document.querySelector('#emailError');
    const contraseniaError = document.querySelector('#contraseniaError');
    const contraseniaRepetidaError = document.querySelector('#contraseniaRepetidaError');
    const url = 'https://todo-api.ctd.academy/v1';

    /*--- Definimos el estado inicial del usuario y el estado del error en false para que no muestre mensaje--*/

    const estadoUsuario = {
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        passwordRepetida: ""
    };
    const estadoErroresOK = {
        nombre: false,
        apellido: false,
        email: false,
        password: false,
        passwordRepetida: false
    };

    /* --------------------------------------------------------------------------------------------- */
    /* Escuchamos el change del formulario y validamos del lado del Front                            */
    /* --------------------------------------------------------------------------------------------- */
    
    form.addEventListener('change', function () {

        // actualizo el estado de la pantalla con los datos
        estadoUsuario.nombre = nombre.value;
        estadoUsuario.apellido = apellido.value;
        estadoUsuario.email = email.value;
        estadoUsuario.password = password.value;
        estadoUsuario.passwordRepetida = passwordRepetida.value;

        // actualizo el estado del error segun el estado del usuario
        estadoErroresOK.nombre = validarNombre(estadoUsuario.nombre);
        estadoErroresOK.apellido = validarApellido(estadoUsuario.apellido);
        estadoErroresOK.email = validarEmail(estadoUsuario.email);
        estadoErroresOK.password = validarContrasenia(estadoUsuario.password);
        estadoErroresOK.passwordRepetida = compararContrasenias(estadoUsuario.password, estadoUsuario.passwordRepetida);

        // finalmente muestro los errores presentes
        mostrarErrores();
    });

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 2: Mostramos los errores                                */
    /* -------------------------------------------------------------------------- */

    function mostrarErrores() {
        estadoErroresOK.nombre ? nombreError.classList.remove('visible') : nombreError.classList.add('visible');
        estadoErroresOK.apellido ? apellidoError.classList.remove('visible') : apellidoError.classList.add('visible');
        estadoErroresOK.email ? emailError.classList.remove('visible') : emailError.classList.add('visible');
        estadoErroresOK.password ? contraseniaError.classList.remove('visible') : contraseniaError.classList.add('visible');
        estadoErroresOK.passwordRepetida ? contraseniaRepetidaError.classList.remove('visible') : contraseniaRepetidaError.classList.add('visible');
    }

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 3: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if(estadoErroresOK.nombre && estadoErroresOK.apellido && estadoErroresOK.email && estadoErroresOK.password && estadoErroresOK.passwordRepetida){
        mostrarSpinner()
        //creamos el cuerpo de la request
        const payload = {
            firstName: nombre.value,
            lastName: apellido.value, 
            email: email.value,
            password: password.value
        };
        //configuramos la request del Fetch
        const settings = {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        //lanzamos la consulta de login a la API
        realizarRegister(settings);

        //limpio los campos del formulario
        form.reset();
    }
    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 4: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */

    function realizarRegister(settings) {
        console.log("Lanzando la consulta a la API");
        fetch(`${url}/users`, settings)
            .then(response => {
                console.log(response);

                if (response.ok != true) {
                    alert("Alguno de los datos es incorrecto.")
                }
                ocultarSpinner()

                return response.json();

            })
            .then(data => {
                console.log("Promesa cumplida:");
                console.log(data);

                if (data.jwt) {
                    //guardo en LocalStorage el objeto con el token
                    localStorage.setItem('jwt', JSON.stringify(data.jwt));

                    //redireccionamos a la página
                    location.replace('./mis-tareas.html');
                }
                
            }).catch(err => {
                console.log("Promesa rechazada:");
                console.log(err);
            })
    };


});
