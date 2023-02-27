// register event listeners
// switch view
// handle form submit
// send login info to REST service
// store auth token

import { post } from "./api.js";
import { createSubmitHandler, setUserData } from "./util.js";

createSubmitHandler('login-form', onLogin);

const section = document.getElementById('login-view');
section.remove();

let context = null;

export function showLoginView(inContext) {
    context = inContext;
    context.render(section);
}

async function onLogin({ email, password }) {
    const userData = await post('/users/login', { email, password });
    setUserData(userData);
    
    context.checkUserNav();
    context.goto('catalog-link');
}