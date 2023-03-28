import * as api from './api.js';

const endpoint = {
    "login": "users/login",
    "register": "users/register",
    "logout": "users/logout",
    "getAllTeams": "data/teams",
    "getAllMembers": "data/members?where=status%3D%22member%22",
    "createTeam": "data/teams",
    "teamsInfo": "data/teams/", 
    "requestMember": "data/members",
}

export async function login(email, password){
    const result = await api.post(endpoint.login, {email, password});
    sessionStorage.setItem("userData", JSON.stringify(result));
    return result; // for any reason to be used 
}

export async function register(email, username, password){
    const result = await api.post(endpoint.register, {email, username, password});
    sessionStorage.setItem("userData", JSON.stringify(result));
    return result; // for any reason to be used
}

export async function logout(){
    const result = await api.get(endpoint.logout);
    sessionStorage.removeItem("userData");
    return result; // for any reason to be used
}


// get all teams
export async function getAllTeams(){
    const result = await api.get(endpoint.getAllTeams);
    return result; // for any reason to be used
}

// get all members
export async function getAllMembers(){
    const result = await api.get(endpoint.getAllMembers);
    return result; // for any reason to be used
}

//post create team
export async function createTeam(name, imageUrl, description){
    const result = await api.post(endpoint.createTeam, {name, imageUrl, description});
    return result; // for any reason to be used
}

//get teams info
export async function getTeamsInfo(id){
    const result = await api.get(endpoint.teamsInfo + id);
    return result; // for any reason to be used
}

//put update team info
export async function updateTeamInfo(id, name, imageUrl, description){
    const result = await api.put(endpoint.teamsInfo + id, {name, imageUrl, description});
    return result; // for any reason to be used
}

//post teams info
export async function requestMember(teamId){
    const result = await api.post(endpoint.requestMember, {teamId});
    return result; // for any reason to be used
}
