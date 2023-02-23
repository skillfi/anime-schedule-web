import * as React from "react";
import {Button, IconButton, TableCell, tableCellClasses} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import {useState} from "react";
import {IAnime} from "../../../types/types";
import { styled } from '@mui/material/styles';
import GenerateAnimeButtonComponent from "../../buttons/generate-anime-button.component";
import {StyledTableCell} from "./table-cell-anime.component";

/** Table Cell Props
 * @property {string} cellName - `Cell Name`
 * @property {"left", "center", "right", "justify", "inherit"} align - `Table Cell Align`
 * @property {boolean} collapse - `Collapse Table`
 */
interface TableCellProps {
    cellName: string;
    align: "left" | "center" | "right" | "justify" | "inherit" | undefined;
    collapse: boolean;
    action_button: JSX.Element;
}

function render(name: any, button: JSX.Element) {
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
        case 'Actions': {
            return button
        }
        default: {
            // @ts-ignore
            return name.charAt(0).toUpperCase() + name.slice(1)
        }
    }

}
/** Table Cell Component
 *
 * @param {TableCellProps} props - `Table Cell Props`
 * @constructor
 * @return JSX.Element
 */
export default function TableCellHeadComponent(props: TableCellProps) {
    // const [anime, setAnime] = useState<IAnime>({id: '', name: '', rating: 0, full_name: '',
    //     image: '', subscribe: false, country: '', episodes: 0, time: 0, quality: 360, release_date: ''})

    const {align, cellName, action_button} = props
    return (
        <StyledTableCell width={'max-content'}>
            {render(cellName, action_button)}
        </StyledTableCell>
    )
}