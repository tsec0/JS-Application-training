// // import * as api from './src/api/api.js';
// import { login, register, logout } from './src/api/user.js';

// // window.myApi = api;
// window.register = register;
// window.login = login;
// window.logout = logout;

const main = document.getElementById("main");


const homeView = document.getElementById("homeView");
const registerView = document.getElementById("registerView");
const loginView = document.getElementById("loginView");
const detailsView = document.getElementById("detailsView");
const createView = document.getElementById("createView");
const dashboard = document.getElementById("dashboard-holder");

const defSection = document.getElementById("defSection").remove();

const links = {
    "/": homeView,
    "/catalog": dashboard,
    "/login": loginView,
    "/register": registerView,
    "/details": detailsView,
    "/create": createView,
}

function showSection(section){
    main.replaceChildren(section);
}


