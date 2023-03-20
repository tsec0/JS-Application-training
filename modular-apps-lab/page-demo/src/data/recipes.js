import { get } from "./api.js";

const pageSize = 3;

const endpoints = {
    'recipes': '/data/recipes?sortBy=_createdOn%20desc',
    // 'recipeCount': 'data/recipes?sortBy=_createdOn%20desc',
    'byId': '/data/recipes/',
};

export async function getAll(page, query){
    let dataURL = endpoints.recipes;
    let sizeURL = dataURL;
    dataURL += `&pageSize=${pageSize}&offset=${(page - 1) * pageSize}`;
    if (query){
        dataURL += `&where=${encodeURIComponent(`name LIKE "${query}"`)}`;
        sizeURL += `&where=${encodeURIComponent(`name LIKE "${query}"`)}`;
    }
    sizeURL += '&count';
    const [data, size] = await Promise.all([
        get(dataURL),
        get(sizeURL),
    ]);
    return {
        data,
        pages: Math.ceil(size / pageSize),
    };
}

window.getAll = getAll;

export async function getById(id){
    return get(endpoints.byId + id);                   
}
