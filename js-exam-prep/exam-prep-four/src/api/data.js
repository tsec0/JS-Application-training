import { get, del, post, put } from "./api.js";

const endpoints = {
    "books" : "/data/books",
    "book" : "/data/books/"
}

export async function getAllBooks(){
    return get(endpoints.books + '?sortBy=_createdOn%20desc');
}

export async function getBookById(id){
    return get(endpoints.book + id);
}

export async function getUsersBookById(id){
    return get(endpoints.books + `?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`);
}

export async function deleteBookById(id){
    return del(endpoints.book + id);
}

export async function createBook(bookData){
    return post(endpoints.books, bookData);
}

export async function editBook(id, bookData){
    return put(endpoints.book + id, bookData);
}
