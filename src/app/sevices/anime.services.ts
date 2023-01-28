import http from "../../http-common";
import {Episode, IAnime} from "../types/types";
import {environment} from "../../environments/environment";
import {from} from "rxjs";
import {Url} from "../../url";

function getAll() {
    return from(http.get<{ data: IAnime[] }>(environment.apiUrl + '/anime'))
}

function getById(id: any) {
    return from(http.get<{ data: IAnime }>(environment.apiUrl + '/anime/' + id));
}

async function getByIdAsync(id: string) {
    return await http.get<{ data: IAnime }>(environment.apiUrl + '/anime/' + id);
}

function create(data: FormData) {
    return http.post(environment.apiUrl + '/anime', data);
}

function update(id: string, data: FormData) {
    const promise =  http.put('/anime/' + id, data);
    return from(promise)
}

function remove(id: string) {
    return from(http.delete<{data: number}>(environment.apiUrl + '/anime/' + id));
}

function generateAnime(data: FormData) {
    return from(http.post<{ data: IAnime }>(environment.apiUrl + '/anime/generate', data));
}

function subscribe(data: FormData){
    return from(http.post(environment.apiUrl + '/subscribes', data));
}

function unsubscribe(anime_id: string){
    return from(http.delete(environment.apiUrl + `/subscribe/anime/${anime_id}/me`))
}

function getEpisodes(){
    return from(http.get<{ data: Episode[] }>(new Url('/updates').path))
}
function getEpisodesByAnimeId(anime_id: string){
    return from(http.get<{ data: Episode[] }>(new Url('/updates/anime/',anime_id).path))
}

function viewEpisode(episode_id: string) {
    return from(http.put<{data: Episode}>(new Url('/anime/view/episode/', episode_id).path))
}
function un_viewEpisode(episode_id: string) {
    return from(http.put<{data: Episode}>(new Url('/anime/un-view/episode/', episode_id).path))
}

function getEpisode(episode_id: string) {
    return from(http.get<{data: Episode}>(new Url('/episode/', episode_id).path))
}

 const AnimeService = {
    getAll,
     getById,
     create,
     generateAnime,
     remove,
     update,
     subscribe,
     unsubscribe,
     getByIdAsync,
     getEpisodes,
     getEpisodesByAnimeId,
     viewEpisode,
     un_viewEpisode,
     getEpisode
}

export default AnimeService