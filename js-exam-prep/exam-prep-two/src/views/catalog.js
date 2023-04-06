import { getAllAlbums } from "../api/data.js";
import { html, nothing } from "../lib.js";

const cardTemplate = (album, hasUser) => html`
  <div class="card-box">
    <img src=${album.imgUrl} />
    <div>
      <div class="text-center">
        <p class="name">Name: ${album.name}</p>
        <p class="artist">Artist: ${album.artist}</p>
        <p class="genre">Genre: ${album.genre}</p>
        <p class="price">Price: $${album.price}</p>
        <p class="date">Release Date: ${album.releaseDate}</p>
      </div>

      ${hasUser
        ? html`<div class="btn-group">
            <a href="/details/${album._id}" id="details">Details</a>
          </div>`
        : nothing}
    </div>
  </div>
`;

const catalogTemp = (hasAlbums, hasUser) => html`
  <section id="catalogPage">
    <h1>All Albums</h1>

    ${hasAlbums.length > 0
      ? hasAlbums.map((album) => cardTemplate(album, hasUser))
      : html`<p>No Albums in Catalog!</p>`};
  </section>
`;

export async function showCatalog(context) {
  const allAlbums = await getAllAlbums();
  context.render(catalogTemp(allAlbums, !!context.user)); // !!context.user for boolean value
}
