import { html } from "../../node_modules/lit-html/lit-html.js";
import { getItemById, deleteItemById } from "../api/data.js";

let contex = null;

export async function detailsView(context) {
    contex = context;
    const id = context.params.id;
    const item = await getItemById(id);
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    context.render(detailsTemp(item, userData._id === item._ownerId, deleteItem));
}

// Works properly as well
// async function deleteItem(id){
//   await deleteItemById(id);
//   contex.page.redirect("/");
// }

// function renderOwnerBtn(isOwner, deleteItem, id){
//   return isOwner ? html`
//     <div>
//       <a href="”#”" class="btn btn-info">Edit</a>
//       <a @click=${deleteItem.bind(null, id)} href="javascript:void(0)" class="btn btn-red">Delete</a>
//     </div>` : '';
// }

// With event works well!
async function deleteItem(event){
  event.preventDefault();
  const id = event.target.dataset.id;
  await deleteItemById(id);
  contex.page.redirect("/");
}

function renderOwnerBtn(isOwner, deleteItem, id){
  return isOwner ? html`
    <div>
      <a href="/edit/${id}" class="btn btn-info">Edit</a>
      <a @click=${deleteItem} data-id=${id} href="javascript:void(0)" class="btn btn-red">Delete</a>
    </div>` : '';
}

function detailsTemp(item, isOwner, deleteItem) {
    const itemImgPath = item.img.split("/");
    const imgName = itemImgPath[itemImgPath.length - 1];
  return html`
    <div class="row space-top">
      <div class="col-md-12">
        <h1>Furniture Details</h1>
      </div>
    </div>
    <div class="row space-top">
      <div class="col-md-4">
        <div class="card text-white bg-primary">
          <div class="card-body">
          <img src=/01.Furniture/images/${imgName} />
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <p>Make: <span>${item.make}</span></p>
        <p>Model: <span>${item.model}</span></p>
        <p>Year: <span>${item.year}</span></p>
        <p>Description: <span>${item.description}</span></p>
        <p>Price: <span>${item.price}</span></p>
        <p>Material: <span>${item.material}</span></p>
          ${renderOwnerBtn(isOwner, deleteItem, item._id)}
      </div>
    </div>
  `;
} 
