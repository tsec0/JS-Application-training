const host = 'http://localhost:3030';

async function request(method, url, user_data) {

    const options = {
        method,
        headers: {},
    };

    if(user_data !== undefined){
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify({ user_data });
    }

    const token = sessionStorage.getItem('accessToken');
    if(token){
        options.headers['X-Authorization'] = token;
    }

    try {
        const response = await fetch(host + url, options);
        if (response.ok !== true) {
            const error = await response.json();
            throw new Error(error.message);
        }

        if(response.status == 204){
            return response;
        }

        return response.json();
    } catch(error) {
        alert(error.message);
        throw error;
    } 
}

export const get = request.bind(null, 'get');
export const post = request.bind(null, 'post');
export const put = request.bind(null, 'put');
export const del = request.bind(null, 'delete');