import {GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {renderRating} from "@mui/x-data-grid-generator";
import {Avatar} from "@mui/material";
import {Status} from "../ui/status/status.component";
import * as React from "react";
import {Anime} from "../sevices/anime.services";

export function getColumnNames(object: Object) {
    return Object.getOwnPropertyNames(object)
}


export function renderAvatar(params: GridRenderCellParams<any, { name: string }, any>) {
    switch (params.value) {
        case null: {
            return ''
            break;
        }
        default: {
            return (<Avatar alt={params.value} src={params.value}/>
                )
            break;
        }
    }
}


function customRenderStatus(params: GridRenderCellParams<string>) {

    if (params.value == null) {
        return '';
    }

    return <Status status={params.value}/>;
}

export function generateColumns(object: object): GridColDef[] {
    let grid: GridColDef;
    let arr: GridColDef[] = [];
    getColumnNames(object).map((value) => {
        switch (value) {
            case 'rating': {
                grid = {
                    field: value,
                    headerName: value.charAt(0).toUpperCase() + value.slice(1),
                    width: 162,
                    renderCell: renderRating,
                    type: 'number'
                }
                arr.push(grid)
                break;
            }
            case 'image': {
                grid = {
                    field: value,
                    width: 100,
                    headerName: value.charAt(0).toUpperCase() + value.slice(1),
                    renderCell: renderAvatar
                }
                arr.push(grid)
                break;
            }
            case 'quality': {
                grid = {
                    field: value,
                    width: 100,
                    headerName: value.charAt(0).toUpperCase() + value.slice(1),
                    renderCell: customRenderStatus,
                    type: 'number'
                }
                arr.push(grid)
                break;
            }
            case 'subscribe': {
                grid = {
                    field: value,
                    width: 50,
                    headerName: value.charAt(0).toUpperCase() + value.slice(1),
                    type: 'boolean'
                }
                arr.push(grid)
                break;
            }
            default: {
                grid = {
                    field: value,
                    headerName: value.charAt(0).toUpperCase() + value.slice(1),
                    width: 160
                }
                arr.push(grid)
            }
        }
    })
    return arr
}

interface AnimeRows {
    name: boolean;
    quality: boolean;
    rating: boolean;
    release_date: boolean;
}

export function rowCustomisation(rows: Anime[], animeRows?: AnimeRows) {
    let ar: any[] = []
    rows.map((row, index) => {
        switch (true) {
            case (row.quality <= 360): {
                ar.push({
                    id: index,
                    image: row.image,
                    name: row.name,
                    country: row.country,
                    episodes: row.episodes,
                    quality: 'Low',
                    rating: row.rating,
                    release_date: row.release_date,
                    time: row.time,
                    actions: ''
                })
                break;
            }
            case (row.quality <= 480): {
                ar.push({
                    id: index,
                    image: row.image,
                    name: row.name,
                    country: row.country,
                    episodes: row.episodes,
                    quality: 'Good',
                    rating: row.rating,
                    release_date: row.release_date,
                    time: row.time,
                })
                break;
            }
            case (row.quality <= 720): {
                ar.push({
                    id: index,
                    image: row.image,
                    name: row.name,
                    country: row.country,
                    episodes: row.episodes,
                    quality: 'HD',
                    rating: row.rating,
                    release_date: row.release_date,
                    time: row.time,
                })
                break;
            }
            case (row.quality <= 1080): {
                ar.push({
                    id: index,
                    image: row.image,
                    name: row.name,
                    country: row.country,
                    episodes: row.episodes,
                    quality: 'HDR',
                    rating: row.rating,
                    release_date: row.release_date,
                    time: row.time,
                })
                break;
            }
        }
    })
    return ar
}