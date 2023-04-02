import { createPointer, encodeObject, filterRelation, addOwner, encodeDate } from "../util.js";
import { get, post } from "./api.js";

const endpoints = {
    'reservationsByRoomId': (roomId) => '/classes/Reservation?where=' + encodeObject(
        filterRelation('room', 'Room', roomId)
    ) + '&include=owner',
    'reservations': '/classes/Reservation',
};


export async function getByRoomId(roomId){
    const data = await get(endpoints.reservationsByRoomId(roomId));
    data.results.forEach(element => {
        element.startDate = new Date(element.startDate.iso);
        element.endDate = new Date(element.endDate.iso);
    });
    return data;
}

export async function create(roomData, userId){
    roomData = addOwner(roomData, userId);
    roomData.startDate = encodeDate(roomData.startDate);
    roomData.endDate = encodeDate(roomData.endDate);
    roomData.room = createPointer('Room', roomData.room);
    roomData.host = createPointer('_User', roomData.host);
    return post(endpoints.reservations, roomData);
}