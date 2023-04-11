// Imports should be updated
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


// should be updated
const main = document.querySelector('main'); // dont forget that!

// page routing should be updated
page(decorateContext);

// routs should be added
page('index.html', '/');
page('/', showHome);
page('/login', showLogin);
page('/register', showRegister);
page('/catalog', showCatalog);
page('/create', showCreate);
page('/catalog/:id', showDetails);
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
