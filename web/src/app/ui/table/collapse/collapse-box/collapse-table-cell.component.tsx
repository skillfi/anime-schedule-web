import {Episode, IAnime} from "../../../../types/types";
import * as React from "react";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import {Collapse, IconButton} from "@mui/material";
import {StyledTableCell, StyledTableRow} from "../../table-row/table-row-body.component";
import {Episodes} from "../../../../components/anime-list/anime-list.component";
import TableEpisodeComponent from "../../table-episode.component";
import TableCellAnimeComponent from "../../table-cell/table-cell-anime.component";

interface RowProps<T> {
    cell: IAnime;
    anime?: IAnime;
    lists: string[];
    box_name: string;
    episodes?: Episode[]
    type?: string;
    actions: string[]
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
        this.getEpisode = this.getEpisode.bind(this)
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
        this.setState({episodeOn: !this.state.episodeOn})
    }

    getEpisode(episodes: Episode[]) {
        let episode_aut: Episode[] = []
        const now = new Date()
        episodes.map((episode) => {
            const air_date = new Date(episode.air_date)
            if (air_date < now && Number(episode.eid)) {
                episode_aut.push(episode)
            }
        })
        return episode_aut.length
    }

    getNoEpisode(episodes: Episode[]) {
        let episode_outcasts: Episode[] = []
        const now = new Date()
        episodes.map((episode) => {
            const air_date = new Date(episode.air_date)
            if (air_date < now && episode.eid.toString().includes('S') || episode.eid.toString().includes('OP') || episode.eid.toString().includes('C') || episode.eid.toString().includes('ED')) {
                episode_outcasts.push(episode)
            }
        })
        return episode_outcasts.length
    }


    render() {
        return (
            <React.Fragment>
                <StyledTableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                    <TableCellAnimeComponent cell={this.props.cell} cellName={'image'} align={'center'} list_name={''}
                                             all_lists={this.props.lists} actions={[]}/>
                    <TableCellAnimeComponent cell={this.props.cell} cellName={'title_en'} align={'center'}
                                             list_name={''}
                                             all_lists={this.props.lists} actions={[]}/>
                    {/*<TableCellEpisodesComponent cell={cell} cellName={'full_name'} align={'center'} list_name={''} all_lists={lists}/>*/}
                    <TableCellAnimeComponent cell={this.props.cell} cellName={'quality'} align={'center'} list_name={''}
                                                all_lists={this.props.lists} actions={[]}/>
                    <TableCellAnimeComponent cell={this.props.cell} cellName={'episodes'} align={'center'}
                                                list_name={''} all_lists={this.props.lists} buttons={
                        <IconButton onClick={this.onOpen} size={'small'} sx={{fontFamily: 'Consolas', fontSize: 15}}>
                            <ConfirmationNumberIcon/> {this.getEpisode(this.props.cell.episode)} ({this.getNoEpisode(this.props.cell.episode)})
                            / {this.props.cell.episodes}
                        </IconButton>
                    } actions={[]}/>
                    <TableCellAnimeComponent cell={this.props.cell} cellName={'rating'} align={'center'} list_name={''}
                                             all_lists={this.props.lists} actions={[]}/>
                    <TableCellAnimeComponent cell={this.props.cell} cellName={'subscribe'} align={'center'}
                                             list_name={''} all_lists={this.props.lists} actions={[]}/>
                    {this.props.type == 'admin' ? null : <TableCellAnimeComponent
                        cell={this.props.cell} cellName={'bookmarks'} align={'center'} list_name={''}
                        all_lists={this.props.lists} actions={[]}/>}
                    <TableCellAnimeComponent cell={this.props.cell} cellName={'actions'} align={'center'}
                                             list_name={''}
                                             all_lists={this.props.lists} actions={this.props.actions}/>
                    {/*{this.props.type == 'admin' ?*/}
                    {/*    <TableCellAnimeComponent cell={this.props.cell} cellName={'actions'} align={'center'}*/}
                    {/*                                list_name={''}*/}
                    {/*                                all_lists={this.props.lists} actions={this.props.actions}/> :*/}
                    {/*    null}*/}

                </StyledTableRow>
                <StyledTableRow>
                    <StyledTableCell colSpan={6}>
                        <Collapse in={this.state.episodeOn} timeout={"auto"} unmountOnExit={true}>
                            <TableEpisodeComponent rows={
                                typeof this.props.anime?.episode == 'undefined' ? [] : this.props.anime?.episode}
                                                   columns={this.generateColumns('Episodes')}/>
                        </Collapse>
                    </StyledTableCell>
                </StyledTableRow>
            </React.Fragment>
        );
    }

}