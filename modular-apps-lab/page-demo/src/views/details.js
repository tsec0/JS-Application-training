import { html, until, nothing } from "../lib.js"; // until(template1, template2, template3, ..., )
import { getById } from "../data/recipes.js";
import { getLikesByRecipeId, likeRecipe } from "../data/likes.js";

const asyncTemplate = (recipePromise) => html`
    ${until(recipePromise, recipeSkeleton())}`;

const detailsTemplate = (recipe, likes, canLike, onLike) => html`
    <h2>${recipe.name}</h2>
    <div>
    ${canLike ? html`<a href="javascript:void(0)" @click=${onLike}>Like</a>`: nothing}
    ${likes} like${likes == 1 ? '' : 's'}
    </div>
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

export function showDetails(context){
    const id = context.params.id;
    const user = context.user;
    let userId;
    if(user){
        userId = user._id;
    }

    context.render(asyncTemplate(loadRecipe(id, userId, onLike)));

    async function onLike(){
        await likeRecipe(id);
        context.page.redirect('/recipes/' + id);
    }
}

async function loadRecipe(id, userId, onLike){
    const {likes, canLike} = await getLikesByRecipeId(id, userId);

    const recipe = await getById(id);
    const isOwner = recipe._ownerId == userId;

    return detailsTemplate(recipe, likes, canLike && !isOwner, onLike);
}
