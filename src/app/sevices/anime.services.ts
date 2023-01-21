import http from "../../http-common";
import * as React from "react";
import {
    AnimeIdResponse,
    AnimeResponse,
    Episode,
    EpisodeResponse,
    EpisodesResponse,
    IAnime,
    UserAnimeProps
} from "../types/types";
import {environment} from "../../environments/environment";
import {from, of} from "rxjs";

function remove_anime(event: React.MouseEvent<HTMLButtonElement>, anime_id: number) {
    // Preventing the page from reloading
    event.preventDefault();
    // console.log(this.props.formData)

    // Do something
    AnimeService.remove(anime_id).subscribe((response) => {
        // console.log(res.data.data)
        // SessionService.setCurrentUser(res.data.data?.user)
        // SessionService.setToken(res.data.data?.user)
        // return document.location.replace('/menu')
    })
}



export interface AnimeTable{
    id?: number;
    name?: string;
    release_date?: string;
}

function getAll() {
    return from(http.get<AnimeResponse>(environment.apiUrl + '/anime'))
}

function getById(id: string) {
    return from(http.get<AnimeIdResponse>(environment.apiUrl + '/anime/' + id));
}

async function getByIdAsync(id: string) {
    return await http.get<AnimeIdResponse>(environment.apiUrl + '/anime/' + id);
}

function create(data: FormData) {
    return http.post(environment.apiUrl + '/anime', data);
}

function update(id: string, data: FormData) {
    const promise =  http.put('/anime/' + id, data);
    return from(promise)
}

function remove(id: number | undefined) {
    return from(http.delete(environment.apiUrl + '/anime/' + id));
}

function generateAnime(data: FormData) {
    return from(http.post<IAnime>(environment.apiUrl + '/anime/generate', data));
}

function subscribe(data: FormData){
    return from(http.post(environment.apiUrl + '/subscribes', data));
}

function getSubscribe(row: IAnime[]){
    let userProps: UserAnimeProps[] = [];
    row.map((anime)=>{
        from(http.get<{data: boolean}>(environment.apiUrl + `/subscribe/anime/${anime.id}/me`))
            .subscribe((response)=>{
                userProps.push({subscription: response.data.data})
            }, ((e)=>alert(e)))
    })
    return userProps
}

function unsubscribe(anime_id: string){
    return from(http.delete(environment.apiUrl + `/subscribe/anime/${anime_id}/me`))
}

function getEpisodes(){
    return from(http.get<EpisodesResponse>('/updates'))
}
function getEpisodesByAnimeId(anime_id: string){
    return from(http.get<EpisodeResponse>('/updates/anime/'+anime_id))
}

 const AnimeService = {
    getAll,
     getById,
     create,
     generateAnime,
     remove,
     update,
     subscribe,
     getSubscribe,
     unsubscribe,
     getByIdAsync,
     getEpisodes,
     getEpisodesByAnimeId
}

export default AnimeService