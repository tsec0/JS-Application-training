import { getAllBooks } from '../api/data.js';
import { html } from '../lib.js';

const bookTemplate = (book) => html`

<ul class="other-books-list">
    <li class="otherBooks">
        <h3>${book.title}</h3>
        <p>Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <a class="button" href="/details/${book._id}">Details</a>
    </li>
</ul>`

const dashboardTemp = (books) => html`
 <section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>
    ${books.length > 0
      ? books.map(book => bookTemplate(book))
      : html`<p class="no-books">No books in database!</p>`};
  </section>
`;

export async function showDashboard(context) {
  const allBooks = await getAllBooks();
  context.render(dashboardTemp(allBooks));
}
