import * as React from "react";
import {Avatar, Rating, TableCell, tableCellClasses} from "@mui/material";
import {Episode, IAnime} from "../../../types/types";
import StatusComponent from "../../status/status.component";
import IncotermComponent from "../../incoterm/incoterm.component";
import {styled} from "@mui/material/styles";
import SubscribeComponent from "../../buttons/subscribe.component";
import MultipleSelectChipComponent from "../../multiple-select-chip/multiple-select-chip.component";
import RefreshAnimeButtonComponent from "../../buttons/refresh-anime-button.component";
import CollapseBoxComponent from "../collapse/collapse-box/collapse-table-cell.component";
import {Episodes} from "../../../components/anime-list/anime-list.component";

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
    all_lists: string[] | undefined;
    episodes?: Episodes;
    collapse?: boolean;
}

function render(object: any, name: string, lists: string[] | undefined,
                episode: Episodes | undefined, collapse: boolean | undefined){
    switch (name) {
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
export default class TableCellBodyComponent<T> extends React.Component<TableCellProps<T>, any> {
    constructor(props: TableCellProps<T>) {
        super(props);
    }

    render() {
        return (
            <StyledTableCell align={this.props.align}>
                {render(this.props.cell, this.props.cellName, this.props.all_lists,
                    this.props.episodes, this.props.collapse)}
            </StyledTableCell>
        );
    }
}