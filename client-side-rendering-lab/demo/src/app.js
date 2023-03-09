import { render } from "./template.js";

const username = 'Peter<script>alert("hacked!")</script>';

const items = [
    'Product 1',
    'Product 2',
    'Product 3',
];

const ctx = {
    username,
    item1: await render('item', { name: 'Product 1' }),
    item2: await render('item', { name: 'Product 2' }),
    item3: await render('item', { name: 'Product 3' }),
}

const views = {
    'home-link': 'home',
    'catalog-link' : 'catalog',
    'about-link' : 'about',
}

document.querySelector('nav').addEventListener('click', async (event) => {
    if(event.target.tagName == 'A'){
        const view = views[event.target.id];
        if (view !== undefined){
            document.querySelector('main').innerHTML = await render(view, ctx); // the view is the identifier
        }                                                                       // it safe because od await !
    }
});
