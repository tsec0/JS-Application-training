import { register } from '../data/auth.js';
import { html } from '../lib.js';
import { createSubmitHandler } from '../util.js';

const registerTemplate = (onRegister) => html`
<h2>Register</h2>
<form @submit=${onRegister}>
    <label>Email: <input type="text" name="email"></label>
    <label>Username: <input type="text" name="username"></label>
    <label>Password: <input type="password" name="password"></label>
    <label>Re-Type Password: <input type="password" name="repass"></label>

    <button>Register</button>
</form>`;

export function showRegister(context){
    context.render(registerTemplate(createSubmitHandler(onRegister)));

    async function onRegister({ email, username, password, repass }){
        if(email == '' || username == '' || password == ''){
            return alert('All fields are required!');
        }
        if(password != repass){
            return alert('Passwords do not match!');
        }

        await register(email, username, password, repass);

        context.page.redirect('/recipes');
    }
}
