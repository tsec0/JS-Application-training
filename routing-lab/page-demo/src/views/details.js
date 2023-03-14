import { html } from "../../node_modules/lit-html/lit-html.js";

const detailsTemplate = () => html`
    <h2>Product Details Page</h2>
`;

export function showDetails(context, next){
    context.render(detailsTemplate());
}