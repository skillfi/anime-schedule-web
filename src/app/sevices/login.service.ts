import http from "../../http-common";
import sessionService from "./session.service";
import {ILogin} from "../types/types";
import {environment} from "../../environments/environment";
import {finalize, from} from "rxjs";
import {AxiosRequestConfig} from "axios/index";

export const config:  AxiosRequestConfig<any> = {
    headers: {
        'Authorization': `Bearer: ${sessionService.getToken()}`
    }
}

function logIn(data: FormData) {
    return from(http.post<{ data: ILogin }>('/login', data))
}

function logOut() {
    return from(http.post<{ data: [] }>(environment.apiUrl + '/logout'))
        .pipe(finalize(() => {
            sessionService.clear()
        }))
          
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