import { deleteBookById, getBookById } from "../api/data.js";
import { html, nothing } from "../lib.js";
import { likeBook, getLikesBook, likedByUser } from "../api/likes.js";

const detailsTemp = (book, isOwner, onDelete, totalLikes, canLike, onLike, hasUser) => html`
  <section id="details-page" class="details">
    <div class="book-information">
      <h3>${book.title}</h3>
      <p class="type">Type: ${book.type}</p>
      <p class="img"><img src=${book.imageUrl} /></p>
      ${bookControls(book, isOwner, onDelete, canLike, onLike, hasUser)}
      <div class="likes">
        <img class="hearts" src="/images/heart.png" />
        <span id="total-likes">Likes: ${totalLikes}</span>
      </div>
    </div>
    <div class="book-description">
      <h3>Description:</h3>
      <p>${book.description}</p>
    </div>
  </section>
`;

function bookControls(book, isOwner, onDelete, canLike, onLike, hasUser) {
  if (hasUser == false) {
    return nothing;
  }

  if (isOwner) {
    return html`<div class="actions">
      <a class="button" href="/edit/${book._id}">Edit</a>
      <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
    </div>`;
  }

  if (canLike) {
    return html`<div class="actions">
      <a @click=${onLike} href="javascript:void(0)" class="button">Like</a>
    </div>`;
  }
}

export async function showDetails(context) {
  const id = context.params.id;

  const requests = [getBookById(id), getLikesBook(id)];

  const hasUser = Boolean(context.user); // boolean sign -> !!
  if (hasUser) {
    requests.push(likedByUser(id, context.user._id));
  }

  const [book, totalLikes, likeByUser] = await Promise.all(requests);

  const isOwner = hasUser && context.user._id == book._ownerId; // who is the creator of the album (user)
  const canLike = !isOwner && likeByUser == 0; // who can buy (user)

  context.render(
    detailsTemp(book, isOwner, onDelete, totalLikes, canLike, onLike, hasUser)
  );

  async function onDelete() {
    const userConf = confirm("Are you sure?");
    if (!userConf) {
      return;
    }
    await deleteBookById(id);
    context.page.redirect("/");
  }

  async function onLike() {
    await likeBook(id);
    context.page.redirect("/details/" + id);
  }
}
