function attachEvents() {
    //console.log('TODO...');
    document.getElementById('btnLoad').addEventListener('click', onLoadAllRecords);
    document.getElementById('btnCreate').addEventListener('click', handleCreateRecord);
}

function handleCreateRecord(){
    const personEl = document.getElementById("person");
    const phoneEl = document.getElementById("phone");

    onCreateRecord(personEl.value, phoneEl.value);
    personEl.value = '';
    phoneEl.value = '';

    onLoadAllRecords();
}

// first - first we render the data
function renderRecord(data){
    const ul = document.getElementById('phonebook');

    // for faster work
    ul.innerHTML = '';

    Object.values(data).forEach(record => {
        const li = document.createElement('li');
        li.textContent = `${record.person}: ${record.phone}`;
        li.setAttribute("data-id", record._id);

        const btn = document.createElement("button");
        btn.textContent = 'Delete';
        btn.addEventListener('click', handleDelete);
        
        li.appendChild(btn);
        ul.appendChild(li);
    });
}

// first - adding a button to delete record
function handleDelete(event){
    const li = event.target.parentElement;
    const id = li.getAttribute("data-id");

    onDeleteRecord(id);
    li.remove();
}

// first load the data
async function onLoadAllRecords(){
    const url = "http://localhost:3030/jsonstore/phonebook";
    const response = await fetch(url);
    const data = await response.json();

    return renderRecord(data);
}

async function onCreateRecord(person, phone){
    const url = "http://localhost:3030/jsonstore/phonebook";
    const body = { person, phone };
    const headers = getHeader("POST", body);
    const response = await fetch(url, headers);
    const data = await response.json();
    return data;
}

async function onDeleteRecord(id){
    const url = `http://localhost:3030/jsonstore/phonebook/${id}`;
    const headers = getHeader("DELETE", null);
    const response = await fetch(url, headers);
    const data = await response.json();
    return data;
}

function getHeader(method, body){
    return {
        method: `${method}`,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }
}

attachEvents();
