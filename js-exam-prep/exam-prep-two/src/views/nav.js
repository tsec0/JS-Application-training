import { html, render, page } from "../lib.js";
import { getUserData } from "../util.js";
import { logout } from "../api/user.js";

// this hould be updateted and rewritten
const nav = document.querySelector("nav");

const navTemplate = (user) => html` <img src="./images/headphones.png" />
  <a href="/">Home</a>
  <ul>
    <li><a href="/catalog">Catalog</a></li>
    <li><a href="/search">Search</a></li>
    ${user
      ? html`
          <li><a href="/create">Create Album</a></li>
          <li><a @click=${onLogout} href="javascript:void(0)">Logout</a></li>
        `
      : html`
          <li><a href="/login">Login</a></li>
          <li><a href="/register">Register</a></li>
        `}
  </ul>`;

export function updateNav() {
  const user = getUserData();

  render(navTemplate(user), nav);
}

function onLogout() {
  logout();
  updateNav();
  page.redirect("/");
}
