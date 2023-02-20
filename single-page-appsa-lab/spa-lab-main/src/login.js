// register event listeners
// switch view
// handle form submit
// send login info to REST service
// store auth token

document.getElementById('login-link').addEventListener('click', showLoginView);

export function showLoginView(){
    [...document.querySelectorAll('section')].forEach(sec => sec.style.display = 'none');

    document.getElementById('login-view').style.display = 'block';
}