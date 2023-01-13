import * as React from "react";
import {Avatar, Rating, TableCell, tableCellClasses} from "@mui/material";
import {IAnime} from "../../../types/types";
import StatusComponent from "../../status/status.component";
import IncotermComponent from "../../incoterm/incoterm.component";
import {getColumnNames} from "../../../helpers/toolls";
import {useEffect, useState} from "react";
import animeServices from "../../../sevices/anime.services";
import UserListService from "../../../sevices/user_list.services";
import {styled} from "@mui/material/styles";

/** Table Cell Props
 * @property {string} id - `Anime Id To Render`
 * @property {IAnime} cellName - `Cell Name`
 * @property {"left", "center", "right", "justify", "inherit"} align - `Table Cell Align`
 * @property {boolean} collapse - `Collapse Table`
 * @property {string} list_name - `Bookmark name`
 */
interface TableCellProps<T>{
    id: string;
    cell: T;
    cellName: string;
    align: "left" | "center" | "right" | "justify" | "inherit" | undefined;
    list_name: string;
    cells: T[];
}

function render(object: any, name: string){
    switch (name) {
        case 'quality': {
            switch (object[name]) {
                case 360: {
                    return <StatusComponent status={'Low'}/>
                }
                case 480: {
                    return <StatusComponent status={'Normal'}/>
                }
                case 720: {
                    return <StatusComponent status={'HD'}/>
                }
                case 1080: {
                    return <StatusComponent status={'HDR'}/>
                }
                default: {
                    return <StatusComponent status={'Low'}/>
                }
            }
        }
        case 'name': {
            return <IncotermComponent value={object['full_name']}/>
        }
        case 'image': {
            return <Avatar alt={object[name]} src={object[name]}/>
        }
        case 'rating': {
            return (<Rating readOnly={true} value={object[name]}/>)
        }
        case 'full_name': {
            break;
        }
        case 'subscribe': {
            break;
        }
        case 'id': {
            break;
        }
        default: {
            // @ts-ignore
            return object[name]
        }
    }
}

const StyledTableCell = styled(TableCell)(({theme})=>({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 14,
        fontFamily: ['Consolas']
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        fontFamily: ['Consolas'],
        width: 'max-content'
    },
}))

/** Table Cell Body
 *
 * @param {TableCellProps} props - `Table Cell Props`
 * @constructor
 */
export default function TableCellBodyComponent<T>(props: TableCellProps<T>) {
    // const [animeList, setAnimeList] = useState<IAnime[]>([])
    const [anime, setAnime] = useState<IAnime>({id: '', name: '', rating: 0, full_name: '',
        image: '', subscribe: false, country: '', episodes: 0, time: 0, quality: 360, release_date: ''})

    // useEffect(()=>{
    //     setAnime(props.cell)
    // }, [props.list_name, props.cell])

    return (
        <StyledTableCell align={props.align}>
            {render(props.cell, props.cellName)}
        </StyledTableCell>
    )
}