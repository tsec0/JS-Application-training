import { post } from "./api.js";
import { createSubmitHandler } from "./util.js";

createSubmitHandler('create-form', onCreate);

const section = document.getElementById('create-view');
section.remove();

let context = null;

export function showCreateView(inContext){
    context = inContext;
    context.render(section);
}

async function onCreate({name, img, ingredients, steps}){
    ingredients = ingredients.split("\n");
    steps = steps.split('\n');

    await post('/data/recipes', {name, img, ingredients, steps});

    context.goto('catalog-link');
}