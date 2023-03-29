import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";

// viws import
import { homeView } from "./view/homeView.js";
import { createView } from "./view/createView.js";
import { editView } from "./view/editView.js";
import { registerView } from "./view/registerView.js";
import { myTeamView } from "./view/myTeamView.js";
import { browseView } from "./view/browseView.js";
import { loginView } from "./view/loginView.js";
import { teamHomeView } from "./view/teamHomeView.js";

page("/", homeView);
page("/index.html", homeView);
page("/login", loginView);
page("/register", registerView);
page("/browse", browseView);
page("/edit/:id", editView);
page("/my-team", myTeamView);
page("/team-home", teamHomeView);
page("/create", createView);

page.start();
