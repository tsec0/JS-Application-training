import { get, post, put, del } from "./api.js";
import { addOwner, createPointer } from "../util.js";

const endpoints = {
    'rooms': `/classes/Room?where=${encodeURIComponent(`{"openForBooking": true}`)}`,
    'roomsWithUser': (userId) =>  `/classes/Room?where=${encodeURIComponent(
        `{"$or":[
            {"openForBooking": true}, 
            {"owner": ${JSON.stringify(createPointer('_User', userId))}}
            ]}`
        )}`,
    'roomById': '/classes/Room/',
};

export async function getAll(userId){
    if (userId) {
        return get(endpoints.roomsWithUser(userId));
    } else {
        return get(endpoints.rooms);
    }
}

export async function getById(id){
    return get(endpoints.roomById + id);
}

export async function create(roomData, userId){
    return post(endpoints.rooms, addOwner(roomData, userId));
}

export async function update(id, roomData, userId){
    return put(endpoints.roomById + id, addOwner(roomData, userId));
}

export async function deleteById(id){
    return del(endpoints.roomById + id);
}
