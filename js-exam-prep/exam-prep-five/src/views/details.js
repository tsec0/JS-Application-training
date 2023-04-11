import { getEventsById, deleteEventById } from "../api/data.js";
import { html, nothing } from "../lib.js";
import { userGoing, getUserGoing, getUsersGoing } from "../api/togo.js";

const detailsTemp = (
  event,
  isOwner,
  onDelete,
  hasUser,
  canGo,
  onGo,
  getGoing
) => html`
  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src=${event.imageUrl} alt="example1" />
      <p id="details-title">${event.name}</p>
      <p id="details-category">
        Category: <span id="categories">${event.category}</span>
      </p>
      <p id="details-date">Date:<span id="date">${event.date}</span></p>
      <div id="info-wrapper">
        <div id="details-description">
          <span>${event.description}</span>
        </div>
      </div>

      <h3>Going: <span id="go">${getGoing}</span> times.</h3>

      ${eventControls(event, isOwner, onDelete, hasUser, canGo, onGo)}
  </section>
`;

function eventControls(event, isOwner, onDelete, hasUser, canGo, onGo) {
  if (hasUser == false) {
    return nothing;
  }

  if (isOwner) {
    return html`
      <div id="action-buttons">
        <a href="/edit/${event._id}" id="edit-btn">Edit</a>
        <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
      </div>
    `;
  }

  if (canGo) {
    return html`
      <div id="action-buttons">
        <a @click=${onGo} href="javascript:void(0)" id="go-btn">Going</a>
      </div>
    `;
  }
}

export async function showDetails(context) {
  const id = context.params.id;

  let userId = "";
  if (context.user) {
    userId = context.user._id;
  }

  const event = await getEventsById(id);

  const getGoing = await getUsersGoing(id);

  const hasUser = Boolean(context.user);

  const toGoUser = await getUserGoing(id, userId);

  const isOwner = event._ownerId === userId;

  const canGo = !isOwner && toGoUser == 0;

  context.render(
    detailsTemp(event, isOwner, onDelete, hasUser, canGo, onGo, getGoing)
  );

  async function onDelete() {
    const userConf = confirm("Are you sure?");
    if (!userConf) {
      return;
    }
    await deleteEventById(id);
    context.page.redirect("/catalog");
  }

  async function onGo() {
    await userGoing(id);
    context.page.redirect("/catalog/" + id);
  }
}
