import http from "../../http-common";
import sessionService from "./session.service";
import {ILogin, IUser} from "../types/types";
import {client_secret, environment} from "../../environments/environment";
import {finalize, from} from "rxjs";
import {AxiosRequestConfig} from "axios/index";
import {Url} from "../../url";

export const config:  AxiosRequestConfig<any> = {
    headers: {
        'Authorization': `Bearer: ${sessionService.getToken()}`
    }
}

function logIn(data: FormData) {
    return from(http.post<{ data: ILogin }>('/login', data))
}

function oauth2(){
    const request = http.get<{state: string, authorization_url: string}>(new Url('/v2/login').path)
    return from(request)
}

function google_login(data: {state: string, access_token: string, scope: any, audience: any}){
    const request = http.get<{ data: ILogin }>(new Url('/v2/me').path, {
        params: {
            state: data.state,
            code: data.access_token,
            scope: data.scope,
            authuser: '0',
            prompt: 'none'
        }
    })
    return from(request)
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

function me() {
    const request = http.get<{data: ILogin}>(new Url('/me').path)
    return from(request)

}

const LoginService = {
    logIn,
    isLoggedIn,
    logOut,
    oauth2,
    google_login,
    me
}


export default LoginService;