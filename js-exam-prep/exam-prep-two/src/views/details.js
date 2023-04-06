import { deleteAlbumById, getDetailsById } from "../api/data.js";
import { html, nothing } from "../lib.js";

const detailsTemp = (album, isOwner, onDelete) => html`
  <section id="detailsPage">
    <div class="wrapper">
    <div class="albumCover">
        <img src=${album.imgUrl} />
    </div>
    <div class="albumInfo">
        <div class="albumText">
            <h1>Name: ${album.name}</h1>
            <h3>Artist: ${album.artist}</h3>
            <h4>Genre: ${album.genre}</h4>
            <h4>Price: $${album.price}</h4>
            <h4>Date: ${album.releaseDate}</h4>
            <p>
                Description: ${album.description}
            </p>
            </div>
                ${
                  isOwner
                    ? html`<div class="actionBtn">
                        <a href="/edit/${album._id}" class="edit">Edit</a>
                        <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
                      </div>`
                    : nothing
                }
            </div>
        </div>
    </div>
  </section>
`;

export async function showDetails(context) {
  const id = context.params.id;
  const album = await getDetailsById(id);
  const isOwner = album._ownerId === context.user._id; // who is the creator of the album (user)
  context.render(detailsTemp(album, isOwner, onDelete));

  async function onDelete(){
    const userConf = confirm("Are you sure?");
    if(!userConf){
        return 
    }
    await deleteAlbumById(id);
    context.page.redirect('/catalog');
  }
}
