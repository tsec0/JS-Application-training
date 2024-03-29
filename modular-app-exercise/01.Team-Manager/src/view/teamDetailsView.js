import { html } from "../../node_modules/lit-html/lit-html.js";
import { getTeamsInfo, getOwnerTeamInfo } from "../api/data.js";

export async function teamDetailsView(context) {
  console.log("teamHomeView");

  const id = context.params.id;
  const team = await getTeamsInfo(id);

  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const userId = userData._id;

  const teamOwnerId = team._ownerId;
  const isOwner = userId == teamOwnerId;

  if (isOwner) {
    const teamsInfo = await getOwnerTeamInfo();
  }

  context.render(detailsTemp(team, isOwner, userData));
}

// <a href="#" class="action invert">Leave team</a>
// Membership pending. <a href="#">Cancel request</a>

function detailsTemp(team, isOwner, user) {
  return html`
    <section id="team-home">
      <article class="layout">
        <img src="./assets/rocket.png" class="team-logo left-col" />
        <div class="tm-preview">
          <h2>Team Rocket</h2>
          <p>Gotta catch 'em all!</p>
          <span class="details">3 Members</span>
          <div>
            ${isOwner
              ? html`<a href="/edit/${team._id}" class="action">Edit team</a>`
              : html` <a href="#" class="action">Join team</a>`}
          </div>
        </div>
        <div class="pad-large">
          <h3>Members</h3>
          <ul class="tm-members">
            <li>${user.username}</li>
            <li>
              James
              ${isOwner
                ? html`<a href="#" class="tm-control action"
                    >Remove from team</a
                  >`
                : ""}
            </li>
            <li>
              Meowth
              ${isOwner
                ? html`<a href="#" class="tm-control action"
                    >Remove from team</a
                  >`
                : ""}
            </li>
          </ul>
        </div>
        <div class="pad-large">
          ${isOwner
            ? html` <h3>Membership Requests</h3>
                <ul class="tm-members">
                  <li>
                    John<a href="#" class="tm-control action">Approve</a
                    ><a href="#" class="tm-control action">Decline</a>
                  </li>
                  <li>
                    Preya<a href="#" class="tm-control action">Approve</a
                    ><a href="#" class="tm-control action">Decline</a>
                  </li>
                </ul>`
            : ""}
        </div>
      </article>
    </section>
  `;
}
