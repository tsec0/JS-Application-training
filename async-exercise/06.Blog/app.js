function attachEvents() {
    document.getElementById("btnLoadPosts").addEventListener("click", getPosts);
    document.getElementById("btnViewPost").addEventListener("click", getComments);
}

async function getComments(e){
    const selectedOpt = document.getElementById("posts").selectedOptions[0].value;

    const titleElement = document.getElementById("post-title");
    const postBodyElement = document.getElementById("post-body");

    const postCommentsElement = document.getElementById("post-comments");
    postCommentsElement.innerHTML = ""; // this is a bit of a XSS problem

    const postUrl = "http://localhost:3030/jsonstore/blog/posts";
    const postResponse = await fetch(postUrl);
    const postData = await postResponse.json();

    const commentsUrl = "http://localhost:3030/jsonstore/blog/comments";
    const commentsResponse = await fetch(commentsUrl);
    const commentsData = await commentsResponse.json();

    const selectedPost = Object.values(postData).find(post => post.id == selectedOpt);
    titleElement.textContent = selectedPost.title;
    postBodyElement.textContent = selectedPost.body;

    const comments = Object.values(commentsData).filter(comments => comments.postId === selectedOpt);
    comments.forEach(comment => {
        // debugger
        const li = document.createElement("li");
        li.textContent = comment.text;
        postCommentsElement.appendChild(li);
    });
}

async function getPosts(e){
    const selectOption = document.getElementById("posts");
    selectOption.innerHTML = "";

    const url = "http://localhost:3030/jsonstore/blog/posts";

    const response = await fetch(url);
    const data = await response.json();

    // console.log(data); // data is JSON

    // when the returned data is JSON -> we use: 
    // Object.entries / .keys / .values to iterate! 
    Object.values(data).forEach(post => {
        // we create for each post an option
        const option = document.createElement("option");
        option.value = post.id;
        option.textContent = post.title;
        
        // every option is added to the element with "posts" id
        // console.log(option);
        selectOption.appendChild(option);
    });
}

attachEvents();