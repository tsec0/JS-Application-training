import { deleteById } from '../data/room.js';
import { html, nothing } from '../lib/lit-html.js';

const detailsTemplate = (room, hasUser, isOwner, onDelete) => html`
    <h2>${room.name}</h2>
    <p>Location: ${room.location}</p>
    <p>Beds: ${room.beds}</p>
    <p>Open for Booking: ${room.openForBooking}</p>
    ${hasUser && !isOwner ? html`<a href="/book/${room.objectId}">Book room</a>` : nothing}
    ${isOwner ? html`
        <a href="/edit/${room.objectId}">Edit</a>
        <a href="javascript:void(0)" @click=${onDelete}>Delete</a>` : nothing}`;

export async function detailsView(context){
    const id = context.params.id;
    const hasUser = Boolean(context.user);
    const isOwner = context.data?.owner?.objectId === context.user?.objectId;
    context.render(detailsTemplate(context.data, hasUser, isOwner, onDelete));

    async function onDelete(){
        const choise = confirm('Are you sure you want to take down this offer?');

        if(choise){
            await deleteById(id);
            context.page.redirect('/rooms');
        }
    }
}
