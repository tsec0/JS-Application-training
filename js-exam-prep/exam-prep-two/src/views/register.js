import { register } from "../api/user.js";
import { html } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const registerTemplate = (handler) => html`
  <section id="registerPage">
    <form @submit=${handler}>
      <fieldset>
        <legend>Register</legend>

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

        <label for="conf-pass" class="vhide">Confirm Password:</label>
        <input
          id="conf-pass"
          class="conf-pass"
          name="conf-pass"
          type="password"
          placeholder="Confirm Password"
        />

        <button type="submit" class="register">Register</button>

        <p class="field">
          <span>If you already have profile click <a href="/login">here</a></span>
        </p>
      </fieldset>
    </form>
  </section>
`;

export async function showRegister(context){
    context.render(registerTemplate(createSubmitHandler(onRegister)))

    async function onRegister(data){
        if(!data.email || !data.password || !data["conf-pass"]){
            return alert("All fields are required!");
        }
        if(data.password !== data["conf-pass"]){
            return alert("Passwords don\'t match!");
        }

        await register(data.email, data.password);
        context.updateNav();
        context.page.redirect('/');
    }
}
