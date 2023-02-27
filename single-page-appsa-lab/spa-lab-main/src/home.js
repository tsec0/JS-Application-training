const section = document.getElementById('home-view');
section.remove();

export function showHomeView(context){
    context.render(section);
}