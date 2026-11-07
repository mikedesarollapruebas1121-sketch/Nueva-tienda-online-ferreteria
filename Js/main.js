document.addEventListener('DOMContentLoaded', function () {

    // 1. Lógica para el Login
    const formLogin = document.getElementById('formLogin');
    if (formLogin) {
        formLogin.addEventListener('submit', function(e) {
            e.preventDefault();
            window.location.href = 'dashboard.html';
        });
    }
});

