import { getUsersBookById } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const bookCardTemp = (book) => html`
    <ul class="my-books-list">
    <li class="otherBooks">
        <h3>${book.title}</h3>
        <p>Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <a class="button" href="/details/${book._id}">Details</a>
    </li>
</ul>
`;

const catalogTemplate = (userBooks) => html`
    <section id="my-books-page" class="my-books">
        <h1>My Books</h1>
        ${userBooks.length > 0 ?
            userBooks.map(book => bookCardTemp(book)) : 
            html`<p class="no-books">No books in database!</p>`
        }
    </section>`;

export async function showCatalog(context) {
    const user = getUserData();
    const userBooks = await getUsersBookById(user._id);
    context.render(catalogTemplate(userBooks));
}

