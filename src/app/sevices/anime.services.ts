import http from "../../http-common";
import {Episode, IAnime} from "../types/types";
import {environment} from "../../environments/environment";
import {from} from "rxjs";
import {Url} from "../../url";
import {config} from "./login.service";


function getAll() {
    const request = http.get<{ data: IAnime[] }>(new Url('/anime').path, config)
    return from(request)
}

function getById(id: any) {
    const request =  http.get<{ data: IAnime }>(new Url('/anime/', id).path, config);
    return from(request)
}

async function getByIdAsync(id: string) {
    return await http.get<{ data: IAnime }>(new Url('/anime/', id).path, config);
}

function create(data: FormData) {
    return http.post(new Url('/anime').path, data, config);
}

function update(id: string, data: FormData) {
    const promise = http.put(new Url('/anime/', id).path, data, config);
    return from(promise)
}

function remove(id: string) {
    const request =  http.delete<{ data: number }>(new Url('/anime/', id).path, config)
    return from(request)
}

function generateAnime(data: FormData) {
    const request = http.post<{ data: IAnime }>(new Url('/generate/anime').path, data, config)
    return from(request)
}

function subscribe(data: FormData) {
    const request =  http.post(new Url('/subscribes').path, data, config)
    return from(request)
}

function unsubscribe(anime_id: string){
    const request = http.delete(new Url('/subscribe/anime/', anime_id + '/me').path, config)
    return from(request)
}

function getEpisodes(){
    const request =  http.get<{ data: Episode[] }>(new Url('/updates').path, config)
    return from(request)
}
function getEpisodesByAnimeId(anime_id: string){
    const request =  http.get<{ data: Episode[] }>(new Url('/updates/anime/',anime_id).path, config)
    return from(request)
}

function viewEpisode(episode_id: string) {
    const request = http.put<{data: Episode}>(new Url('/anime/view/episode/', episode_id).path, config)
    return from(request)
}
function un_viewEpisode(episode_id: string) {
    const request = http.put<{data: Episode}>(new Url('/anime/un-view/episode/', episode_id).path, config)
    return from(request)
}

function getEpisode(episode_id: string) {
    const request = http.get<{data: Episode}>(new Url('/episode/', episode_id).path, config)
    return from(request)
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