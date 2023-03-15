import { page } from './lib.js'
import { render } from '../node_modules/lit-html/lit-html.js';

import { showAbout } from './views/about.js';
import { showCatalog } from './views/catalog.js';
import { showContact } from './views/contact.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
import { showHome } from './views/home.js';
import { notFound } from './views/notfound.js';

// next handler -> page guard -> middleware
//              -> preloader
function decorateContext(context, next){
    // context.myVar = 'This an example of Context!';
    // context.render = function(content){
    //     document.querySelector('main').innerHTML = content;
    // }
    context.render = function(content){
        render(content, document.querySelector('main'));
    }
    next();
}

// next handler -> page guard -> middleware
// function secondHandler(context, next){
//     console.log('second handler');
//     next();
// }

page(decorateContext); // always compiles 

page('/index.html', '/');

// page('/', firstHandler, secondHandler, showHome); // Dependancy injextion - no spagetti; View Handler
page('/', showHome);
page('/contact', showContact);
page('/recipes', showCatalog);
page('/create', showCreate);
page('/recipes/:id', showDetails); // /catalog/....
page('/about', showAbout);
page('*', notFound);

page.start();
