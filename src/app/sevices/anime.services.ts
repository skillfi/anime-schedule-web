import http from "../../http-common";
import moment from "moment";
import {DotsThreeOutlineVertical} from "phosphor-react";
import {Dayjs} from "dayjs";
import * as React from "react";

export interface Genre{
    name?: string;
    id?: number;
}

export interface Update{
    added_at?: Date;
    anime_id?: number;
    episode?: number;
    id?: number;
    on_tv?: boolean;
    season?: number;
}

export interface Producer{
    name?: string;
    surname?: string;
}

const remove_anime = (event: React.MouseEvent<HTMLButtonElement>, anime_id: number) => {
    // Preventing the page from reloading
    event.preventDefault();
    // console.log(this.props.formData)

    // Do something
    AnimeService.remove(anime_id).then((res)=>{
        // console.log(res.data.data)
        // SessionService.setCurrentUser(res.data.data?.user)
        // SessionService.setToken(res.data.data?.user)
        // return document.location.replace('/menu')
    }).catch((e: Error)=> {
        console.log(e)
    })
}

export interface Anime{
    id: number;
    country?: string;
    name?: string;
    quality?: number;
    rating?: number;
    release_date: string;
    time?: string;
    url?: string;
    genres?: Genre[];
    producers?: Producer[];
    updates?: Update[];
    icon?: JSX.Element;
    date?: string;
    loading?: boolean;

}

export interface AnimeResponse{
    data: Anime[];
    readonly rows?: AnimeTable[];
    page?: number;
    rowPerPage?: number;
    open: boolean;
}

export interface AnimeTable{
    id?: number;
    name?: string;
    release_date?: string;
}

const getAll = () => {
    return http.get<AnimeResponse>('/anime')
}

const getById = (id: number) => {
    return http.get('/anime'+id);
}

const create = (data: FormData) => {
    return http.post('/anime', data);
}

const update = (id: number, data: FormData) => {
    return http.put('/anime'+id, data);
}

const remove = (id: number) => {
    return http.delete('/anime/'+id);
}

const generateAnime = (data: FormData) => {
    return http.post('/generate', data)
}

 const AnimeService = {
    getAll,
     getById,
     create,
     generateAnime,
     remove,
     update
}

export default AnimeService