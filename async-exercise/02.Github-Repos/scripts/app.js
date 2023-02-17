function loadRepos() {
	const username = document.getElementById('username').value;
	fetch(`https://api.github.com/users/${username}/repos`)
	// .then((response) => response.json())
	.then(handleResponse)

	// .then((data) => console.log (data))
	.then(handleData)
	
	// .catch((error) => console.error(error))
	.catch(handleError);
}

// check response
function handleResponse(response){
	// console.log(response);
	if(response.ok == false){
		throw new Error(`Error: ${response.status} Request has error!`);
	}
	return response.json(); // !!! return response !!!
}

// success
function handleData(data){
	const list = document.getElementById('repos');
		// <ul id="repos">
		//     <li>
		//         <a href="{repo.html_url}">
		//             {repo.full_name}
		//         </a>
		//     </li>
		// </ul>
	const items = data.map(repo => {
		const li = document.createElement('li');
		const a = document.createElement('a');
		a.href = repo.html_url;
		a.textContent = repo.full_name;
		li.appendChild(a);
		return li;
	});

	list.replaceChildren(...items);
}

// fail
function handleError(error){
	const list = document.getElementById('repos');
	list.textContent = error.message;
}