import {IUser} from "../types/types";

function setCurrentUser(currentUser: any) {
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
}

function getCurrentUser() {
    const user = localStorage.getItem('currentUser')
    // console.log(user)
    return user ? JSON.parse(user) : {};
}

function isAdmin() {
    return getCurrentUser().is_admin
}

function setToken(token: any) {
    sessionStorage.setItem('token', JSON.stringify(token))
}

function getToken(){
    const item = sessionStorage.getItem('token');
    return item ? JSON.parse(item) : false;
}


function clear() {
    localStorage.clear()
    sessionStorage.clear()
}

const sessionService = {
    setCurrentUser,
    getCurrentUser,
    isAdmin,
    setToken,
    getToken,
    clear
}

export default sessionService;
