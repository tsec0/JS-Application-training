import { get, post} from "./api.js";

const endpoints = {
    "like": "/data/likes"
}

// for new solution

export async function likeBook(id){
    return post(endpoints.like, { id });
}

export async function getLikesBook(id){
    return get(`/data/likes?where=id%3D%22${id}%22&distinct=_ownerId&count`);
}

export async function likedByUser(bookId, userId){
    return get(`/data/likes?where=id%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}