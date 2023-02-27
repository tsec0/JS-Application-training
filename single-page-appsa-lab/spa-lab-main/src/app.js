import { checkUserNav, onLogout } from "./auth.js";
import { showHomeView } from "./home.js";
import { showCatalogView } from "./catalog.js";
import { showLoginView } from "./login.js";
import { showRegisterView } from "./register.js";
import { showCreateView } from "./create.js";
import { showDetailsView } from "./details.js";
import './details.js' // load the file

document.querySelector('nav').addEventListener('click', onNavigate);

const views = {
    'home-link': showHomeView,
    'catalog-link': showCatalogView,
    'login-link': showLoginView,
    'register-link': showRegisterView,
    'logout-link': onLogout,
    'create-link': showCreateView,
    'details-link': showDetailsView,
};

checkUserNav();

// Start apps in  home view
goto('home-link')

function onNavigate(event){
    if (event.target.tagName == 'A'){
        const id = event.target.id;
        if(goto(id)){
            event.preventDefault();
        }
    }
}

function goto(viewName, ...params) {
    const view = views[viewName];
    if(typeof view == 'function'){
        // document.querySelector('main').replaceChildren();
        const context = { // recursion
            goto, 
            checkUserNav,
            render,
         }
        view(context, ...params);
        return true;
    }
    return false;
}

function render(section){
    document.querySelector('main').replaceChildren(section);
}
