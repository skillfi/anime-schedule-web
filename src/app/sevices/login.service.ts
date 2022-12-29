import {loginResponse} from "../models/form-data.model";
import http from "../../http-common";
import sessionService from "./session.service";


const login = (data: FormData) => {
    return http.post<loginResponse>('/login', data)
}

const logOut = () => {
    return http.post('/logout', {}).then((resp)=> {
        sessionService.clear()
    })
}

const isLoggedIn = () => {
    return sessionService.getToken()
}

const LoginService = {
    login,
    isLoggedIn,
    logOut
}

export default LoginService;