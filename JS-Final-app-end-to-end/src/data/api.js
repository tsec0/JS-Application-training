import { getUserData } from "../util.js";

const host = 'https://parseapi.back4app.com';

const appId = 'iiy3cN0kPLesQRCue7HQMTI7izOllKT4YBZP6e6I';

const apiKey = 'FuWS8RhGCRNvLntWXbmJOATNf9dbm538zKpBFTKi';

async function request(method, url, data){

    const options = {
        method,
        headers: {
            'X-Parse-Application-Id': appId,
            'X-Parse-JavaScript-Key': apiKey,
        }
    };

    if (data !== undefined){
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    // TODO add authoeization headers
    const userData = getUserData();

    if(userData){
        options.headers['X-Parse-Session-Token'] = userData.sessionToken;
    }

    try {
        const response = await fetch(host + url, options);

        // response status handling
        if (response.status == 204){
            return response;
        }

        const result = await response.json();

        // response error handling
        if(response.ok != true){
            console.log(result);
            throw new Error(result.message || result.error);
        }

        return result;

    } catch (err) {
        alert(err.message);
        throw err;
    }
}

export const get = request.bind(null, 'get');
export const post = request.bind(null, 'post');
export const put = request.bind(null, 'put');
export const del = request.bind(null, 'delete');
