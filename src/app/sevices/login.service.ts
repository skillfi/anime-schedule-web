import http from "../../http-common";
import sessionService from "./session.service";
import {ILogin} from "../types/types";
import {environment} from "../../environments/environment";
import {from} from "rxjs";


function logIn(data: FormData) {
    return from(http.post<{ data: ILogin }>('/login', data))
}

function logOut() {
    return from(http.post<{ data: [] }>(environment.apiUrl + '/logout'))
}

function isLoggedIn() {
    return sessionService.getToken()
}

const LoginService = {
    logIn,
    isLoggedIn,
    logOut
}


export default LoginService;