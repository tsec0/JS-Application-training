import {
  getProductById,
  deleteProductById,
  totalTimesBoughtProduct,
  boughtProductByUser,
  buyProduct,
} from "../api/data.js";
import { html, nothing } from "../lib.js";

const detailsTemp = (
  product,
  hasUser,
  isOwner,
  onDelete,
  timesBought,
  canBuy,
  onBuy
) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${product.imageUrl} alt="example1" />
            <p id="details-title">${product.name}</p>
            <p id="details-category">
              Category: <span id="categories">${product.category}</span>
            </p>
            <p id="details-price">
              Price: <span id="price-number">${product.price}</span>$</p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Bought: <span id="buys">${timesBought}</span> times.</h4>
                <span>${product.description}</span>
              </div>
            </div>
            ${productControls(
              product,
              hasUser,
              isOwner,
              onDelete,
              canBuy,
              onBuy
            )}
            </div>
          </div>
        </section>
`;

function productControls(product, hasUser, isOwner, onDelete, canBuy, onBuy) {
  if (isOwner) {
    return html`<div id="action-buttons">
      <a href="/edit/${product._id}" id="edit-btn">Edit</a>
      <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
    </div>`;
  }

  if (canBuy) {
    return html`<div id="action-buttons">
      <a @click=${onBuy} href="javascript:void(0)" id="buy-btn">Buy</a>
    </div>`;
  }

  if (hasUser == false) {
    return nothing;
  }
}

export async function showDetails(context) {
  const id = context.params.id;

  const requests = [getProductById(id), totalTimesBoughtProduct(id)];

  const hasUser = Boolean(context.user);
  if (hasUser) {
    requests.push(boughtProductByUser(id, context.user._id));
  }

  const [product, totalTimesBought, isBoughtByUser] = await Promise.all(
    requests
  );

  const isOwner = hasUser && product._ownerId == context.user._id; // who is the creator of the album (user)
  const canBuy = !isOwner && isBoughtByUser == 0; // who can buy (user)

  context.render(
    detailsTemp(
      product,
      hasUser,
      isOwner,
      onDelete,
      totalTimesBought,
      canBuy,
      onBuy
    )
  );

  async function onDelete() {
    const userConf = confirm("Are you sure?");
    if (!userConf) {
      return;
    }
    await deleteProductById(id);
    context.page.redirect("/dashboard");
  }

  async function onBuy() {
    await buyProduct(id);
    context.page.redirect("/dashboard/" + id);
  }
}
