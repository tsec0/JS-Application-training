import { render } from "https://unpkg.com/lit-html?module";
import { table } from "./table.js";

const data = [
  {
    name: "Peter",
    id: "asd1",
    canEdit: false,
    style: {
        color: 'red',
        border: '1px solid yellow',
    }
  },
  {
    name: "Mary",
    id: "asd2",
    canEdit: true,
    highlight: {
        active: true,
        content: true,
    }
  },
  {
    name: "Christmam",
    id: "asd3",
    canEdit: false,
  },
];

const root = document.querySelector("main");

update();

function onClick(id) {
  const index = data.findIndex(i => i.id == id);
  data.splice(index, 1);
  update();
}

// function onDelete(id){
//     data.splice(data.findIndex(i => i.id == id), 1);
//     update();
// }

function update() {
  render(table(data, onClick), root);
}
