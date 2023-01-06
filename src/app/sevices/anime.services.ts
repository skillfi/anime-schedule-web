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

interface ObjectId{
    '$oid': string
}

interface Episode{
    _id: ObjectId;
    air_date: string;
    duration: number;
    episode_id: number;
    full_title: string;
    title: string
}

export interface Anime{
    _id: ObjectId;
    name: string;
    rating: number;
    episodes: number;
    release_date: string;
    country: string;
    genres: string[];
    subscribe: boolean;
    inList: string;
    quality: number;
    image: string;
    episodes_list: Episode[];
    time: number
}

export interface AnimeResponse{
    data: Anime[];
}

export interface AnimeIdResponse{
    data: Anime;
}

export interface AnimeTable{
    id?: number;
    name?: string;
    release_date?: string;
}

async function getAll(): Promise<Anime[]> {
    let data: Anime[] = [];
    try {
        const response = await http.get<AnimeResponse>('/anime')
        data = response.data.data
    }catch (e) {
        alert(e)
    }
    return data
}

const getById = (id: number) => {
    return http.get<AnimeIdResponse>('/anime'+id);
}

const create = (data: FormData) => {
    return http.post('/anime', data);
}

const update = (id: number, data: FormData) => {
    return http.put('/anime'+id, data);
}

const remove = (id: number | undefined) => {
    return http.delete('/anime/'+id);
}

const generateAnime = (data: FormData) => {
    return http.post('/generate', data)
}

async function getImage(url: string){
    let data = new Image();
    try {
        const response = await http.get(url)
        data = response.data
    }catch (e) {
        console.log(e)
    }
    return data
}

 const AnimeService = {
    getAll,
     getById,
     create,
     generateAnime,
     remove,
     update,
     getImage
}

export default AnimeService