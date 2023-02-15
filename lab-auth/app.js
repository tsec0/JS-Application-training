const list = document.getElementById('comments');
const nameInput = document.querySelector('[name="name"]');
const contentInput = document.querySelector('[name="content"]');

init();

// sync can call async as long as it wont interupt the async output
function init(){
    document.getElementById('load').addEventListener('click', getComments);

    // send (is actually post);
    document.getElementById('comment-form').addEventListener('submit', onPost);

    list.addEventListener('click', onCommentClick);
    
    getComments();
}

async function onPost(event){
    event.preventDefault();
    const formData = new FormData(event.target);

    const {name, content} = Object.fromEntries(formData.entries());

    const result = await postComment({content});
    list.prepend(createCommentCard(result));
}

function displayComments(comments){
    // waiting for a list -> destructuring
    list.replaceChildren(...comments.map(createCommentCard));
}

function createCommentCard(comment){
    const element = document.createElement('article');
    element.innerHTML = `<header><h3>${comment.name}</h3></header><main><p>${comment.content}</p><button>Delete</button></main>`;
    element.id = comment._id;

    return element;
}

async function getComments(){
    const response = await fetch("http://localhost:3030/data/comments");
    const data = await response.json();

    const comments = Object.values(data).reverse();
    displayComments(comments);
}

async function postComment(comment){
    const token = sessionStorage.getItem('accessToken');

    const response = await fetch("http://localhost:3030/jsonstore/comments", {
        method: "post",
        headers: {
            'Content-Type': 'application/json',
            'X-Authorisation': token,
        },
        body: JSON.stringify(comment)
    });

    const data = await response.json();

    return data;
}

function onCommentClick(ev){
    if(ev.target.tagName == 'BUTTON'){
        const choise = confirm('Are you sure you want to delete this comment?');
        if(choise){
            const commentId = ev.target.parentElement.parentElement.id;
            deleteComment(commentId);
        }
        // console.log(ev.target.parentElement.parentElement.id);
    }
}

async function deleteComment(id){
    const token = sessionStorage.getItem('accessToken');

    await fetch('http://localhost:3030/data/comments/' + id, {
        method: 'delete',
        headers: {
            'X-Authorisation': token,
        },

    });
    document.getElementById(id).remove();
}

async function updateComment(id, comment){
    const response = await fetch('http://localhost:3030/jsonstore/comments/' + id, {
        method: 'put',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(comment),
    });
    return response.json();
}
