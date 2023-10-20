document.addEventListener("DOMContentLoaded", function() {
    var registerForm = document.querySelector('.register-form');
    var loginForm = document.querySelector('.login-form');
    var forgotpassword = document.querySelector('.forgot-password');
    var loginLink = document.querySelector('.message a');
    var registerLink = document.querySelector('.login-form .message a');
    var forgotLink = document.querySelector('#forgot-password');
    var rememberLink = document.querySelector('.forgot-password .message a');

    registerForm.style.display = 'block';
    loginForm.style.display = 'none';
    forgotpassword.style.display = 'none';

    loginLink.addEventListener('click', function(event) {
        event.preventDefault();
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
        forgotpassword.style.display = 'none';
    });

    registerLink.addEventListener('click', function(event) {
        event.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        forgotpassword.style.display = 'none';
    });
    forgotLink.addEventListener('click', function(event) {
        event.preventDefault();
        registerForm.style.display = 'none';
        loginForm.style.display = 'none';
        forgotpassword.style.display = 'block';
    });
    rememberLink.addEventListener('click', function(event) {
        event.preventDefault();
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        forgotpassword.style.display = 'none';
    });
});
