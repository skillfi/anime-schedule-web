import {Episode, IAnime} from "../../../../types/types";
import * as React from "react";
import TableCellEpisodesComponent from "../../table-cell/table-cell-episodes.component";
import {Collapse, IconButton} from "@mui/material";
import {StyledTableCell, StyledTableRow} from "../../table-row/table-row-body.component";
import {Episodes} from "../../../../components/anime-list/anime-list.component";
import TableEpisodeComponent from "../../table-episode.component";
import {Tools} from "../../../../../tools";
import EpisodePlayerButtonComponent from "../../../buttons/episode-player-button.component";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import AnimeServices from "../../../../sevices/anime.services";
import {finalize} from "rxjs";

interface RowProps<T> {
    cell: Episode;
    anime?: IAnime;
    episodes?: Episode[]
    type?: string;
}

export default class EpisodeRow<T> extends React.Component<RowProps<T>,
    { episodeOn: boolean, page: number, rowPerPage: number, episode: Episode[], visible: boolean, url: string }> {

    constructor(props: RowProps<T>) {
        super(props);
        this.state = {episodeOn: false, page: 1, rowPerPage: 5, episode: [], visible: false, url: this.props.cell.iframe}
        this.generateColumns = this.generateColumns.bind(this)
        this.onOpen = this.onOpen.bind(this)
    }


    generateColumns(type: string): string[] {
        switch (type) {
            case 'Episodes': {
                return ['Episode_Id', 'Air_Date', 'Title', 'Viewed', 'Iframe']
            }
            default: {
                return ['']
            }
        }
    }

    onOpen() {
        AnimeServices.uploadEpisode(this.props.cell._id)
            .pipe(finalize(() => {
                this.setState({visible: false, episodeOn: !this.state.episodeOn})
            }))
            .subscribe((response) => {
                this.setState({visible: true, url: response.data.data.iframe})
            })
    }

    render() {
        return (
            <React.Fragment>
                <StyledTableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                    <TableCellEpisodesComponent cell={this.props.cell} cellName={'episode_id'} align={'center'}/>
                    <TableCellEpisodesComponent cell={this.props.cell} cellName={'air_date'} align={'center'}/>
                    <TableCellEpisodesComponent cell={this.props.cell} cellName={'title'} align={'center'}/>
                    <TableCellEpisodesComponent cell={this.props.cell} cellName={'viewed'} align={'center'}/>
                    <TableCellEpisodesComponent cell={this.props.cell} cellName={'iframe'} align={'center'}
                                                buttons={
                                                    <IconButton onClick={() => this.onOpen()}>
                                                        <SmartDisplayIcon/>
                                                    </IconButton>
                                                }/>
                </StyledTableRow>
                <StyledTableRow>
                    <StyledTableCell colSpan={10}>
                        <Collapse in={this.state.episodeOn} timeout={"auto"} unmountOnExit={true}>

                            <iframe src={this.state.url} width={'100%'} height={500} frameBorder={'0'} allowFullScreen>
                                <video preload={'none'} src={this.state.url} disableRemotePlayback={true}
                                       style={{position: "static", width: '100%', height: '100%', objectFit: 'contain',
                                           transition: 'filter 0.2s linear 0s', minHeight: 'auto', maxHeight: 'none', minWidth: 'auto', maxWidth: 'none'}}/>
                            </iframe>
                        </Collapse>
                    </StyledTableCell>
                </StyledTableRow>
            </React.Fragment>
        );
    }

}