function attachEvents() {
    // console.log('TODO...');
    document.getElementById("refresh").addEventListener('click', getAllMsg);
    document.getElementById("submit").addEventListener('click', onSendMessage);
}

function renderMsg(data){
    const textArea = document.getElementById("messages");
    const content = Object.values(data).map(entry => `${entry.author}: ${entry.content}`).join("\n");
    textArea.textContent = content;
    // debugger;
}

function onSendMessage(){
    const author = document.querySelector("input[name='author']");
    const content = document.querySelector("input[name='content']");

    if(author.value != '' && content.value != ''){
        const body = {
            author: author.value,
            content: content.value,
        }
        createMsg(body);
    }
    author.value = "";
    content.value = "";
}

async function getAllMsg(){
    const url = "http://localhost:3030/jsonstore/messenger";
    const response = await fetch(url);
    const data = await response.json();

    renderMsg(data);
}

async function createMsg(body){ // {author, content}
    const url = "http://localhost:3030/jsonstore/messenger";
    const response = await fetch(url, { 
        method: "post",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(body),// {author, content}
    });

    const data = await response.json();
    // return data;
    getAllMsg();
}

attachEvents();
