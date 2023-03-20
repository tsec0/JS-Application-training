import { page } from "./lib.js";
import { nothing, render, html } from "../node_modules/lit-html/lit-html.js";

import { showAbout } from "./views/about.js";
import { showCatalog } from "./views/catalog.js";
import { showContact } from "./views/contact.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showHome } from "./views/home.js";
import { notFound } from "./views/notfound.js";
import { showLogin } from "./views/login.js";
import { getUserData } from "./util.js";
import { showRegister } from "./views/register.js";

// next handler -> page guard -> middleware
//              -> preloader
// render -> middleware

const navTemplate = (user) => html`
  <a href="/">Home</a>
  <a href="/recipes">Catalog</a>
  ${user ? html`<a href="/create">Create</a>` : nothing}
  <a href="/about">About</a>
  ${ user ? html`<span>Welcome, ${user.username}</span> <a href="/logout">Logout</a>` : 
  html`
    <a href="/login">Login</a>
    <a href="/register">Register</a>
  `}
`;

function decorateContext(context, next) {
  render(navTemplate(context.user), document.querySelector('nav'));
  // if(context.user){

  // }

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

function session(context, next){
  const user = getUserData();

  if(user){
    context.user = user;
  }

  next();

}

page(session); 
//MiddleWare
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
page('/login', showLogin);
page('/register', showRegister);
// page('/logout', showLogout);
page('*', notFound);

page.start();
