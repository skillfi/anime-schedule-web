import * as React from "react";
import {Avatar, Chip, Rating, Stack, TableCell, tableCellClasses} from "@mui/material";
import StatusComponent from "../../status/status.component";
import IncotermComponent from "../../incoterm/incoterm.component";
import {styled} from "@mui/material/styles";
import SubscribeComponent from "../../buttons/subscribe.component";
import MultipleSelectChipComponent from "../../multiple-select-chip/multiple-select-chip.component";
import RefreshAnimeButtonComponent from "../../buttons/refresh-anime-button.component";
import UpdateImageAnimeButtonComponent from "../../buttons/update-image-anime-button.component";
import DeleteAnimeButtonComponent from "../../buttons/delete-anime-button.component";
import OpenAnimePageButtonComponent from "../../buttons/open-anime-page-button.component";
import {IAnime} from "../../../types/types";
import {Tools} from "../../../../tools";

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
    cell: IAnime;
    cellName: string;
    align: "left" | "center" | "right" | "justify" | "inherit" | undefined;
    list_name: string;
    all_lists: string[];
    buttons?: JSX.Element;
    actions: string[]
}

function renderActions(action: JSX.Element) {
    return action
}

export function renderTags(tag: JSX.Element){
    return tag
}

function render(object: IAnime, name: string, lists: string[], actions: string[],element?: JSX.Element ) {
    switch (name) {
        case 'quality': {
            switch (object[name]) {
                case 360: {
                    return <StatusComponent status={'Low'} quality={Tools.getProperty(object, name, object[name])}/>
                }
                case 480: {
                    return <StatusComponent status={'Normal'} quality={Tools.getProperty(object, name, object[name])}/>
                }
                case 720: {
                    return <StatusComponent status={'HD'} quality={Tools.getProperty(object, name, object[name])}/>
                }
                case 1080: {
                    return <StatusComponent status={'HDR'} quality={Tools.getProperty(object, name, object[name])}/>
                }
                default: {
                    return <StatusComponent status={'Low'} quality={Tools.getProperty(object, name, object[name])}/>
                }
            }
        }
        case 'title_en': {
            return <IncotermComponent value={Tools.getProperty(object, 'full_title', object['title'])}/>
        }
        case 'image': {
            return <Avatar alt={object[name]} src={Tools.getProperty(object, name, object[name])}/>
        }
        case 'rating': {
            return <Rating readOnly={true} value={Tools.getProperty(object, name, object[name])/2} size={"small"} sx={{paddingBottom: 2}}/>
        }
        case 'title': {
            break;
        }
        case 'title_jp': {
            break;
        }
        case 'subscribe': {
            return <SubscribeComponent value={Tools.getProperty(object, name, object[name])} row_id={object['_id']}/>;
        }
        case 'id': {
            break;
        }
        case 'admin': {
            break;
        }
        case 'episodes': {
            return element
        }
        case 'actions': {
            let elements: JSX.Element[] = []
            actions.map((name)=>{
                switch (name) {
                    case 'refresh': {
                        elements.push(<RefreshAnimeButtonComponent row_id={object['_id']} url={object['url']} key={1}/>)
                        break;
                    }
                    case 'update':{
                        elements.push(<UpdateImageAnimeButtonComponent row_id={object['_id']} url={object['url']} key={2}/>)
                        break;
                    }
                    case 'delete': {
                        elements.push(<DeleteAnimeButtonComponent row_id={object['_id']} key={3}/>)
                        break;
                    }
                    case 'navigate': {
                        elements.push(<OpenAnimePageButtonComponent row_id={object['_id']} object={object} key={4}/>)
                        break;
                    }
                }
            })
            return <React.Fragment>
                {elements.map(renderActions)}
            </React.Fragment>
        }
        case 'bookmarks':
            return <MultipleSelectChipComponent bookmarks={Tools.getProperty(object, name, object[name])} all_bookmarks={lists} row_id={object['_id']}/>
        case 'tags': {
            let tags: JSX.Element[] = []
            object[name].map((tag)=>{
                tags.push(<Chip label={tag}/>)
            })
            return <Stack>
                {tags.map(renderTags)}
            </Stack>
        }
        default: {
            return Tools.getProperty(object, name)
        }
    }
}

export const StyledTableCell = styled(TableCell)(({theme})=>({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 12,
        fontFamily: ['Consolas'],
        textAlign: 'center'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
        fontFamily: ['Consolas'],
        textAlign: 'center'
    },
}))

/** Table Cell Body
 *
 * @param {TableCellProps} props - `Table Cell Props`
 * @constructor
 */
export default class TableCellAnimeComponent<T> extends React.Component<TableCellProps<T>, any> {
    constructor(props: TableCellProps<T>) {
        super(props);
    }

    render() {
        return (
            <StyledTableCell sx={{width: 50}}>
                {render(this.props.cell, this.props.cellName, this.props.all_lists, this.props.actions, this.props.buttons)}
            </StyledTableCell>
        );
    }
}