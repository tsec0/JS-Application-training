import page from '../node_modules/page/page.mjs';

const views = {
    'homePage': () => console.log('<h2>Home Page</h2>'),
    'catalogPage': () => console.log('<h2>Catalog Page</h2>'),
    'aboutPage': () => console.log('<h2>About Page</h2>'),
}

page('/index.html', '/');

page('/', views['homePage']);

page('/catalog', views['catalogPage']);

page('/about', views['aboutPage']);

page.start();
