// Función para mostrar/ocultar la contraseña
function mostrarOcultar(boton, input) {
    const esContraseña = input.getAttribute('type') === 'password';
    input.setAttribute('type', esContraseña ? 'text' : 'password');
    boton.textContent = esContraseña ? 'Ocultar' : 'Mostrar';
}

// Mostrar/Ocultar contraseña en el formulario de login
const btnLogin = document.getElementById('togglePassword'); // Cambia el ID si deseas consistencia
if (btnLogin) {
    btnLogin.addEventListener('click', function() {
        const inputPass = document.getElementById('password');
        mostrarOcultar(btnLogin, inputPass);
    });
}

// Mostrar/Ocultar contraseña en el formulario de registro
const btnRegs = document.querySelectorAll('.mostrarContrasena');
btnRegs.forEach((btn) => {
    btn.addEventListener('click', function() {
        const input = document.querySelector(btn.getAttribute('data-toggle'));
        mostrarOcultar(btn, input);
    });
});

// Función para mostrar un mensaje de error
function mostrarError(elemento, mensaje) {
    elemento.textContent = mensaje;
    elemento.style.visibility = 'visible';
}

// Función para limpiar el mensaje de error
function limpiarError(elemento) {
    elemento.textContent = '';
    elemento.style.visibility = 'hidden';
}

// Función para gestionar el registro
function register(pass, passConf, mail, nom, fNac) {
    const errorElem = document.getElementById('registerError');
    limpiarError(errorElem);

    if (pass !== passConf) {
        mostrarError(errorElem, 'Las contraseñas no coinciden.');
        return;
    }

    if (!fNac) {
        mostrarError(errorElem, 'Por favor, selecciona una fecha de nacimiento válida.');
        return;
    }

    if (localStorage.getItem('mailReg') === mail) {
        mostrarError(errorElem, 'Ya existe una cuenta con este correo.');
    } else {
        localStorage.setItem('mailReg', mail);
        localStorage.setItem('passReg', pass);
        localStorage.setItem('nomReg', nom);
        localStorage.setItem('fNacReg', fNac);

        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        window.location.href = 'index.html';
    }
}

const frmRegistro = document.getElementById('registrationForm');
if (frmRegistro) {
    frmRegistro.addEventListener('submit', function(e) {
        e.preventDefault();

        const pass = document.getElementById('password').value;
        const passConf = document.getElementById('confirmPassword').value;
        const mail = document.getElementById('email').value;
        const nom = document.getElementById('name').value;
        const fNac = document.getElementById('birthDate').value;

        register(pass, passConf, mail, nom, fNac);
    });
}

// Función para gestionar el login
function login(mail, pass, mailReg, passReg) {
    const errorElem = document.getElementById('loginError');
    limpiarError(errorElem);

    if (mail === mailReg && pass === passReg) {
        window.location.href = 'https://adriannbdzz.github.io/MaquetacionBasica-css/';
    } else {
        mostrarError(errorElem, 'Correo o contraseña incorrectos.');
    }
}

const frmLogin = document.getElementById('loginForm');
if (frmLogin) {
    frmLogin.addEventListener('submit', function(e) {
        e.preventDefault();

        const mail = document.getElementById('email').value;
        const pass = document.getElementById('password').value;
        const mailReg = localStorage.getItem('mailReg');
        const passReg = localStorage.getItem('passReg');

        login(mail, pass, mailReg, passReg);
    });
}
