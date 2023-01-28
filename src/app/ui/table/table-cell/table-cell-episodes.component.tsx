import * as React from "react";
import {Chip, TableCell, tableCellClasses} from "@mui/material";
import {styled} from "@mui/material/styles";
import {Episode} from "../../../types/types";
import {orange, red} from "@mui/material/colors";
import ChipEpisodeComponent from "../../chips/chip-episode.component";
import ViewEpisodeComponent from "../../buttons/view-episode.component";

/** Table Cell Props
 * @property {string} id - `Anime id To Render`
 * @property {T} cell - `Cell Object`
 * @property {string} cellName - `Cell Name`
 * @property {"left", "center", "right", "justify", "inherit"} align - `Table Cell Align`
 * @property {string} list_name - `Bookmark name`
 * @property {Array<string>} all_lists - `All Existed Lists`
 */
interface TableCellProps<T> {
    /** Object to get params
     * @default T
     */
    cell: Episode;
    cellName: string;
    align: "left" | "center" | "right" | "justify" | "inherit" | undefined;
    list_name: string;
}

const EpisodeChip = styled(Chip)(({theme})=> ({
    ':hover': {
        color: red[500],
        fontSize: 10
    },
    color: orange[500],
    fontFamily: 'Consolas',
    fontSize: 12,
    borderColor: red[500]
}))

function render(object: Episode, name: string) {
    switch (name) {
        case 'episode_id': {
            return <ChipEpisodeComponent _id={object["_id"]} label={object[name]}/>
        }
        case 'duration': {
            break;
        }
        case 'air_date': {
            const air_date = new Date(object[name])
            return air_date.toDateString()
        }
        case 'viewed': {
            return <ViewEpisodeComponent viewers={object[name]} row_id={object['_id']} view={object['view']}/>;
        }
        case 'id': {
            break;
        }
        case 'admin': {
            break;
        }
        case 'title': {
            const now = new Date()
            const air_date = new Date(object.air_date)
            if (air_date <= now){
                return <span style={{color: 'black'}}><b>{object[name]}</b></span>
            }
            else {
                return <span style={{color: 'grey'}}>{object[name]}</span>
            }

        }case 'full_title': {
            const now = new Date()
            const air_date = new Date(object.air_date)
            if (air_date <= now){
                return <span style={{color: 'black'}}><b>{object[name]}</b></span>
            }
            else {
                return <span style={{color: 'grey'}}>{object[name]}</span>
            }

        }
        default: {
            // @ts-ignore
            return object[name]
        }
    }
}

const StyledTableCell = styled(TableCell)(({theme}) => ({
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
export default class TableCellEpisodesComponent<T> extends React.Component<TableCellProps<T>, any> {
    constructor(props: TableCellProps<T>) {
        super(props);
    }

    render() {
        return (
            <StyledTableCell align={this.props.align}>
                {render(this.props.cell, this.props.cellName)}
            </StyledTableCell>
        );
    }
}