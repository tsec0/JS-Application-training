const section = document.getElementById('detailsView');
const main = document.getElementsByTagName("main")[0];
const form = section.querySelector("form");
form.addEventListener("submit", onSubmit);
const themeContentWrapper = document.getElementById("theme-content-wrapper");
section.remove();

export async function showDetails(event) {
    if (!event) {
        return;
    }
    let id = "";
    if (event.target.tagName == "H2") {
        id = event.target.parentElement.id;
    } else if (event.target.tagName == "A") {
        id = event.target.id;
    }

    const topic = await loadTopic(id);
    const comments = await loadComment(id);

    const result = topicTemplate(topic, comments);
    themeContentWrapper.replaceChildren(result);

    main.replaceChildren(section);
}

function topicTemplate(topic, comments) {
    const topicContainer = document.createElement("div");
    topicContainer.classList.add("theme-title");
    topicContainer.innerHTML = `
    <div class="theme-name-wrapper">
        <div class="theme-name">
            <h2>${topic.topicName}</h2>
        </div>
    </div>`;

    const commentContainer = document.createElement("div");
    commentContainer.classList.add("comment")

    commentContainer.innerHTML = `
    <div class="header">
        <img src="./static/profile.png" alt="avatar">
            <p><span>${topic.username}</span> posted on <time>${topic.date}</time></p>
            <p class="post-content">${topic.postText}</p>
    </div>`;

    Object.values(comments).forEach(item => { 
        const comment = createComment(item);
        commentContainer.appendChild(comment);
    });

    return commentContainer;
}

function createComment(data){
    const container = document.createElement("div");
    container.classList.add("user-comment");
    container.innerHTML = `
    <div class="topic-name-wrapper">
        <div class="topic-name">
            <p><strong>${data.username}</strong> commented on <time>${data.date}</time></p>
            <div class="post-content">
                <p>${data.postText}</p>
            </div>
        </div>
    </div>`;
    return container;
}

function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const { postText, username, id } = Object.fromEntries(formData);
    createPost({ postText, username, id, date: new Date() });
    showDetails();
}

async function createPost(body) {
    const url = "http://localhost:3030/jsonstore/collections/myboard/comments";

    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    }

    const response = await fetch(url, request);
    const data = await response.json();
    
    clearForm();

    // return data;
}

function clearForm() {
    form.reset();
}

async function loadComment(id) {
    const url = "http://localhost:3030/jsonstore/collections/myboard/comments"// id to do

    const response = await fetch(url);
    const data = await response.json();

    const filterData = Object.values(data).filter(item => item.id === id);

    return data; // to be done
}

async function loadTopic(id) {
    const url = `http://localhost:3030/jsonstore/collections/myboard/posts/${id}`;

    const response = await fetch(url);
    const data = await response.json();

    return data;
}
