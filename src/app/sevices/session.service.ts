import {Subject} from "rxjs";
import {environment} from "../../environments/environment";
import UserService from "./users.service";
import {User} from "../models/form-data.model";

const setCurrentUser = (currentUser: any) => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
    // console.log(JSON.stringify(currentUser))
}

const getCurrentUser = () => {
    const user = localStorage.getItem('currentUser')
    // console.log(user)
    return user ? JSON.parse(user) : {};
}

const isAdmin = () => {
    return getCurrentUser().is_admin
}

const setToken = (token: any) => {
    sessionStorage.setItem('token', JSON.stringify(token))
}

const getToken = () => {
    const item = sessionStorage.getItem('token');
    return item ? JSON.parse(item): false;
}


const clear = () => {
    localStorage.clear()
    sessionStorage.clear()
}

const SessionService = {
    setCurrentUser,
    getCurrentUser,
    isAdmin,
    setToken,
    getToken,
    clear
}

export default SessionService
