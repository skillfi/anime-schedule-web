import http from "../../http-common";
import sessionService from "./session.service";
import {ILogin, ILogout, LoginResponse} from "../types/types";
import {environment} from "../../environments/environment";
import Axios, {AxiosObservable} from "axios-observable";
import {from} from "rxjs";


function logIn(data: FormData){
    const promise = http.post<LoginResponse>('/login',data)
    const result = from(promise)
    return result
}

function logOut(){
    return  from(http.post<ILogout>(environment.apiUrl + '/logout'))
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