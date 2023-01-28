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

function getMyList(list_name: string){
    return from(http.get<{ data: IUsersList }>('/users-list/me', {
        params: {
            list_name: list_name
        }
    }))
}

function getMyBookmarks(){
    return from(http.get<UserBookmarkResponse>('/users-bookmarks/me'))
}

function getAllMyLists(){
    return from(http.get<{ data: IUsersList[] }>('/users-list/me'))
}

function getAll(){
    return from(http.get<IUsersListResponse>('/users-list'))
}

function updateMyList(data: Object){
    return from(http.put<{ data: IAnime }>('/users-list/me', data, {
        headers: {'Content-type': 'application/json'}
    }))
}

function removeFromMyList(data: FormData){
    return from(http.delete('/users-list/me'))
}

function createNew(data: FormData){
    return from(http.post<UserBookmark>('/users-list', data))
}

function get_lists_names(anime_id: string) {
    return from(http.get<UserBookmarks>(`/users-list/anime/${anime_id}/me`))
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

