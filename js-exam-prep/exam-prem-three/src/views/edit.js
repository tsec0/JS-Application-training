import { editProductByIdAndData, getProductById } from "../api/data.js";
import { html } from "../lib.js";
import { createSubmitHandler } from '../util.js';

const editTemp = (product, handler) => html`<section id="edit">
  <div class="form">
    <h2>Edit Product</h2>
    <form @submit=${handler} class="edit-form">
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Product Name"
        .value=${product.name}
      />
      <input
        type="text"
        name="imageUrl"
        id="product-image"
        placeholder="Product Image"
        .value=${product.imageUrl}
      />
      <input
        type="text"
        name="category"
        id="product-category"
        placeholder="Category"
        .value=${product.category}
      />
      <textarea
        id="product-description"
        name="description"
        placeholder="Description"
        rows="5"
        cols="50"
        .value=${product.description}
      ></textarea>

      <input
        type="text"
        name="price"
        id="product-price"
        placeholder="Price"
        .value=${product.price}
      />
      <button type="submit">post</button>
    </form>
  </div>
</section>`;

export async function showEdit(context) {
  const id = context.params.id;
  const product = await getProductById(id);

  context.render(editTemp(product, createSubmitHandler(onEdit)));

  async function onEdit(data, form) {
    const { name, imageUrl, category, description, price } = data;
    if (!name || !imageUrl || !category || !description || !price) {
      return alert("All fields are required!");
    }

    await editProductByIdAndData(id, data);
    form.reset();
    context.page.redirect(`/details/${id}`);
  }
}
