
import { get, post} from "./api.js";

const endpoints = {
    "going": "/data/going",
}

// for new solution

export async function userGoing(id){
    return post(endpoints.going, { id });
}

export async function getUsersGoing(eventId){
    return get(endpoints.going + `?where=id%3D%22${eventId}%22&distinct=_ownerId&count`);
}

export async function getUserGoing(eventId, userId){
    return get(endpoints.going + `?where=id%3D%22${eventId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}