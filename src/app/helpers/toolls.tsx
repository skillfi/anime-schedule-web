import {GridColDef, GridColumns, GridRenderCellParams} from "@mui/x-data-grid";
import {renderRating} from "@mui/x-data-grid-generator";
import {Avatar, IconButton} from "@mui/material";
import StatusComponent from "../ui/status/status.component";
import * as React from "react";
import {useEffect, useState} from "react";
import {IAnime, UserAnimeProps} from "../types/types";
import {TouchRippleActions} from "@mui/material/ButtonBase/TouchRipple";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import animeServices from "../sevices/anime.services";
import IncotermComponent from "../ui/incoterm/incoterm.component";

export function getColumnNames<T>(object: T): string[] {
    return Object.getOwnPropertyNames(object)
}

export function renderIncoterm(params: GridRenderCellParams<any, string | any, any>) {
    return <IncotermComponent value={params.value}/>;
}

export function renderAvatar(params: GridRenderCellParams<any, { name: string }, any>) {
    switch (params.value) {
        case null: {
            return ''
            break;
        }
        default: {
            return (<Avatar alt={params.value} src={params.value}/>)
            break;
        }
    }
}


function customRenderStatus(params: GridRenderCellParams<string>) {

    if (params.value == null) {
        return '';
    }

    return <StatusComponent status={params.value}/>;
}

const RenderSubscribe = (props: GridRenderCellParams<boolean>) => {
    const {value, row} = props;
    const buttonElement = React.useRef<HTMLButtonElement | null>(null);
    const rippleRef = React.useRef<TouchRippleActions | null>(null);
    const [sub, setSub] = useState<boolean>(false)

    function subscribe(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        let data = new FormData()
        data.append('anime_id', row.anime_id)
        animeServices.subscribe(data).subscribe((response) => {
            setSub(true)
        })
    }

    function unsubscribe(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        animeServices.unsubscribe(row.anime_id).subscribe((response) => {
            setSub(false)
        })
    }

    useEffect(() => {
        animeServices.getById(row.anime_id).subscribe((response) => {
            setSub(response.data.data.subscribe)
        })
    }, [sub])

    return (
        <strong defaultValue={row.anime_id}>
            {value}
            {sub ? <IconButton defaultValue={row.anime_id}
                               onClick={unsubscribe}
                               color={"secondary"}><RemoveIcon/></IconButton> : <IconButton onClick={subscribe}
                                                                                            defaultValue={row.anime_id}
                                                                                            color={'secondary'}>
                <AddIcon/>
            </IconButton>}
        </strong>
    )
}

export function f() {
    
}

export function generateColumns(object: IAnime, row: IAnime[]): GridColumns {
    let grid: GridColDef;
    let arr: GridColumns = [];
    let options: string[] = [];
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
                // return grid
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
                // return grid;
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
                // return grid
                break;
            }
            case 'full_name': {
                grid = {
                    field: value,
                    headerName: 'Name',
                    renderCell: renderIncoterm,
                    valueOptions: options,
                    width: 140,
                    type: 'singleSelect'
                }
                arr.push(grid)
                break;
            }
            case 'subscribe': {
                grid = {
                    field: value,
                    width: 100,
                    headerName: value.charAt(0).toUpperCase() + value.slice(1),
                    type: 'boolean',
                    renderCell: RenderSubscribe
                }
                arr.push(grid)
                // return grid
                break;
            }
            case 'name': {
                // return grid/
                break
            }
            case 'anime_id': {
                // return grid/
                break
            }
            default: {
                grid = {
                    field: value,
                    headerName: value.charAt(0).toUpperCase() + value.slice(1),
                    width: 100
                }
                arr.push(grid)
                // return grid
            }
        }
    })
    return arr
}

export function rowCustomisation(rows: IAnime[], userProps?: UserAnimeProps[]) {
    let ar: any[] = []
    let subscribe: boolean = false;
    rows.map((row, index) => {
        switch (true) {
            case (row.quality <= 360): {
                ar.push({
                    id: index,
                    _id: index,
                    image: row.image,
                    full_name: row.full_name,
                    country: row.country,
                    episodes: row.episodes,
                    quality: 'Low',
                    rating: row.rating,
                    release_date: row.release_date,
                    time: row.time,
                    actions: '',
                    anime_id: row.id,
                    subscribe: row.subscribe
                })
                break;
            }
            case (row.quality <= 480): {
                ar.push({
                    id: index,
                    _id: index,
                    image: row.image,
                    full_name: row.full_name,
                    country: row.country,
                    episodes: row.episodes,
                    quality: 'Good',
                    rating: row.rating,
                    release_date: row.release_date,
                    time: row.time,
                    anime_id: row.id,
                    subscribe: row.subscribe
                })
                break;
            }
            case (row.quality <= 720): {
                ar.push({
                    id: index,
                    _id: index,
                    image: row.image,
                    full_name: row.full_name,
                    country: row.country,
                    episodes: row.episodes,
                    quality: 'HD',
                    rating: row.rating,
                    release_date: row.release_date,
                    time: row.time,
                    anime_id: row.id,
                    subscribe: row.subscribe
                })
                break;
            }
            case (row.quality <= 1080): {
                ar.push({
                    id: index,
                    _id: index,
                    image: row.image,
                    full_name: row.full_name,
                    country: row.country,
                    episodes: row.episodes,
                    quality: 'HDR',
                    rating: row.rating,
                    release_date: row.release_date,
                    time: row.time,
                    anime_id: row.id,
                    subscribe: row.subscribe
                })
                break;
            }
        }

    })
    return ar
}