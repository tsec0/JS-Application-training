import { html } from "../../node_modules/lit-html/lit-html.js";

const contactTemplate = () => html`
    <h2>Contact Page</h2>
`;

export function showContact(context, next){
    context.render(contactTemplate());
}
