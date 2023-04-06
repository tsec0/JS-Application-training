import { get, del, post, put } from "./api.js";

const endpoints = {
    'allAlbums' : '/data/albums',
    'singleAlbum': '/data/albums/',
}

export async function createAlbum(albumData){
    return post(endpoints.allAlbums, albumData);
}

export async function getAllAlbums(){
    const all = '?sortBy=_createdOn%20desc&distinct=name';
    return get(endpoints.allAlbums + all);
}

export async function getDetailsById(id){
    return get(endpoints.singleAlbum + id);
}

export async function deleteAlbumById(id){
    return del(endpoints.singleAlbum + id);
}

export async function updateAlbumById(id, albumData){
    return put(endpoints.singleAlbum + id, albumData);
}

export async function searchAlbumByText(query){
    // /data/albums?where=name%20LIKE%20%22${query}%22
    return get(endpoints.allAlbums + "?where=name" + encodeURIComponent(` LIKE "${query}"`));
}

// export async function getById(id){
//     return get('/data/pets/' + id);
// }

// export async function deleteById(id){
//     return del('/data/pets/' + id);
// }

// export async function createPet(petData){
//     return post('/data/pets', petData);
// }

// export async function editPet(id, petData){
//     return put('/data/pets/' + id, petData);
// }
