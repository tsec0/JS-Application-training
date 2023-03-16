import { html } from "../../node_modules/lit-html/lit-html.js"

export async function catalogView(context){
    //debugger
    const test = html`<p>Hello</p>`;
    context.render(test);
    console.log("CatalogView");
}
