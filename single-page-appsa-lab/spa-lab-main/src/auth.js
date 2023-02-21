import { showCatalogView } from "./catalog.js";

export function checkUserNav() {
    const username = sessionStorage.getItem('username');
    if (username) {
        [...document.querySelectorAll('.guest')].forEach(item => item.style.display = 'none');
        [...document.querySelectorAll('.user')].forEach(item => item.style.display = 'inline');
        document.getElementById('welcome-msg').textContent = `Welcome ${username}!`;
    } else {
        [...document.querySelectorAll('.guest')].forEach(item => item.style.display = 'inline');
        [...document.querySelectorAll('.user')].forEach(item => item.style.display = 'none');
    }
}

document.getElementById('logout-link').addEventListener('click', onLogout);

async function onLogout(event) {
    event.preventDefault();

    const token = sessionStorage.getItem('accessToken');

    const url_logout = 'http://localhost:3030/users/logout';

    const request_logout = {
        method: 'get',
        headers: {
            'X-Authorization': token,
        },
    }

    try {
        const response = await fetch(url_logout, request_logout);

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

    } catch (error) {

        alert(error.message);

    } finally {
        sessionStorage.removeItem('userID');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('accessToken');
        checkUserNav();
        showCatalogView();
    }
}