import { html } from "../lib.js";
import { createProduct } from "../api/data.js";
import { createSubmitHandler } from "../util.js";

const createTemplate = (handler) => html`
  <section id="create">
    <div class="form">
      <h2>Add Product</h2>
      <form @submit=${handler} class="create-form">
        <input 
            type="text"
            name="name"
            id="name"
            placeholder="Product Name"
        />
        <input
          type="text"
          name="imageUrl"
          id="product-image"
          placeholder="Product Image"
        />
        <input
          type="text"
          name="category"
          id="product-category"
          placeholder="Category"
        />
        <textarea
          id="product-description"
          name="description"
          placeholder="Description"
          rows="5"
          cols="50"
        ></textarea>

        <input
          type="text"
          name="price"
          id="product-price"
          placeholder="Price"
        />

        <button type="submit">Add</button>
      </form>
    </div>
  </section>
`;

export async function showCreate(context) {
  context.render(createTemplate(createSubmitHandler(onCreate)));

  async function onCreate(data, form) {
    const { name, imageUrl, category, description, price } =
      data;
    if (
      !name ||
      !imageUrl ||
      !category ||
      !description ||
      !price
    ) {
      return alert("All fields are required!");
    }

    await createProduct(data);
    form.reset();
    context.page.redirect("/dashboard");
  }
}
