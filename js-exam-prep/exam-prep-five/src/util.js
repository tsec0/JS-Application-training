// localStorage is also okay to use

export function getUserData(){
    const data = JSON.parse(sessionStorage.getItem('userData'));
    return data;
}

export function setUserData(data){
    sessionStorage.setItem('userData', JSON.stringify(data));
}

export function clearUserData(){
    sessionStorage.removeItem('userData');
}

export function createSubmitHandler(callback){
    return function(event){
        event.preventDefault();
        const form = event.currentTarget; //  currentTarget added (target is removed)
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries()); // entries() added

        callback(data, form); // from
    }
}
