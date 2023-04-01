// import * as api from './data/room.js';
// import * as request from './data/api.js';

// window.api = api;
// window.request = request;

import page from './lib/page.mjs';

import { addUserNav } from './middlewares/nav.js';
import { addRender } from './middlewares/render.js';
import { addSession } from './middlewares/session.js';

import { getUserData } from './util.js';

import { catalogView } from './views/catalog.js';
import { createView } from './views/create.js';
import { loginView } from './views/login.js';
import { navTempalte } from './views/nav.js';
import { registerView } from './views/register.js';

const rootm = document.querySelector('main');
const rooth =  document.querySelector('header');

page(addRender(rootm, rooth));
page(addSession(getUserData));
page(addUserNav(navTempalte));

page('/', '/create');
page('/rooms', catalogView);
page('/rooms/:id', ({params: { id } }) => console.log('details', id));
page('/create', createView);
page('/login', loginView);
page('/register', registerView);

page.start();
