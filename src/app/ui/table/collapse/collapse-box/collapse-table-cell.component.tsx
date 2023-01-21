import {Episode, IAnime} from "../../../../types/types";
import * as React from "react";
import TableCellBodyComponent from "../../table-cell/table-cell-body.component";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import {Collapse, IconButton} from "@mui/material";
import {StyledTableCell, StyledTableRow} from "../../table-row/table-row-body.component";
import {Episodes} from "../../../../components/anime-list/anime-list.component";
import TableEpisodeComponent from "../../table-episode.component";

interface RowProps<T> {
    cell: T;
    anime?: IAnime;
    lists?: string[];
    box_name: string;
    episodes?: Episodes[]
    type?: string;
}

export default class Row<T> extends React.Component<RowProps<T>,
    { episodeOn: boolean, page: number, rowPerPage: number, episode: Episode[] }> {
    // const {cell, anime, lists, box_name, episodes} = props
    // const [episodeOn, setEpisode] = useState<boolean>(false)
    // const [page, setPage] = useState<number>(1)
    // const [rowPerPage, setRowRePage] = useState<number>(5)
    // const [episode, setEpisodes] = useState<Episode[]>([])

    constructor(props: RowProps<T>) {
        super(props);
        this.state = {episodeOn: false, page: 1, rowPerPage: 5, episode: []}
        this.generateColumns = this.generateColumns.bind(this)
        this.onOpen = this.onOpen.bind(this)
    }


    generateColumns(type: string): string[] {
        switch (type) {
            case 'Episodes': {
                return ['Episode_Id', 'Air_Date', 'Title']
            }
            default: {
                return ['']
            }
        }
    }

    onOpen() {
        this.setState({episodeOn: !this.state.episodeOn})
    }


    render() {
        return (
            <React.Fragment>
                <StyledTableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                    <TableCellBodyComponent cell={this.props.cell} cellName={'image'} align={'center'} list_name={''}
                                            all_lists={this.props.lists}/>
                    <TableCellBodyComponent cell={this.props.cell} cellName={'name'} align={'center'} list_name={''}
                                            all_lists={this.props.lists}/>
                    {/*<TableCellBodyComponent cell={cell} cellName={'full_name'} align={'center'} list_name={''} all_lists={lists}/>*/}
                    <TableCellBodyComponent cell={this.props.cell} cellName={'quality'} align={'center'} list_name={''}
                                            all_lists={this.props.lists}/>
                    <TableCellBodyComponent cell={this.props.cell} cellName={'episodes'} align={'center'}
                                            list_name={''} all_lists={this.props.lists} buttons={
                        <IconButton onClick={this.onOpen}>
                            <ConfirmationNumberIcon/>
                            {/*{this.state.episode.length} / {this.props.anime?.episodes}*/}
                        </IconButton>
                    }/>
                    <TableCellBodyComponent cell={this.props.cell} cellName={'rating'} align={'center'} list_name={''}
                                            all_lists={this.props.lists}/>
                    <TableCellBodyComponent cell={this.props.cell} cellName={'subscribe'} align={'center'}
                                            list_name={''} all_lists={this.props.lists}/>
                    {this.props.type == 'anime_list' ? <TableCellBodyComponent
                        cell={this.props.cell} cellName={'bookmarks'} align={'center'} list_name={''}
                        all_lists={this.props.lists}/>: null}
                    {this.props.type == 'anime_list' ? <TableCellBodyComponent cell={this.props.cell} cellName={'actions'} align={'center'} list_name={''}
                                                                               all_lists={this.props.lists}/>: null}

                </StyledTableRow>
                <StyledTableRow>
                    <StyledTableCell colSpan={6}>
                        <Collapse in={this.state.episodeOn} timeout={"auto"} unmountOnExit={true}>
                            <TableEpisodeComponent rows={
                                typeof this.props.anime?.episodes_list == 'undefined' ? [] : this.props.anime?.episodes_list}
                                                   columns={this.generateColumns('Episodes')}/>
                        </Collapse>
                    </StyledTableCell>
                </StyledTableRow>
            </React.Fragment>
        );
    }

}