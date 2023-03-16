const host = 'http://localhost:3030/';

async function request(url, options){
    try {
        const response = await fetch(host + url, options);
        if(!response.ok){
            const error = await response.json();
            throw  new Error(error.message);
        }
        try {
            const data = response.json();
            return data;
        } catch(error){
            alert(error.message);
            return error;
        }
    } catch(error){
        alert(error.message);
        return error;
    }
}

function getOption(method, body){
    const options = {
        method,
        headers: {},
    }

    const user = JSON.parse(localStorage.getItem("userData"));

    if (user) {
        const token = user.token;
        options.headers["X-Authorization"] = token;
    }

    if(body){
        options.headers["Content-Type"] = "Application/json";
        options.body = JSON.stringify(body);
    }

    return options;
}

export async function get(url){
    return await request("get", getOption("GET"));
}

export async function post(url, data){
    return await request(url, getOption("POST", data));
}

export async function put(url, data){
    return await request(url, getOption("PUT", data));
}

export async function delet(url){
    return await request(url, getOption("DELETE"));
}
