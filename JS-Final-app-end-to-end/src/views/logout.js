import { logout } from '../data/user.js';

export function logoutAction(context){
    logout();
    context.page.redirect('/');
}
