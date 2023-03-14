import { html } from "../../node_modules/lit-html/lit-html.js";

const catalogTemplate = () => html`
    <h2>Catalog</h2><li><a href="/catalog/asdf123">Product123</li></ul>
`;

export function showCatalog(context, next) {
  context.render(catalogTemplate());
}
