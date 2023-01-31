import {from} from "rxjs";
import http from "../../http-common";
import {
    IAnime,
    IUsersList,
    IUsersListResponse,
    UserBookmark,
    UserBookmarkResponse,
    UserBookmarks
} from "../types/types";
import {config} from "./login.service";
import {Url} from "../../url";
import sessionService from "./session.service";

function getMyList(list_name: string){
    const request = http.get<{ data: IUsersList }>('/users-list/me', {
        params: {
            list_name: list_name
        },
        headers: config?.headers
    })
    return from(request)
}

function getMyBookmarks(){
    const request = http.get<UserBookmarkResponse>(new Url('/users-bookmarks/me').path, config)
    return from(request)
}

function getAllMyLists(){
    const request =  http.get<{ data: IUsersList[] }>(new Url('/users-list/me').path, config)
    return from(request)
}

function getAll(){
    return from(http.get<IUsersListResponse>('/users-list'))
}

function updateMyList(data: Object){
    const request =  http.put<{ data: IAnime }>(new Url('/users-list/me').path, data, {
        headers: {'Content-type': 'application/json', 'Authorization': `Bearer: ${sessionService.getToken()}`}
    })
    return from(request)
}

function removeFromMyList(){
    const request =  http.delete(new Url('/users-list/me').path, config)
    return from(request)
}

function createNew(data: FormData){
    const request = http.post<UserBookmark>(new Url('/users-list').path, data, config)
    return from(request)
}

function get_lists_names(anime_id: string) {
    const request =http.get<UserBookmarks>(new Url('/users-list/anime/', anime_id + '/me').path, config)
    return from(request)
}

const UserListService = {
    getMyList,
    getAll,
    updateMyList,
    removeFromMyList,
    getAllMyLists,
    createNew,
    get_lists_names,
    getMyBookmarks
}

export default UserListService;

