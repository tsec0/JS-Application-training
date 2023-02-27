import { get } from "./api.js";
import { clearUserData } from "./util.js";

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

export function onLogout(context) {
    get('/users/logout');
    clearUserData();
    context.checkUserNav();
    context.goto('catalog-link');
}