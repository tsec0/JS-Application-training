import { get } from "./api.js";
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

export function onLogout() {
    get('/users/logout');

    checkUserNav();
    showCatalogView();
}