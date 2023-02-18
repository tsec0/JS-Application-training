// console.log('TODO:// Implement Login functionality');
document.getElementById("login-form").addEventListener("submit", onLoginHandler);
document.querySelectorAll("a").forEach(element => element.classList.remove("active"));
document.getElementById("login").classList.add("active");
document.getElementById("user").style.display = "none";
const errorPassword = document.querySelector("p.notification");

function onLoginHandler(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const email = Object.fromEntries(formData).email;
    const password = Object.fromEntries(formData).password;
    onLogin(email, password);
}

async function onLogin(email, password) {
    const url = "http://localhost:3030/users/login";
    const body = { email, password };
    const header = getHeader("POST", body);
    
    const response = await fetch(url, header);
    const data = await response.json();

    sessionStorage.setItem("userData", JSON.stringify({
        email: data.email,
        accessToken: data.accessToken,
        id: data._id,
    }));

    return data;
}

function getHeader(method, body) {
    return {
        method: `${method}`,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }
}