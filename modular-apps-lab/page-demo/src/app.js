import { page } from "./lib.js";
import { render } from "../node_modules/lit-html/lit-html.js";

import { showAbout } from "./views/about.js";
import { showCatalog } from "./views/catalog.js";
import { showContact } from "./views/contact.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showHome } from "./views/home.js";
import { notFound } from "./views/notfound.js";

// next handler -> page guard -> middleware
//              -> preloader
// render -> middleware
function decorateContext(context, next) {
  context.render = function (content) {
    render(content, document.querySelector("main"));
  };
  next();
}

function parseQuery(context, next) {
  context.query = {};
  // console.log(Object.fromEntries(context.querystring.split("&").map(element => element.split("="))));
  if(context.querystring) {
    const query = Object.fromEntries(context.querystring.split('&').map(element => element.split('=')));
    Object.assign(context.query, query);
  }
  next();
}

page(decorateContext); // always compiles
page(parseQuery); // always compiles
page('/index.html', '/');
// page('/');

// page('/', firstHandler, secondHandler, showHome); // Dependancy injextion - no spagetti; View Handler
page('/', showHome);
page('/contact', showContact);
page('/recipes', showCatalog);
page('/create', showCreate);
page('/recipes/:id', showDetails); // /catalog/....
page('/about', showAbout);
page('*', notFound);

page.start();
