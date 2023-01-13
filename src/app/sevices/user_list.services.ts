import {environment} from "../../environments/environment";
import {from, of} from "rxjs";
import http from "../../http-common";
import {IUserList, IUserListMe, IUsersList, IUsersListResponse} from "../types/types";

function getMyList(list_name: string){
    return from(http.get<IUsersList>('/users-list/me' + `?list_name=${list_name}`))
}

async function getMyListAsync(list_name: string){
    return await http.get<IUsersList>('/users-list/me' + `?list_name=${list_name}`)
}

function getAllMyLists(){
    return from(http.get<IUserListMe>('/users-list/me'))
}

function getAll(){
    return from(http.get<IUsersListResponse>('/users-list'))
}

function updateMyList(data: FormData){
    return from(http.put<IUserListMe>('/users-list/me', data))
}

function removeFromMyList(data: FormData){
    return from(http.delete('/users-list/me'))
}

const UserListService = {
    getMyList,
    getAll,
    updateMyList,
    removeFromMyList,
    getAllMyLists,
    getMyListAsync
}

export default UserListService;

