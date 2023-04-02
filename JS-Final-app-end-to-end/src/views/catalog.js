import { html } from '../lib/lit-html.js';
import { repeat } from '../lib/directives/repeat.js';

import * as roomService from '../data/room.js';

const catalogTemplate = (list) => html`
    <h2>Available Rooms</h2>
    ${list}
`;

const listTemplate = (rooms) => html`
    <section>
        ${repeat(rooms, r => r.objectId, roomCard)}
    </section>
`;

const roomCard = (room) => html`
    <article class="room-card">
        <h3>${room.name}</h3>
        <p>Location: ${room.location}</p>
        <p>Beds: ${room.beds}</p>
        <p>Free: ${room.openForBooking}</p>
        <p><a class="action" href="/rooms/${room.objectId}">View Details</a></p>
    </article>
`;

export async function catalogView(context){
    context.render(catalogTemplate(html`<p>Loading &hellip;</p>`));

    const { results: rooms } = await roomService.getAll();

    context.render(catalogTemplate(listTemplate(rooms)));
}