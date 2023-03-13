import page from '../node_modules/page/page.mjs';
import { showAbout } from './views/about.js';
import { showCatalog } from './views/catalog.js';
import { showContact } from './views/contact.js';
import { showHome } from './views/home.js';
import { notFound } from './views/notfound.js';

page('/index.html', '/');

page('/', showHome);

page('/catalog', showCatalog);

page('/about', showAbout);

page('/contact', showContact);

page('*', notFound);

page.start();
