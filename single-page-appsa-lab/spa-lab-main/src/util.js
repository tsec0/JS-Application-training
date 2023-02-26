export function setUserData(data){
    sessionStorage.setItem('userID', data._id);
    sessionStorage.setItem('username', data.username);
    sessionStorage.setItem('accessToken', data.accessToken);
}

export function clearUserData(){
    sessionStorage.removeItem('userID');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('accessToken');
}

export function createSubmitHandler(formId, callback){
    document.getElementById(formId).addEventListener('submit', onSubmit);

    async function onSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        callback(data, event);
    }
}