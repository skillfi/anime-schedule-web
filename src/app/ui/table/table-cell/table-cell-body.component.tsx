import * as React from "react";
import {Avatar, Rating, TableCell, tableCellClasses} from "@mui/material";
import StatusComponent from "../../status/status.component";
import IncotermComponent from "../../incoterm/incoterm.component";
import {styled} from "@mui/material/styles";
import SubscribeComponent from "../../subscribe/subscribe.component";
import MultipleSelectChipComponent from "../../multiple-select-chip/multiple-select-chip.component";
import RefreshAnimeButtonComponent from "../../buttons/refresh-anime-button.component";
import UpdateImageAnimeButtonComponent from "../../buttons/update-image-anime-button.component";

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
    cell: T;
    cellName: string;
    align: "left" | "center" | "right" | "justify" | "inherit" | undefined;
    list_name: string;
    all_lists: string[] | undefined;
    buttons?: JSX.Element;
}

function render(object: any, name: string, lists: string[] | undefined, element?: JSX.Element) {
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
            return (<div style={{alignContent: 'center'}}><Rating readOnly={true} value={object[name]/2}/>{object[name]}
            </div>)
        }
        case 'full_name': {
            break;
        }
        case 'subscribe': {
            return <SubscribeComponent value={object[name]} row_id={object['id']}/>;
        }
        case 'id': {
            break;
        }
        case 'admin': {
            break;
        }
        case 'episodes': {
            return <div>{element} <code>{object['episodes_list'].length} / {object[name]}</code></div>
        }
        case 'actions': {
            return <React.Fragment>
                <RefreshAnimeButtonComponent row_id={object['id']} url={object['url']}/>
                <UpdateImageAnimeButtonComponent row_id={object['id']} url={object['url']}/>
            </React.Fragment>
        }
        case 'bookmarks':
            return <MultipleSelectChipComponent bookmarks={object[name]} all_bookmarks={lists} row_id={object['id']}/>
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
                {render(this.props.cell, this.props.cellName, this.props.all_lists, this.props.buttons)}
            </StyledTableCell>
        );
    }
}