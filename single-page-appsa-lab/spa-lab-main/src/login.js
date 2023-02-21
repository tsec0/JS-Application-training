// register event listeners
// switch view
// handle form submit
// send login info to REST service
// store auth token

import { checkUserNav } from "./auth.js";
import { showCatalogView } from "./catalog.js";

document.getElementById('login-link').addEventListener('click', showLoginView);
document.getElementById('login-form').addEventListener('submit', onLogin);

export function showLoginView() {
    [...document.querySelectorAll('section')].forEach(
        sec => sec.style.display = 'none'
    );
    document.getElementById('login-view').style.display = 'block';
}

async function onLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { email, password } = Object.fromEntries(formData);

    try {
        await login(email, password);
        showCatalogView();
        checkUserNav();
    } catch (error) {
        alert(error.message);
    }
}

async function login(email, password) {
    const url_login = 'http://localhost:3030/users/login';
    const request_login = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    };


    const response = await fetch(url_login, request_login);
    if (response.ok == false) {
        const error = await response.json();
        throw new Error(error.message);
    }

    const data = await response.json();
    sessionStorage.setItem('userID', data._id);
    sessionStorage.setItem('username', data.username);
    sessionStorage.setItem('accessToken', data.accessToken);
}