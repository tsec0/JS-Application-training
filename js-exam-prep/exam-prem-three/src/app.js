// import * as api from './api/user.js';
// window.api = api;

// Imports should be updated
import { page, render } from './lib.js';
import { getUserData } from './util.js';
import { showCreate } from './views/create.js';
import { showDashboard } from './views/dashboard.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { updateNav } from './views/nav.js';
import { showRegister } from './views/register.js';

// should be updated
const main = document.querySelector('main');

// decorator content
page(decorateContext);

//page routing should be updated
page('/', showHome);
page('/home', showHome);
page('/login', showLogin);
page('/register', showRegister);
page('/dashboard', showDashboard);
page('/create', showCreate);
page('/details/:id', showDetails);
page('/edit/:id', showEdit);

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
