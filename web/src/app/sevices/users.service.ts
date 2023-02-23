import http from "../../http-common";
import {Tools} from "../../tools";
import {from} from "rxjs";
import {IUser} from "../types/types";
import {Url} from "../../url";

const getUser = () => {
    const request = http.get<{data: IUser}>(new Url('/users/me').path)
    return from(request)
}

function updateUser(data: any){
    const formData = Tools.getFormData(data)
    const request = http.put<{data: IUser}>(`/users/me`, formData)
    return from(request)
}

const UserService = {
    getUser,
    updateUser
}

export default UserService;