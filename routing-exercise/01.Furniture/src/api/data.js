import * as api from './api.js';

const endpoint = {
    "login": "users/login",
    "register": "users/register",
    "logout": "users/logout",
    "createItem": "data/catalog",
    "getAllItem": "data/catalog",
    "getItemById": "data/catalog/",
    "myItem": "data/catalog?where=_ownerId%3D%22",
}

export async function login(email, password){
    const result = await api.post(endpoint.login, {email, password});
    sessionStorage.setItem("userData", JSON.stringify(result));
    return result; // for any reason to be used 
}

export async function register(email, password){
    const result = await api.post(endpoint.register, {email, password});
    sessionStorage.setItem("userData", JSON.stringify(result));
    return result; // for any reason to be used
}

export async function logout (){
    const result = await api.get(endpoint.logout);
    sessionStorage.removeItem("userData");
    return result; // for any reason to be used
}

// Create Furniture Details (POST)
export async function createItem(data){
    const result = await api.post(endpoint.createItem, data);
    return result; // for any reason to be used
}

// All Furniture (GET)
export async function getAllItem(){
    const result = await api.get(endpoint.getAllItem);
    return result; // for any reason to be used
}

// Furniture Details (GET)
export async function getItemById(id){
    const result = await api.get(endpoint.getItemById + id);
    return result; // for any reason to be used
}

//Update Furniture (PUT)
export async function updateItemById(id){
    const result = await api.post(endpoint.getItemById + id, data);
    return result; // for any reason to be used
}

//Delete Furniture (DELETE)
export async function deleteItemById(id){
    const result = await api.delet(endpoint.getItemById + id);
    return result; // for any reason to be used
}

// My Furniture (GET)
export async function getMyItems(){
    //{userId}%22
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const userId = userData && userData._id;
    let id = `${userId}%22`;
    const result = await api.get(endpoint.myItem + id);
    return result; // for any reason to be used
}
