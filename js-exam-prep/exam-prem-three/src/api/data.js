import { get, del, post, put } from "./api.js";

const endpoints = {
    'products' : '/data/products',
    'product' : '/data/products/',
    'buy': '/data/bought',
}

export async function getAllProducts(){
    return get(endpoints.products + '?sortBy=_createdOn%20desc');
}

export async function createProduct(productData){
    return post(endpoints.products, productData);
}

export async function getProductById(id){
    return get(endpoints.product + id);
}

export async function deleteProductById(id){
    return del(endpoints.product + id);
}

export async function editProductByIdAndData(id, productData){
    return put(endpoints.product + id, productData);
}


// for new solution

export async function buyProduct(id){
    return post(endpoints.buy, id);
}

export async function totalTimesBoughtProduct(productId){
    return get(endpoints.buy + `?where=productId%3D%22${productId}%22&distinct=_ownerId&count`);
}

export async function boughtProductByUser(productId, userId){
    return get(endpoints.buy + `?where=productId%3D%22${productId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}
