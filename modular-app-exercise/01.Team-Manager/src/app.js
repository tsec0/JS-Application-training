import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";

import { logout } from "./api/data.js";

// viws import
import { homeView } from "./view/homeView.js";
import { createView } from "./view/createView.js";
import { editView } from "./view/editView.js";
import { registerView } from "./view/registerView.js";
import { myTeamView } from "./view/myTeamView.js";
import { browseView } from "./view/browseView.js";
import { loginView } from "./view/loginView.js";
import { teamHomeView } from "./view/teamHomeView.js";

// root element for adding templates
const rootElement = document.getElementsByTagName("main")[0];

page("/", middleWare, homeView);
page("/index.html", middleWare, homeView);
page("/login", middleWare, loginView);
page("/register", middleWare, registerView);
page("/browse", middleWare, browseView);
page("/edit/:id", middleWare, editView);
page("/my-team", middleWare, myTeamView);
page("/team-home", middleWare, teamHomeView);
page("/create", middleWare, createView);

page.start();
updateNav();

function middleWare(context, next){
    context.render = myRender;
    context.updateNav = updateNav;
    next();
}

document.querySelector(".logout").addEventListener("click", async (event) => {
    event.preventDefault();
    await logout();

    updateNav();
    page.redirect("/");
});

function updateNav(){
    const UserData = JSON.parse(sessionStorage.getItem("userData"));
    if(UserData){
        document.querySelectorAll(".user").forEach(x=>x.style.display = "block");
        document.querySelectorAll(".guest").forEach(x=>x.style.display = "none");
    } else {
        document.querySelectorAll(".user").forEach(x=>x.style.display = "none");
        document.querySelectorAll(".guest").forEach(x=>x.style.display = "block");
    }
}

function myRender(content){
    render(content, rootElement);
}
