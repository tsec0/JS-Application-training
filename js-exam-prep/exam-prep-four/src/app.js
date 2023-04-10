// Imports should be updated
import { page, render } from './lib.js';
import { getUserData } from './util.js';
import { showCatalog } from './views/catalog.js';
import { showCreate } from './views/create.js';
import { showDashboard } from './views/dashboard.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showLogin } from './views/login.js';
import { updateNav } from './views/nav.js';
import { showRegister } from './views/register.js';


// should be updated
const main = document.getElementById('site-content');

// decorator
page(decorateContext);

// page routing should be updated
page('/', showDashboard);
page('/dashboard', showDashboard);
page('/login', showLogin);
page('/register', showRegister);
page('/create', showCreate);
page('/details/:id', showDetails);
page('/edit/:id', showEdit);
page('/catalog/:id', showCatalog);

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
