import { getAllEvents } from "../api/data.js";
import { html } from "../lib.js";

const eventCard = (event) => html`
  <div class="event">
    <img src=${event.imageUrl} alt="example1" />
    <p class="title">${event.name}</p>
    <p class="date">${event.date}</p>
    <a class="details-btn" href="/catalog/${event._id}">Details</a>
  </div>
`;

const catalogTemp = (events) => html`
  <h2>Current Events</h2>
  <section id="dashboard">
    ${events.length > 0
      ? events.map((event) => eventCard(event))
      : html`<h4>No Events yet.</h4>`}
  </section>
`;

export async function showCatalog(context) {
  const allEvents = await getAllEvents();
  context.render(catalogTemp(allEvents));
}
