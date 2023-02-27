import { post } from "./api.js";
import { createSubmitHandler, setUserData } from "./util.js";

createSubmitHandler('register-form', onRegister);

const section = document.getElementById('register-view');
section.remove();

let context = null;

export function showRegisterView(inContext) {
    context = inContext;
    context.render(section);
}

async function onRegister({ email, username, password, repass }) {
    if (password != repass) {
        return alert("Passwords don\'t match!");
    }
    
    const userData = await post('/users/register', { email, username, password });

    setUserData(userData);

    context.checkUserNav();
    context.goto('catalog-link');
}
