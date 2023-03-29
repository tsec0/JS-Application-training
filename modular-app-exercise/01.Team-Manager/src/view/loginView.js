import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/data.js";

let contex = null;

export async function loginView(context) {
  console.log("loginView");
  contex = context;
  context.render(createLoginTemplate());
}

async function onSubmit(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const { email, password } = Object.fromEntries(formData);
    try {
        await login(email, password);
        contex.page.redirect("/");
        contex.updateNav();
    } catch (e) {
        return contex.render(createLoginTemplate(e.message));
    }
}

function createLoginTemplate(msg) {
  return html`
    <section id="login">
      <article class="narrow">
        <header class="pad-med">
          <h1>Login</h1>
        </header>
        <form @submit=${onSubmit} id="login-form" class="main-form pad-large">
          ${msg ? html`<div class="error">${msg}!</div>` : ""}
          <label>E-mail: <input type="text" name="email" /></label>
          <label>Password: <input type="password" name="password" /></label>
          <input class="action cta" type="submit" value="Sign In" />
        </form>
        <footer class="pad-small">
          Don't have an account? <a href="#" class="invert">Sign up here</a>
        </footer>
      </article>
    </section>
  `;
}
