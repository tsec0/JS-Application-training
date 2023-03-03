// for nav perposes
export function initialize (links){
    const main = document.getElementById("mainView");
    document.querySelector("nav").addEventListener("click", onNavigate);

    const context = {
        showSection,
        goTo,
    }
    return context;

    function showSection(section){
        main.replaceChildren(section);
    }

    function onNavigate(event){
        event.preventDefault();
        let target = event.target;
        if(target.tagName == "IMG"){
            target = target.parentElement;
        }
        if(target.tagName === "A"){
            // debugger;
            const url = new URL(target.href);
            goTo(url.pathname);
        }
    }
    
    function goTo(name){
        const handler = links[name];
        if(typeof(handler) === "function"){
            handler(context);
        }
    }
}