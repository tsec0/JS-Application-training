import { register } from '../data/user.js';
import { html } from '../lib/lit-html.js';
import { submitHandler } from '../util.js';

const registerTemplate = (onSubmit) => html`
    <h2>Login</h2>
    <form @submit=${onSubmit}>
        <label> Email <input type="text" name="email"></label>
        <label> Username <input type="text" name="username"></label>
        <label> Password <input type="password" name="password"></label>
        <label> Repeat-Password <input type="password" name="repass"></label>
        <button>Register</button>
    </form>
`;

export function registerView(context){
    context.render(registerTemplate(submitHandler(onRegister)));
    
    async function onRegister({email, username, password, repass}){
        if(email == '' || username == '' || password == '' || repass == ''){
            return alert('All fields are required!')
        }

        if (password != repass){
            return alert('Passwords don\'t match!');
        }

        await register(email, username, password);
        context.page.redirect('/rooms');
    }
}
