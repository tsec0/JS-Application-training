// import * as api from './data/room.js';
// import * as request from './data/api.js';

// window.api = api;
// window.request = request;

import page from './lib/page.mjs';
import { hasUser, isOwner } from './middlewares/guards.js';

import { addUserNav } from './middlewares/nav.js';
import { addPreloader } from './middlewares/preloader.js';
import { addRender } from './middlewares/render.js';
import { addSession } from './middlewares/session.js';

import { getUserData } from './util.js';

import { catalogView } from './views/catalog.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { logoutAction } from './views/logout.js';
import { navTempalte } from './views/nav.js';
import { registerView } from './views/register.js';

const rootm = document.querySelector('main');
const rooth =  document.querySelector('header');

page(addRender(rootm, rooth));
page(addSession(getUserData));
page(addUserNav(navTempalte));

page('/', homeView);
page('/rooms', catalogView);
page('/rooms/:id', addPreloader('id', 'rooms'), detailsView);
// ({params: { id }, data }) => console.log('details', id, data)
// hasUser() => guard
page('/host', hasUser(), createView);
page('/login', loginView);
// isOwner() => guard
page('/edit/:id', addPreloader('id', 'rooms'), isOwner(), editView);
page('/register', registerView);
page('/logout', logoutAction);

page.start();
