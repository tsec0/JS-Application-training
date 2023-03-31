// test code
import page from './lib/page.mjs';
import { render, html } from './lib/lit-html.js';
import { until } from './lib/directives/until.js';

const strings = {
    BG: {
        greeting: 'Здравей!'
    },
    EN: {
        greeting: 'Hello there!'
    }
}

const locale = 'EN';
const homeTemplate = (strings) => html
    `<h1>${strings[locale].greeting}</h1>`;


async function delayed(){
    await new Promise(r => setTimeout(r, 500));
    return homeTemplate(strings);
}

function home(){
    render(until(delayed(), html`<p>Loading...</p>`), document.body);
}

page('/', home);
page.start();
