// import * as api from './api/user.js';
// window.api = api;

// Imports should be updated
import { page, render } from './lib.js';
import { getUserData } from './util.js';
import { updateNav } from './views/nav.js';


// should be updated
const main = document.getElementById('');

// page routing should be updated
page(decorateContext);


updateNav();
page.start();

function decorateContext(context, next){
    context.render = renderMain;
    context.updateNav = updateNav;

    const user = getUserData();
    if(user){
        context.user = user;
    }

    next();
}

function renderMain(content){
    render(content, main);
}
