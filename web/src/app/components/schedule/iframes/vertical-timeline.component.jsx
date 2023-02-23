import * as React from "react";
import Timeline from "react-timelines";
import {timeline} from "../../../../environments/environment";
import {Tools} from "../../../../tools";
import AnimeServices from "../../../sevices/anime.services";
import {finalize} from "rxjs";

import "react-timelines/lib/css/style.css";
import {Card, CardActionArea, CardContent, CardMedia, Divider, Modal, Typography} from "@mui/material";
import ViewEpisodeComponent from "../../../ui/buttons/view-episode.component";



export default class VerticalTimelineComponent extends React.Component{

    constructor(props) {
        super(props);

        const tracksById = Tools.fill(this.props.anime.length)
            .reduce((acc, i) => {
                const track = Tools.buildTrack(this.props.anime, i);
                acc[track.id] = track;
                return acc;
            }, {});


        this.state = {
            open: true,
            zoom: 2,
            tracksById,
            tracks: Object.values(tracksById),
            modal: false,
            track: {
                start: new Date(),
                end: new Date(),
                element: {
                    image: ''
                }
            }
        };
        this.handleToggleTrackOpen = this.handleToggleTrackOpen.bind(this)
        this.handleToggleOpen = this.handleToggleOpen.bind(this)
        this.handleZoomIn = this.handleZoomIn.bind(this)
        this.handleZoomOut = this.handleZoomOut.bind(this)
        this.fetch = this.fetch.bind(this)
        this.renderTracks = this.renderTracks.bind(this)
        this.clickElement = this.clickElement.bind(this)
    }

    fetch(){
        AnimeServices.getAll()
            .pipe(finalize(()=>this.renderTracks()))
            .subscribe((response)=>{
                this.book = response.data.data
            })
    }

    book = []

    clickElement(element){
        this.setState(({modal})=>({modal: !modal}))
        this.setState(({track})=>({track: element}))
    }


    handleToggleOpen(){
        this.setState(({ open }) => ({ open: !open }));
    };

    handleZoomIn = () => {
        this.setState(({ zoom }) => ({ zoom: Math.min(zoom + 1, 20) }));
    };

    handleZoomOut = () => {
        this.setState(({ zoom }) => ({ zoom: Math.max(zoom - 1, 1) }));
    };

    handleToggleTrackOpen = (track) => {
        this.setState((state) => {
            const tracksById = {
                ...state.tracksById,
                [track.id]: {
                    ...track,
                    isOpen: !track.isOpen
                }
            };

            return {
                tracksById,
                tracks: Object.values(tracksById)
            };
        });
    };

    timebar = Tools.buildTimebar();
    tracks = []
    track = {}

    renderTracks(){
        const tracksById = Tools.fill(this.book.length)
            .reduce((acc, i) => {
                const track = Tools.buildTrack(this.book, i);
                acc[track.id] = track;
                return acc;
            }, {});
        this.setState(({tracks})=>({tracks: Object.values(tracksById)}))
    }

    componentDidMount() {
        this.fetch()
    }

    render() {
        const { open, zoom, tracks, modal, track } = this.state;
        const treck = this.track
        const start = new Date(2022, 9)
        const end = new Date(2024, 0)
        return (
            <React.Fragment>
                <Timeline
                    scale={{
                        start,
                        end,
                        zoom,
                        zoomMin: 2,
                        zoomMax: 20
                    }}
                    isOpen={open}
                    toggleOpen={this.handleToggleOpen}
                    timebar={this.timebar}
                    tracks={tracks}
                    now={new Date()}
                    zoomIn={this.handleZoomIn}
                    zoomOut={this.handleZoomOut}
                    toggleTrackOpen={this.handleToggleTrackOpen}
                    enableSticky
                    clickElement={this.clickElement}
                    clickTrackButton={(track) => {

                        // eslint-disable-next-line no-alert
                        // alert(JSON.stringify(track));
                    }}
                    scrollToNow/>
                <Modal open={modal} sx={{px: 50, py: 5}}>
                    <Card sx={{width: 'min-content', height: 'min-content'}}>
                        <CardActionArea onClick={()=>this.setState(({modal})=>({modal: !modal}))}>
                            <CardMedia component={'img'} image={track.element.image} alt={track.element.title} sx={{height: 'min-content', width: 'min-content'}}/>
                            <CardContent sx={{p: 1}}>
                                <Typography variant="subtitle2" fontSize={15} fontFamily={'Consolas'} textAlign={'center'}>
                                    {track.start.toISOString()} - {track.end.toISOString()}
                                </Typography>
                                <Divider/>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Modal>
            </React.Fragment>

        );
    }
}