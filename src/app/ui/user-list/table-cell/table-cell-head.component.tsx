import * as React from "react";
import {TableCell, tableCellClasses} from "@mui/material";
import {useState} from "react";
import {IAnime} from "../../../types/types";
import { styled } from '@mui/material/styles';

/** Table Cell Props
 * @property {string} cellName - `Cell Name`
 * @property {"left", "center", "right", "justify", "inherit"} align - `Table Cell Align`
 * @property {boolean} collapse - `Collapse Table`
 */
interface TableCellProps {
    cellName: string;
    align: "left" | "center" | "right" | "justify" | "inherit" | undefined;
    collapse: boolean;
}

function render(name: string) {
    switch (name) {
        case 'full_name': {
            break;
        }
        case 'subscribe': {
            break;
        }
        case 'id': {
            break;
        }
        case 'release_date':
            return 'Release Date'
        default: {
            // @ts-ignore
            return name.charAt(0).toUpperCase() + name.slice(1)
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
        fontFamily: ['Consolas']
    },
}))
/** Table Cell Component
 *
 * @param {TableCellProps} props - `Table Cell Props`
 * @constructor
 * @return JSX.Element
 */
export default function TableCellHeadComponent(props: TableCellProps) {
    // const [anime, setAnime] = useState<IAnime>({id: '', name: '', rating: 0, full_name: '',
    //     image: '', subscribe: false, country: '', episodes: 0, time: 0, quality: 360, release_date: ''})

    return (
        <StyledTableCell align={props.align} width={'max-content'}>
            {render(props.cellName)}
        </StyledTableCell>
    )
}