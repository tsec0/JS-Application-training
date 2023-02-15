const list = document.getElementById('comments');
const nameInput = document.querySelector('[name="name"]');
const contentInput = document.querySelector('[name="content"]');

init();

// sync can call async as long as it wont interupt the async output
function init(){
    document.getElementById('load').addEventListener('click', getComments);

    // send (is actually post);
    document.getElementById('send').addEventListener('click', onPost);

    list.addEventListener('click', onCommentClick);
    
    getComments();
}

async function onPost(){
    const name = nameInput.value;
    const content = contentInput.value;

    const result = await postComment({name, content});
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
    const response = await fetch("http://localhost:3030/jsonstore/comments");
    const data = await response.json();

    const comments = Object.values(data).reverse();
    displayComments(comments);
}

async function postComment(comment){
    const response = await fetch("http://localhost:3030/jsonstore/comments", {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
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
    const response = await fetch('http://localhost:3030/jsonstore/comments/' + id, {
        method: 'delete',
    });
    document.getElementById(id).remove();
}

async function updateComment(id, comment){
    const response = await fetch('http://localhost:3030/jsonstore/comments/' + id, {
        method: 'put',
        headers: {
            'Content-Type' : 'application/json'
        }
    });
}
