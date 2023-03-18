import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMyItems } from "../api/data.js";
import { getItemTemp } from "./common/myItems.js";

export async function myFurnitureView(context) {
  console.log("MyFurnitureView");
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const id = userData._id;
  const items = await getMyItems(id);
  context.render(myItemsTemp(items));
}

function myItemsTemp(data) {
  return html` <div class="row space-top">
      <div class="col-md-12">
        <h1>My Furniture</h1>
        <p>This is a list of your publications.</p>
      </div>
    </div>
    <div class="row space-top">
      ${Object.values(data).map((item) => getItemTemp(item))}
    </div>`;
}
