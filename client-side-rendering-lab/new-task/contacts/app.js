import { html, nothing, render } from './node_modules/lit-html/lit-html.js';
// import { styleMap } from './node_modules/lit-html/directives/style-map.js'; 16: style=${styleMap(style)}

import { contacts as data } from './contacts.js';

const contacts = data.map(c => Object.assign({}, c, { active: false }));

const root = document.getElementById('contacts');

const contactCard = (contact) => html`
<div class="contact card">
    <div>
        <i class="far fa-user-circle gravatar"></i>
    </div>
    <div class="info">
        <h2>Name: ${contact.name}</h2>
        <button id=${contact.id} class="detailsBtn" @click=${onToggle.bind(null, contact)}>Details</button>
        ${contact.active ?
            html`<div class="details" id=${contact.id}>
            <p>Phone number: ${contact.phoneNumber}</p>
            <p>Email: ${contact.email}</p>
        </div>` : nothing}
    </div>
</div>
`;

// root.addEventListener('click', toggleDetails);

update();

function onToggle(contact){
    // const contact = contacts.find(c => c.id == id);
    contact.active = !contact.active;
    
    update();
}

// UI as function of State

// function toggleDetails(event) {
//     if(event.target.classList.contains('detailsBtn')){
//         const id = event.target.id;
        
//     }
// }

function update(){
    render(contacts.map(con => contactCard(con, onToggle)), root);
}

// test
// const root = document.getElementById('contacts');
// const hello = () => html`<p>Hello</p>`;
// render(hello(), root);