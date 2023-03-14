import { html } from "../../node_modules/lit-html/lit-html.js";

const detailsTemplate = (context) => html`
    <h2>Home Page</h2>\
    <button>Click ME</button>
    <h2>Important message:</h2
    ><p>${context.myVar}</p>
    `;

export function showHome(context, next){
   context.render(detailsTemplate(context));
    document.querySelector('button').addEventListener('click', () => {
        context.page.redirect('/contact'); // redirecting
    });
}