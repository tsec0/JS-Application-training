import { html } from '../lib/lit-html.js';


export const navTempalte = (hasUser) => html`
    <nav>
        <a href="/">Home</a>
        <a href="/rooms">Rooms</a>
        ${hasUser ? 
            html`<a href="/create">Create</a>
            <a href="javascript:void(0)">Logout</a>` 
            : 
            html`<a href="/login">Login</a>
            <a href="/register">Register</a>
        `}
    </nav>
`;