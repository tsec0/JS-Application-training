// // import * as api from './src/api/api.js';
// import { login, register, logout } from './src/api/user.js';
import { showCatalog } from "./src/views/catalog.js";
import { showCreate } from "./src/views/create.js";
import { showDetails } from "./src/views/details.js";
import { showHome } from "./src/views/home.js";
import { showLogin } from "./src/views/login.js";
import { showRegister } from "./src/views/register.js";

// // window.myApi = api;
// window.register = register;
// window.login = login;
// window.logout = logout;

const main = document.getElementById("mainView");

// const registerView = document.getElementById("registerView");
// const loginView = document.getElementById("loginView");
// const detailsView = document.getElementById("detailsView");
// const createView = document.getElementById("createView");
// const dashboard = document.getElementById("dashboard-holder");

const defSection = document.getElementById("defSection").remove();

const links = {
    "/": showHome,
    "/catalog": showCatalog,
    "/login": showLogin,
    "/register": showRegister,
    "/details": showDetails,
    "/create": showCreate,
}

const context = {
    showSection,
}

// window.showHome = showHome;
// window.context = context;

window.test = function test (){
    showHome(context);
    // debugger
}

function showSection(section){
    main.replaceChildren(section);
}
