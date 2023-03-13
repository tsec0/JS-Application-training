// detect URL changes and notify application
// change URL on application content swap

const views = {
    '/':() => '<h2>Home Page</h2>',
    '/catalog':() => '<h2>Catalog</h2>',
    '/about':() => '<h2>About Page</h2>',
}

const main = document.querySelector('main');
document.querySelector('nav').addEventListener('click', onNavigate);
window.addEventListener('popstate', onPopState);

// Start Application in home view;
onPopState();

function onNavigate(event){
    if (event.target.tagName == 'A') {
        const url = new URL(event.target.href);
        const view = views[url.pathname];
        if(showView(url.pathname)){
            event.preventDefault();
            showView(view); // main.innerHTML = view();
            history.pushState(null, '', url.pathname); // for history
        }
    }
}

function onPopState(){
    const startView = window.location.pathname;
    showView(startView);
}

function showView(name){
    const view = views[name];
    if(typeof view == 'function'){
        main.innerHTML = view();
        return true;
    } else {
        return false;
    }
}
