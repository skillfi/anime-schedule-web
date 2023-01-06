import http from "../../http-common";
import sessionService from "./session.service";
import {ILogin, ILogout} from "../types/types";



async function logIn(data: FormData): Promise<ILogin | any>{
    let result: ILogin = {auth_token: '', duration: 0, user: {birthday:null, id: '', email: '', name: '', is_admin: false,
            main_image: '', surname: '', nickname: ''}}
    try {
        const response = await http.post<ILogin>('/login', data)
        result = response.data
    } catch (e) {
        alert(e)
    }
    return result
}

async function logOut(): Promise<ILogout | undefined> {
    try {
        const response = await http.post<ILogout>('/logout')
        return response.data
    } catch (e) {
        alert(e)
    }

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