function checkLoginStatus() {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
        window.location.href = 'sign-in.html';
    }
}

document.addEventListener("DOMContentLoaded", checkLoginStatus);
