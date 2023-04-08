import { getAllProducts } from "../api/data.js";
import { html, nothing } from "../lib.js";

const cardTemplate = (product) => html`
  <section id="dashboard">
    <div class="product">
      <img src=${product.imageUrl} alt="example1" />
      <p class="title">${product.title}</p>
      <p><strong>Price:</strong><span class="price">${product.price}</span>$</p>
      <a class="details-btn" href="/details/${product._id}">Details</a>
    </div>
  </section>
`;

const dashboardTemp = (products) =>
  html`${products.length > 0
    ? html`<h2>Products</h2>
        ${products.map((product) => cardTemplate(product))}`
    : html`<h2>No products yet.</h2>`}`;

export async function showDashboard(context) {
  const allProducts = await getAllProducts();
  context.render(dashboardTemp(allProducts)); // !!context.user for boolean value
}
