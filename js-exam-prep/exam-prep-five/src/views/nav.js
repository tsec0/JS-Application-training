import { html, render, page } from "../lib.js";
import { getUserData } from "../util.js";
import { logout } from "../api/user.js";

// this hould be updateted and rewritten
const nav = document.querySelector("nav"); // dont forgetr to set that property

const navTemplate = (hasUser) => html`
  <div>
    <a href="/catalog">Events</a>
  </div>

  ${hasUser
    ? html`<div class="user">
        <a href="/create">Add Event</a>
        <a @click=${onLogout} href="javascript:void(0)">Logout</a>
      </div>`
    : html`<div class="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>`}
`;

export function updateNav() {
  const user = getUserData();

  render(navTemplate(user), nav);
}

function onLogout() {
  logout();
  updateNav();
  page.redirect("/");
}
