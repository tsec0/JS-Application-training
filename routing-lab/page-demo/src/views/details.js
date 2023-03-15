import { html, until } from "../lib.js"; // until(template1, template2, template3, ..., )
import { getById } from "../data/recipes.js";

const asyncTemplate = (recipePromise) => html`
    ${until(recipePromise, recipeSkeleton())}
`;

const detailsTemplate = (recipe) => html`
    <h2>${recipe.name}</h2>
    <img src=${'/' + recipe.img}>
    <h3>Ingredients</h3>
    <ul>
        ${recipe.ingredients.map(i => html`<li>${i}</li>`)}
    </ul>
    <h3>Prepararion steps</h3>
    <ul>
        ${recipe.steps.map(s=> html`<li>${s}</li>`)}
    </ul>
`;

const recipeSkeleton = () => html`
<h2>'Recipe Details'</h2>
<h3>Ingredients</h3>
<ul>
    Loading &hellip;
</ul>
<h3>Prepararion steps</h3>
<ul>
    Loading &hellip;
</ul>
`;

export function showDetails(context, next){
    const id = context.params.id;
    context.render(asyncTemplate(loadRecipe(id)));
}

async function loadRecipe(id){
    const recipe = await getById(id);
    return detailsTemplate(recipe);
}
