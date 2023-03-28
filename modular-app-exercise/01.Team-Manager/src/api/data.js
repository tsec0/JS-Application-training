import * as api from './api.js';

const endpoint = {
    "login": "users/login",
    "register": "users/register",
    "logout": "users/logout",
}

export async function login(email, password){
    const result = await api.post(endpoint.login, {email, password});
    sessionStorage.setItem("userData", JSON.stringify(result));
    return result; // for any reason to be used 
}

export async function register(email, username, password){
    const result = await api.post(endpoint.register, {email, password});
    sessionStorage.setItem("userData", JSON.stringify(result));
    return result; // for any reason to be used
}

export async function logout (){
    const result = await api.get(endpoint.logout);
    sessionStorage.removeItem("userData");
    return result; // for any reason to be used
}
