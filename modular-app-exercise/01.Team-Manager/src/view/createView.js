import { html } from "../../node_modules/lit-html/lit-html.js";
import { createTeam, requestMember } from "../api/data.js";

let contex = null;
export async function createView(context) {
    console.log("createView");
    contex = context;
    context.render(createTeamTemp());
}

async function onSubmit(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const {name, logoUrl, description} = Object.fromEntries(formData);

    const response = await createTeam(name, logoUrl, description);
    const addMember = await requestMember(response._id);

    contex.page.redirect(`/details/${response._id}`);
}

function createTeamTemp() {
  return html`
    <section id="create">
      <article class="narrow">
        <header class="pad-med">
          <h1>New Team</h1>
        </header>
        <form @submit=${onSubmit} id="create-form" class="main-form pad-large">
          <div class="error">Error message.</div>
          <label>Team name: <input type="text" name="name" /></label>
          <label>Logo URL: <input type="text" name="logoUrl" /></label>
          <label>Description: <textarea name="description"></textarea></label>
          <input class="action cta" type="submit" value="Create Team" />
        </form>
      </article>
    </section>
  `;
}
