import { html } from "../lib.js";
import { createSubmitHandler } from '../util.js';
import { editEvent, getEventsById} from "../api/data.js";

const editTemplate = (event, handler) => html`
<section id="edit">
    <div class="form">
      <h2>Edit Event</h2>
      <form @submit=${handler} class="edit-form">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Event"
          .value=${event.name}
        />
        <input
          type="text"
          name="imageUrl"
          id="event-image"
          placeholder="Event Image"
          .value=${event.imageUrl}
        />
        <input
          type="text"
          name="category"
          id="event-category"
          placeholder="Category"
          .value=${event.category}
        />


        <textarea
          id="event-description"
          name="description"
          placeholder="Description"
          rows="5"
          cols="50"
          .value=${event.description}
        ></textarea>
        
        <label for="date-and-time">Event Time:</label>
        <input
        type="text"
        name="date"
        id="date"
        placeholder="When?"
        .value=${event.date}
      />

        <button type="submit">Edit</button>
      </form>
    </div>
  </section>
`;

export async function showEdit(context) {
    const id = context.params.id;
    const event = await getEventsById(id);
  
    context.render(editTemplate(event, createSubmitHandler(onEdit)));
  
    async function onEdit(data) {
      const {  name,
        imageUrl, 
        category, 
        description, 
        date
       } = data;
      if (!name || !imageUrl || !category || !description || !date) {
        return alert("All fields are required!");
      }
  
      await editEvent(id, data);
      context.page.redirect(`/catalog/${id}`);
    }
  }