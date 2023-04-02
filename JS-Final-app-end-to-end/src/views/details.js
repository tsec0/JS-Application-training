import * as roomService from "../data/room.js";
import { repeat } from "../lib/directives/repeat.js";
import { html, nothing } from "../lib/lit-html.js";
import * as reservationService from "../data/reservation.js";
import { submitHandler } from "../util.js";

const detailsTemplate = (room, hasUser, onDelete, onBook) => html` <h2>
    ${room.name}
  </h2>
  <p>Location: ${room.location}</p>
  <p>Beds: ${room.beds}</p>
  <p>Open for Booking: ${room.openForBooking}</p>
  ${hasUser && !room.isOwner ? reservationForm(onBook) : nothing}
  ${room.isOwner
    ? html` <a href="/edit/${room.objectId}">Edit</a>
        <a href="javascript:void(0)" @click=${onDelete}>Delete</a>`
    : nothing}
  ${hasUser
    ? html`<ul>
        ${repeat(room.reservations, r => r.objectId, reservationCard)}
      </ul>`
    : nothing}`;

const reservationForm = (onSubmit) => html`
  <form @submit=${onSubmit}>
    <label>From <input type="date" name="startDate" /> </label>
    <label>To <input type="date" name="endDate" /> </label>
    <button>Request reservation</button>
  </form>
`;

const reservationCard = (res) => html`
    <li>
        From: ${res.startDate.toISOString().slice(0, 10)}<br>
        To: ${res.endDate.toISOString().slice(0, 10)}<br>
        By: ${res.owner.username}<br>
    </li>
`;

export async function detailsView(context) {
  const id = context.params.id;
  const room = context.data;

  const hasUser = Boolean(context.user);
  room.isOwner = room.owner.objectId === context.user?.objectId;
  room.reservations = [];

  if (hasUser) {
    // TODO load reservations
    const result = await reservationService.getByRoomId(id);
    room.reservations = result.results;
  }

  context.render(
    detailsTemplate(context.data, hasUser, onDelete, submitHandler(book))
  );

  async function onDelete() {
    const choise = confirm("Are you sure you want to take down this offer?");

    if (choise) {
      await roomService.deleteById(id);
      context.page.redirect("/rooms");
    }
  }

  async function book({ startDate, endDate }) {
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    if (Number.isNaN(startDate.getDate())) {
      return alert("Invalid starting date!");
    }
    if (Number.isNaN(endDate.getDate())) {
      return alert("Invalid ending date!");
    }
    if (endDate <= startDate) {
      return alert("Ending state must be after starting date!");
    }

    const reservationData = {
      startDate,
      endDate,
      room: id,
      host: context.data.owner.objectId,
    };

    const result = await reservationService.create(
      reservationData,
      context.user.objectId
    );
    context.page.redirect("/rooms/" + id);
  }
}
