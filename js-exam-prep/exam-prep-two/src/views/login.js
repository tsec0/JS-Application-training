import { login } from "../api/user.js";
import { html } from "../lib.js";
import { createSubmitHandler } from "../util.js";

// const main = document.querySelector("main");

const loginTemp = (handler) => html`
  <section id="loginPage">
    <form @submit=${handler}>
      <fieldset>
        <legend>Login</legend>

        <label for="email" class="vhide">Email</label>
        <input
          id="email"
          class="email"
          name="email"
          type="text"
          placeholder="Email"
        />

        <label for="password" class="vhide">Password</label>
        <input
          id="password"
          class="password"
          name="password"
          type="password"
          placeholder="Password"
        />

        <button type="submit" class="login">Login</button>

        <p class="field">
          <span>If you don't have profile click <a href="/register">here</a></span>
        </p>
      </fieldset>
    </form>
  </section>
`;

export async function showLogin(context){
    context.render(loginTemp(createSubmitHandler(onLogin)));

    async function onLogin({email, password}){
        if(!email || !password){
            return alert('All fields are required!');
        }
        await login(email, password);
        context.updateNav();
        context.page.redirect('/');
    }
}