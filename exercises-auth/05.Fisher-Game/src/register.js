// console.log('TODO:// Implement Register functionality');

// this is active section
document.getElementById("register-form").addEventListener("submit", registerHandler);
document.querySelectorAll("a").forEach(element => element.classList.remove("active"));
document.getElementById("register").classList.add("active");
document.getElementById("user").style.display = "none";
const errorPassword = document.querySelector("p.notification");

function registerHandler(event){
    event.preventDefault();
    
    // take form data
    const form = event.target;
    const formData = new FormData(form);
    const email = Object.fromEntries(formData).email;
    const password = Object.fromEntries(formData).password;
    const rePassword = Object.fromEntries(formData).rePass;
    if (password !== rePassword){
        errorPassword.style.color = "red";
        errorPassword.textContent = "Error: Passwords dont match!";
        setTimeout(() => { errorPassword.textContent = ""; }, 2000);
    } else {
        onRegister(email, password);
    }
}

async function onRegister(email, password){
    // TODO: validation
    const url = "http://localhost:3030/users/register";
    const body = { email, password };
    const header = getHeader("POST", body);
    try {
        const response = await fetch(url, header);
        const data = await response.json();
        if (data.code != 200){
            throw new Error(data.message);
        }
        sessionStorage.setItem("userData", JSON.stringify({
            email: data.email,
            accessToken: data.accessToken,
            id: data._id,
        }));
        return data;
    } catch (error){
        if(error.message){
            errorPassword.style.color = "red";
            errorPassword.textContent = error;
            sessionStorage.clear();
        } else {
            errorPassword.style.color = "green";
            errorPassword.textContent = "Registered!";
            window.location = "./login.html";
        }
        setTimeout(() => { errorPassword.textContent = ""; }, 2000);
    }
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
