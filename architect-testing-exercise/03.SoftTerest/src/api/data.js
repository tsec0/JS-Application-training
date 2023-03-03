import * as api from './api.js' ;

const endpoints = {
    "getAllIdea": "data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc",
}

export function getAlldata(){
    return api.get(endpoints.getAllIdea);
}