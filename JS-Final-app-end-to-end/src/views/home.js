import { html } from '../lib/lit-html.js';


const homeTemplate = (list) => html`
    <h1>Welcome to SoftUni Sleepover</h1>
    <p>Find accomodation in many location across the country. <a href="/rooms">Browse catalog</a></p>
    <p>Have a room to offer? <a href="/host">Place an offer right now!</a></p>
`;

export function homeView(context){
    context.render(homeTemplate());
}