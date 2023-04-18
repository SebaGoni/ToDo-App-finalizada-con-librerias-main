window.addEventListener('load', function () {
    /* ------------------------- iniciamos libreria AOS ------------------------- */
    AOS.init();
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.forms[0];
    const email = document.querySelector('#inputEmail')
    const password = document.querySelector('#inputPassword')
    const emailError = document.querySelector('#emailError');
    const url = 'https://todo-api.ctd.academy/v1';


    /*--- Definimos el estado inicial del usuario y el estado del error en false para que no muestre mensaje--*/

    const estadoUsuario = {
        email: ""
    };
    const estadoErroresOK = {
        email: false
    };
    
    /* --------------------------------------------------------------------------------------------- */
    /* FUNCIÓN 1: Escuchamos el change del formulario y validamos del lado del Front                 */
    /* --------------------------------------------------------------------------------------------- */
    
    form.addEventListener('change', function () {

        // actualizo el estado de la pantalla con los datos
        estadoUsuario.email = email.value;
    
        // actualizo el estado del error segun el estado del usuario
        estadoErroresOK.email = validarEmail(estadoUsuario.email);
    
        // finalmente muestro los errores presentes
        mostrarErrores();
    });

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 2: Mostramos los errores                                */
    /* -------------------------------------------------------------------------- */

    function mostrarErrores() {
        estadoErroresOK.email ? emailError.classList.remove('visible') : emailError.classList.add('visible');
    }

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 3: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if(estadoErroresOK.email && password.value!==""){
        mostrarSpinner()
        //creamos el cuerpo de la request
        const payload = {
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
        realizarLogin(settings);
        
        //limpio los campos del formulario
        form.reset();
    }else{
        Swal.fire(
            'Debe completar todos los campos del formulario',
          );
    }
 
    });

    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 4: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */

    function realizarLogin(settings) {
        console.log("Lanzando la consulta a la API...");
        fetch(`${url}/users/login`, settings)
            .then(response => {
                console.log(response);

                if (response.ok != true) {
                    Swal.fire(
                        'Alguno de los datos es incorrecto',
                      );
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
