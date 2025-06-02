document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registroForm');
    const btnCancelar = document.getElementById('btnCancelar');

    
    function validarRut(rut) {
        rut = rut.replace(/\./g, '').replace(/-/g, '');
    
        const dv = rut.slice(-1).toUpperCase();
        const rutNumero = parseInt(rut.slice(0, -1));

        let suma = 0;
        let multiplicador = 2;
        
        let rutReverso = rutNumero.toString().split('').reverse();
        for(let i = 0; i < rutReverso.length; i++) {
            suma += parseInt(rutReverso[i]) * multiplicador;
            multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
        }
        
        let dvEsperado = 11 - (suma % 11);
        dvEsperado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
        
        return dvEsperado === dv;
    }

    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validarContrasena(password) {
        const tieneMinuscula = /[a-z]/.test(password);
        const tieneMayuscula = /[A-Z]/.test(password);
        const tieneNumero = /[0-9]/.test(password);
        const longitudValida = password.length >= 6 && password.length <= 12;

        return tieneMinuscula && tieneMayuscula && tieneNumero && longitudValida;
    }

    function mostrarError(input, mensaje) {
        const errorElement = document.getElementById(input.id + 'Error');
        errorElement.textContent = mensaje;
        input.classList.add('error');
    }

    function limpiarError(input) {
        const errorElement = document.getElementById(input.id + 'Error');
        errorElement.textContent = '';
        input.classList.remove('error');
    }

    function validarFormulario(e) {
        e.preventDefault();
        let esValido = true;

        const nombre = document.getElementById('nombre');
        if (!nombre.value.trim()) {
            mostrarError(nombre, 'El nombre es requerido');
            esValido = false;
        } else {
            limpiarError(nombre);
        }

        const rut = document.getElementById('rut');
        if (!rut.value.trim()) {
            mostrarError(rut, 'El RUT es requerido');
            esValido = false;
        } else if (!validarRut(rut.value)) {
            mostrarError(rut, 'El RUT no es válido');
            esValido = false;
        } else {
            limpiarError(rut);
        }

        const email = document.getElementById('email');
        if (!email.value.trim()) {
            mostrarError(email, 'El email es requerido');
            esValido = false;
        } else if (!validarEmail(email.value)) {
            mostrarError(email, 'El email no es válido');
            esValido = false;
        } else {
            limpiarError(email);
        }

        const contrasena = document.getElementById('contrasena');
        const repetirContrasena = document.getElementById('repetir-contrasena');

        if (!contrasena.value) {
            mostrarError(contrasena, 'La contraseña es requerida');
            esValido = false;
        } else if (!validarContrasena(contrasena.value)) {
            mostrarError(contrasena, 'La contraseña no cumple con los requisitos');
            esValido = false;
        } else {
            limpiarError(contrasena);
        }

        if (contrasena.value !== repetirContrasena.value) {
            mostrarError(repetirContrasena, 'Las contraseñas no coinciden');
            esValido = false;
        } else if (repetirContrasena.value) {
            limpiarError(repetirContrasena);
        }

        if (esValido) {
            alert('Formulario válido! Los datos pueden ser enviados.');
        }
    }

    function limpiarFormulario() {
        form.reset();
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.textContent = '');
        
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => input.classList.remove('error'));
    }

    form.addEventListener('submit', validarFormulario);
    btnCancelar.addEventListener('click', limpiarFormulario);

    const contrasena = document.getElementById('contrasena');
    contrasena.addEventListener('input', function() {
        if (this.value && !validarContrasena(this.value)) {
            mostrarError(this, 'La contraseña debe cumplir con todos los requisitos');
        } else {
            limpiarError(this);
        }
    });
}); 