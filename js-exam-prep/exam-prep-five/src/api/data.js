import { get, del, post, put } from "./api.js";

const endpoints = {
    events: "/data/events",
    event: "/data/events/",
}

export async function getAllEvents(){
    return get(endpoints.events + '?sortBy=_createdOn%20desc');
}

export async function getEventsById(id){
    return get(endpoints.event + id);
}

export async function deleteEventById(id){
    return del(endpoints.event + id);
}

export async function createEvent(eventData){
    return post(endpoints.events, eventData);
}

export async function editEvent(id, eventData){
    return put(endpoints.event + id, eventData);
}
