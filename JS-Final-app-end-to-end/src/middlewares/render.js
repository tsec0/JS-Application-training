import { render } from '../lib/lit-html.js';

export function addRender(main, nav) {
    return function(context, next){
        context.render = renderMain;
        context.renderNav = renderNav;

        next();
    };

    function renderMain(content){
        render(content, main);
    }

    function renderNav(content){
        render(content, nav);
    }

}
