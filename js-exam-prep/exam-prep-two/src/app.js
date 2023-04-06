// import * as api from './api/user.js';
// window.api = api;

import { page, render } from './lib.js';
import { getUserData } from './util.js';
import { showCatalog } from './views/catalog.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { updateNav } from './views/nav.js';
import { showRegister } from './views/register.js';
import { showSearch } from './views/search.js';


// should be updated
const main = document.getElementById('main-content');

// middleware
page(decorateContext);

// page routing should be updated
page('/', showHome);
page('/home', showHome);
page('/create', showCreate);
page('/catalog', showCatalog);
page('/login', showLogin);
page('/register', showRegister);
page('/details/:id', showDetails);
page('/edit/:id', showEdit);
page('/search', showSearch);

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
