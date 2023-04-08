import { html, render, page } from "../lib.js";
import { getUserData } from "../util.js";
import { logout } from "../api/user.js";

// this hould be updateted and rewritten
const nav = document.querySelector('');

const navTemplate = (hasUser) => html``;

export function updateNav() {
    const user = getUserData();

    render(navTemplate(user), nav);
}


function onLogout(){
    logout();
    updateNav();
    page.redirect('/');
}
