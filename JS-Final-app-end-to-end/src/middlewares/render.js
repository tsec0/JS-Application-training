import { render } from '../lib/lit-html.js';

export function addRender(main) {
    return function(context, next){
        context.render = renderMain;
        
        next();
    };

    function renderMain(content){
        render(content, main);
    }    

}
