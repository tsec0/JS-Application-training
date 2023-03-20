import { login } from '../data/auth.js';
import { html } from '../lib.js';
import { createSubmitHandler } from '../util.js';

const loginTemplate = (onLogin) => html`
<h2>Login</h2>
<form @submit=${onLogin}>
    <label>Email: <input type="text" name="email"></label>
    <label>Password: <input type="password" name="password"></label>
    
    <button>Login</button>
</form>`;

export function showLogin(context){
    context.render(loginTemplate(createSubmitHandler(onLogin)));

    async function onLogin({ email, password }){
        // console.log(email, password);
        await login(email, password);

        context.page.redirect('/recipes');
    }
}
