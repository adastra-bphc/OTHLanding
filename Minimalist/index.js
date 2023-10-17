document.addEventListener("DOMContentLoaded", function() {
    var registerForm = document.querySelector('.register-form');
    var loginForm = document.querySelector('.login-form');
    var registerLink = document.querySelector('.message a');
    var loginLink = document.querySelector('.login-form .message a');

    // Initial setup: show the registration form and hide the login form
    registerForm.style.display = 'block';
    loginForm.style.display = 'none';

    // Add click event listener to the "Already registered?" link on the registration form
    registerLink.addEventListener('click', function(event) {
        event.preventDefault();
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    // Add click event listener to the "Not registered?" link on the login form
    loginLink.addEventListener('click', function(event) {
        event.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });
});
