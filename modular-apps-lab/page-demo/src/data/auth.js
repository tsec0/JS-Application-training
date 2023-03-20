import { setUserData } from '../util.js';
import { post } from './api.js';

const endpoints = {
    'login': '/users/login',
    'register': '/users/register',
};

export async function login(email, password){
    const result = await post(endpoints.login, { email, password});
    setUserData(result);

    return result;
}


export async function register(email, username, password, repass){
    const result = await post(endpoints.register, { email, username, password, repass });
    setUserData(result);

    return result;
}
