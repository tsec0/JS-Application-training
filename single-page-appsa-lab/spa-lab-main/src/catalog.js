// 1. get data from REST service
// 2. parse and display each recipe

import { get } from "./api.js";
import { showDetailsView } from "./details.js";

document.getElementById('recipe-list').addEventListener('click', openRecipe);
const section = document.getElementById('catalog-view');
section.remove();

export async function showCatalogView(){

    const recipes = await getAllRecipes();

    document.querySelector('main').appendChild(section);

    displayRecipes(recipes);
}

async function getAllRecipes(){
    const recipes = await get('/data/recipes?select=' + encodeURIComponent('_id,name'));
    return recipes;
}

function displayRecipes(recipes){
    const cards = recipes.map(createRecipeCard);

    const fragment = document.createDocumentFragment();
    for(let item of cards){
        fragment.appendChild(item);
    }

    const list = document.getElementById('recipe-list');
    list.replaceChildren(fragment);
}

function createRecipeCard(recipe){
    const element = document.createElement('li');
    element.textContent = recipe.name;
    
    const link = document.createElement('a');
    link.href = 'javascript:void(0)';
    link.text = ' [Details]';
    link.id = recipe._id;
    element.appendChild(link);

    return element;
}

function openRecipe(event){
    if(event.target.tagName == 'A'){
        event.preventDefault();
        const id = event.target.id;
        console.log(id);
        showDetailsView(id);
    }
}
