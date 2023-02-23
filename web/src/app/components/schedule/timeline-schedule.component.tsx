import * as React from "react";
import {
    Avatar,
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import AnimeTimeLineComponent from "./timelines/AnimeTimeLine.component";
import {EpisodeTimeLine, IAnime} from "../../types/types";
import animeServices from "../../sevices/anime.services";
import TimeLineItemComponent from "./timelines/TimeLineItem.component";
import {DrawerHeader, Main} from "../../ui/styles/styles";
import TableHeadComponent from "../../ui/table/table-head/table-head.component";
import TableBodyComponent from "../../ui/table/table-body/table-body.component";
import Row from "../../ui/table/collapse/collapse-box/collapse-table-cell.component";
import {Tools} from "../../../tools";
import ToggleButton from "@mui/material/ToggleButton";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import VerticalTimelineComponent from "./iframes/vertical-timeline.component";
import AnimeServices from "../../sevices/anime.services";
import {finalize} from "rxjs";
import MenuItemComponent from "../Menu/Menu-Item.component";

interface TimelineScheduleState{
    timeline: EpisodeTimeLine[];
    view: 'list' | 'module' | string;
    anime: IAnime[]
}
export default class TimelineScheduleComponent extends React.Component<{open: boolean}, TimelineScheduleState>{
    constructor(props: any) {
        super(props);
        this.state = {timeline: [], view: 'list', anime: []}
        this.changeView = this.changeView.bind(this)
        this.fetch = this.fetch.bind(this)
    }

    changeView(event: React.MouseEvent<HTMLElement>, nextView: string){
        this.setState({view: nextView})
    }

    book: IAnime[] = []

    fetch(){
        AnimeServices.getAll()
            .pipe(finalize(()=>this.setState({anime: this.book})))
            .subscribe((response)=>{
                this.book = response.data.data
            })
    }

    curr = new Date()

    componentDidMount() {
        this.fetch()
        animeServices.getTimeline()
            .subscribe((response)=>{
                this.setState({timeline: response.data.data})
            })
    }

    render() {
        const {view, timeline, anime} = this.state
        const {open} = this.props
        return (
            <Main open={open}>
                <MenuItemComponent value={2} disabled={true}/>
                <DrawerHeader/>
                <ToggleButtonGroup value={view} onChange={this.changeView} exclusive={true}>
                    <ToggleButton value="list" aria-label="list">
                        <ViewListIcon />
                    </ToggleButton>
                    <ToggleButton value="module" aria-label="module">
                        <ViewModuleIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
                {view == 'list' ? (
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: Tools.getWindowDimension().minHeight * 0.9, width: Tools.getWindowDimension().minWidth * 0.9 }}>
                            <Table stickyHeader aria-label={"mui table"} size={"small"} align={'center'}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" colSpan={7} sx={{fontFamily: 'Cambria Math'}}>
                                            Date
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align={'center'} width={200} sx={{fontFamily: 'Consolas'}}>
                                            Попереднього місяця
                                        </TableCell>
                                        <TableCell align={'center'} width={200} sx={{fontFamily: 'Consolas'}}>
                                            Попереднього тижня
                                        </TableCell>
                                        <TableCell align={'center'} width={200} sx={{fontFamily: 'Consolas'}}>
                                            Сьогодні
                                        </TableCell>
                                        <TableCell align={'center'} width={200} sx={{fontFamily: 'Consolas'}}>
                                            Завтра
                                        </TableCell>
                                        <TableCell align={'center'} width={200} sx={{fontFamily: 'Consolas'}}>
                                            Наступного тижня
                                        </TableCell>
                                        <TableCell align={'center'} width={200} sx={{fontFamily: 'Consolas'}}>
                                            Наступного місяця
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <AnimeTimeLineComponent timeline={timeline} renderTimeline={
                                            (timeline: EpisodeTimeLine) => (
                                                <TimeLineItemComponent cell={timeline}/>
                                            )
                                        } date={new Date(this.curr.getFullYear(), this.curr.getMonth()-1)} sortBy={'Previous Month'} key={0}/>
                                        <AnimeTimeLineComponent timeline={timeline} renderTimeline={
                                            (timeline: EpisodeTimeLine) => (
                                                <TimeLineItemComponent cell={timeline}/>
                                            )
                                        } date={new Date(this.curr.getFullYear(), this.curr.getMonth(), this.curr.getDate() - 7)} sortBy={'Previous Week'} key={1}/>
                                        <AnimeTimeLineComponent timeline={timeline} renderTimeline={
                                            (timeline: EpisodeTimeLine) => (
                                                <TimeLineItemComponent cell={timeline}/>
                                            )
                                        } date={new Date()} sortBy={'Today'} key={2}/>
                                        <AnimeTimeLineComponent timeline={timeline} renderTimeline={
                                            (timeline: EpisodeTimeLine) => (
                                                <TimeLineItemComponent cell={timeline}/>
                                            )
                                        } date={new Date(this.curr.getFullYear(), this.curr.getMonth(), this.curr.getDate()+1)} sortBy={'Tomorrow'} key={3}/>
                                        <AnimeTimeLineComponent timeline={timeline} renderTimeline={
                                            (timeline: EpisodeTimeLine) => (
                                                <TimeLineItemComponent cell={timeline}/>
                                            )
                                        } date={new Date(this.curr.getFullYear(), this.curr.getMonth(), this.curr.getDate() + 7)} sortBy={'Next Week'} key={4}/>
                                        <AnimeTimeLineComponent timeline={timeline} renderTimeline={
                                            (timeline: EpisodeTimeLine) => (
                                                <TimeLineItemComponent cell={timeline}/>
                                            )
                                        } date={new Date(this.curr.getFullYear(), this.curr.getMonth()+1)} sortBy={'Next Month'} key={5}/>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                ): view == 'module' ? <VerticalTimelineComponent anime={anime}/>: null}


            </Main>

        );
    }
}