// // import * as api from './src/api/api.js';
// import { login, register, logout } from './src/api/user.js';

import { initialize } from "./src/router.js";
import { showCatalog } from "./src/views/catalog.js";
import { showCreate } from "./src/views/create.js";
import { showDetails } from "./src/views/details.js";
import { showHome } from "./src/views/home.js";
import { showLogin } from "./src/views/login.js";
import { showRegister } from "./src/views/register.js";

// window.myApi = api;
// window.register = register;
// window.login = login;
// window.logout = logout;

const defSection = document.getElementById("defSection").remove();

const links = {
    "/": showHome,
    "/catalog": showCatalog,
    "/login": showLogin,
    "/register": showRegister,
    "/details": showDetails,
    "/create": showCreate,
}

const router = initialize(links);

router.goTo("/");
