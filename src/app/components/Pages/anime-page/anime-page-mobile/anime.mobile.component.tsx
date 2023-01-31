import * as React from "react";
import {BoxProps} from "@material-ui/core";
import {Episode, IAnime} from "../../../../types/types";
import UserListService from "../../../../sevices/user_list.services";
import animeServices from "../../../../sevices/anime.services";
import {finalize} from "rxjs";
import StatusComponent from "../../../../ui/status/status.component";
import {Box, Grid, Rating, Typography} from "@mui/material";
import {renderTags} from "../../../../ui/table/table-cell/table-cell-anime.component";
import ChipTagComponent from "../../../../ui/chips/chip-tag.component";
import TableEpisodeComponent from "../../../../ui/table/table-episode.component";
import {Item} from "../anime.component";
import {Tools} from "../../../../../tools";

interface AnimeMobileProps extends BoxProps {
    _id: any;
}

interface AnimeMobileState {
    anime: IAnime;
    bookmarks: Array<string>;
}

export default class AnimeMobileComponent extends React.Component<AnimeMobileProps, AnimeMobileState> {

    bookmarks = new Array<string>();

    constructor(props: AnimeMobileProps) {
        super(props);
        this.state = {
            anime: {
                _id: '', title: '', url: '', bookmarks: [],
                rating: 5, release_date: new Date(), episode: [], episodes: 12, quality: 720, country: '',
                time: 25, image: '', subscribe: false, tag: []
            }, bookmarks: []
        }
        this.fetch = this.fetch.bind(this)
        this.getQuality = this.getQuality.bind(this)
        this.fetchBookmarks = this.fetchBookmarks.bind(this)
        this.getEpisode = this.getEpisode.bind(this)
    }

    componentDidMount() {
        this.fetch()
        this.fetchBookmarks()

    }

    getQuality(quality: number) {
        switch (quality) {
            case 360: {
                return <StatusComponent status={'Low'} quality={quality} size={'small'}/>
            }
            case 480: {
                return <StatusComponent status={'Normal'} quality={quality} size={'small'}/>
            }
            case 720: {
                return <StatusComponent status={'HD'} quality={quality} size={'small'}/>
            }
            case 1080: {
                return <StatusComponent status={'HDR'} quality={quality} size={'small'}/>
            }
            default: {
                return <StatusComponent status={'Low'} quality={quality} size={'small'}/>
            }
        }
    }

    getEpisode(episodes: Episode[]) {
        let episode_aut: Episode[] = []
        const now = new Date()
        episodes.map((episode) => {
            const air_date = new Date(episode.air_date)
            if (air_date < now) {
                episode_aut.push(episode)
            }
        })
        return episode_aut.length
    }

    fetchBookmarks() {
        UserListService.getMyBookmarks()
            .subscribe((response) => {
                this.setState({bookmarks: response.data.data})
            })
    }

    fetch() {
        animeServices.getById(this.props._id)
            .pipe(finalize(() => this.bookmarks = this.state.anime.bookmarks))
            .subscribe((response) => {
                this.setState({anime: response.data.data})
            })
    }

    render() {
        let tags: JSX.Element[] = []
        this.state.anime.tag.map((tag, index) => {
            tags.push(<ChipTagComponent tag={tag} key={index} sx={{fontSize: 5, fontFamily: 'Cambria Math'}}/>)
        })
        return (
            <Box sx={{mt: 5}}>
                <Box>
                    <Grid container>
                        <Grid item>
                            <Item elevation={0}>
                                <img loading={'lazy'} src={this.state.anime.image} alt={this.state.anime.title_en}
                                     style={{borderRadius: 10}}/>
                            </Item>
                        </Grid>
                        <Grid item xs>
                            <Box sx={{textAlign: 'center', mr: 5}}>
                                <Typography variant={'h5'} fontFamily={'Consolas'} fontSize={15}>
                                    {this.state.anime.title_en}
                                </Typography>
                                <Typography variant={'h6'} fontFamily={'Consolas'} fontSize={10}>
                                    {this.state.anime.title_jp}
                                </Typography>
                            </Box>
                            <Box sx={{display: 'flex', flexDirection: 'row', alignContent: 'center', flexGrow: 0}}>
                                <Grid container={true} spacing={1} position={'static'}>
                                    <Grid item xs={3} position={'static'}>
                                        <Item sx={{width: 'max-content'}}>
                                            <Typography fontSize={15} textAlign={'center'} fontFamily={'Cambria Math'}>
                                                {this.state.anime.description?.split('\n\n')[2]}
                                            </Typography>
                                        </Item>
                                    </Grid>
                                    <Grid item xs={2} position={'static'}>
                                        <Item sx={{width: 'max-content'}} elevation={0}>
                                            {this.getQuality(this.state.anime.quality)}
                                        </Item>
                                    </Grid>
                                    <Grid item xs={5} md={2} sx={{ml: 1}}>
                                        <Item>
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                textAlign: 'center'
                                            }}>
                                                <Rating value={this.state.anime.rating / 2} readOnly={true}
                                                        size={"small"} sx={{ml: 1}}/>
                                                <Typography sx={{ml: 1, mt: 0.5}} fontFamily={'Consolas'} fontSize={10}>
                                                    {this.state.anime.rating}
                                                </Typography>
                                            </Box>
                                        </Item>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{m: 1}}>
                                <Grid container={true}>
                                    <Grid item={true} xs sx={{maxWidth: Tools.getWindowDimension().minWidth}}>
                                        <Item elevation={1} sx={{width: 'max-content'}}>
                                            <Typography textAlign={'center'}>
                                                {tags.map(renderTags)}
                                            </Typography>
                                        </Item>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs sx={{height: 25, ml: 0, mt: 1}}>
                                        <Typography textAlign={'center'} fontFamily={'Consolas'} fontSize={10}>
                                            <ChipTagComponent
                                                tag={this.getEpisode(this.state.anime.episode).toString()}
                                                sx={{fontFamily: 'Consolas', fontSize: 5}}/> / <ChipTagComponent
                                            tag={this.state.anime.episodes.toString()}
                                            sx={{fontFamily: 'Consolas', fontSize: 5}}/>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{width: Tools.getWindowDimension().minWidth}}>
                                <Item elevation={0}>
                                    <Typography variant={'h5'} textAlign={'center'} fontFamily={'Consolas'}
                                                fontSize={15}>
                                        Description
                                    </Typography>
                                </Item>
                                <Item elevation={0} sx={{ml: 0, width: Tools.getWindowDimension().minWidth}}>
                                    <Typography variant={'subtitle2'} fontSize={14} display={'block'}
                                                width={Tools.getWindowDimension().minWidth} textAlign={'center'}>
                                        {this.state.anime.description?.split('\n\n')[0]}
                                    </Typography>
                                    <Typography variant={'subtitle2'} fontSize={14} display={'block'}
                                                width={Tools.getWindowDimension().minWidth} textAlign={'center'}>
                                        {this.state.anime.description?.split('\n\n')[1]}
                                    </Typography>
                                    <Typography variant={'subtitle2'} fontSize={14} display={'block'}
                                                width={Tools.getWindowDimension().minWidth} textAlign={'center'}>
                                        {this.state.anime.description?.split('\n\n')[3]}
                                    </Typography>
                                </Item>
                            </Box>
                        </Grid>
                        <TableEpisodeComponent rows={this.state.anime.episode}
                                               columns={['Episode_Id', 'Air_Date', 'Title', 'Viewed']}
                                               sx={{width: Tools.getWindowDimension().minWidth}}/>
                    </Grid>
                </Box>
            </Box>
        );
    }
}