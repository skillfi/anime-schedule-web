import * as React from "react";
import animeServices from "../../../sevices/anime.services";
import {Box, Container, Grid, Rating, Typography} from "@mui/material";
import {Episode, IAnime} from "../../../types/types";
import {Paper} from "@material-ui/core";
import {styled} from "@mui/material/styles";
import StatusComponent from "../../../ui/status/status.component";
import UserListService from "../../../sevices/user_list.services";
import {finalize} from "rxjs";
import TableEpisodeComponent from "../../../ui/table/table-episode.component";
import {renderTags} from "../../../ui/table/table-cell/table-cell-anime.component";
import ChipTagComponent from "../../../ui/chips/chip-tag.component";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    alignContent: 'center',
    color: theme.palette.text.secondary,
}));

interface PageProps {
    _id: any;
}

export default class AnimeComponent extends React.Component<PageProps, { anime: IAnime, bookmarks: string[] }> {
    bookmarks: string[] = []

    constructor(props: PageProps) {
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

    componentDidMount() {
        this.fetch()
        this.fetchBookmarks()

    }

    getQuality(quality: number) {
        switch (quality) {
            case 360: {
                return <StatusComponent status={'Low'} quality={quality}/>
            }
            case 480: {
                return <StatusComponent status={'Normal'} quality={quality}/>
            }
            case 720: {
                return <StatusComponent status={'HD'} quality={quality}/>
            }
            case 1080: {
                return <StatusComponent status={'HDR'} quality={quality}/>
            }
            default: {
                return <StatusComponent status={'Low'} quality={quality}/>
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

    componentDidUpdate(prevProps: Readonly<PageProps>, prevState: Readonly<{ anime: IAnime; bookmarks: string[] }>, snapshot?: any) {
        if (prevState.anime.bookmarks.length < this.state.anime.bookmarks.length) {
            this.fetch()
        }
    }

    render() {
        let tags: JSX.Element[] = []
        this.state.anime.tag.map((tag, index) => {
            tags.push(<ChipTagComponent tag={tag} key={index}/>)
        })
        return (
            <Container>
                <Box sx={{mt: 5}}>
                    <Grid container spacing={2}>
                        <Grid item={true} xs>
                            <Box sx={{textAlign: 'center'}}>
                                <Typography variant={'h4'} fontFamily={'Consolas'} fontSize={25}>
                                    {this.state.anime.title_en}
                                </Typography>
                                <Typography variant={'h5'} fontFamily={'Consolas'} fontSize={20}>
                                    {this.state.anime.title_jp}
                                </Typography>
                            </Box>
                            <Box sx={{display: 'flex', flexDirection: 'row', alignContent: 'center', m: 1}}>
                                <Grid container={true} spacing={2}>
                                    <Grid item xs md>
                                        <Item>
                                            <Typography fontSize={20} textAlign={'center'} fontFamily={'Cambria Math'}>
                                                {this.state.anime.description?.split('\n\n')[2]}
                                            </Typography>
                                        </Item>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Item sx={{textAlign: 'center'}} elevation={0}>
                                            {this.getQuality(this.state.anime.quality)}
                                        </Item>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Item>
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}>
                                                <Rating value={this.state.anime.rating / 2} readOnly={true}
                                                        size={"medium"} sx={{ml: 4}}/>
                                                <Typography sx={{ml: 1, mt: 0.5}} fontFamily={'Consolas'} fontSize={20}>
                                                    {this.state.anime.rating}
                                                </Typography>
                                            </Box>
                                        </Item>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{m: 1}}>
                                <Grid container={true} spacing={1}>
                                    <Grid item={true} xs>
                                        <Item elevation={1}>
                                            <Typography textAlign={'center'}>
                                                {tags.map(renderTags)}
                                            </Typography>
                                        </Item>
                                    </Grid>
                                    <Grid item xs={2} sx={{height: 50}}>
                                        <Item elevation={3}>
                                            <Typography textAlign={'center'} fontFamily={'Cambria Math'} fontSize={20}>
                                                <ChipTagComponent
                                                    tag={this.getEpisode(this.state.anime.episode).toString()}/> / <ChipTagComponent tag={this.state.anime.episodes.toString()}/>
                                            </Typography>
                                        </Item>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box>
                                <Item elevation={0}>
                                    <Typography variant={'h5'} textAlign={'center'} fontFamily={'Consolas'}>
                                        Description
                                    </Typography>
                                </Item>
                                <Item>
                                    <Typography variant={'subtitle2'} fontSize={18} display={'block'}>
                                        {this.state.anime.description?.split('\n\n')[0]}
                                    </Typography>
                                    <Typography>
                                        {this.state.anime.description?.split('\n\n')[1]}
                                    </Typography>
                                    <Typography>
                                        {this.state.anime.description?.split('\n\n')[3]}
                                    </Typography>
                                </Item>
                            </Box>
                        </Grid>
                        <Grid item={true}>
                            <Item elevation={0}>
                                <img loading={'lazy'} src={this.state.anime.image} alt={this.state.anime.title_en}
                                     style={{borderRadius: 10}}/>
                            </Item>
                        </Grid>
                        <TableEpisodeComponent rows={this.state.anime.episode}
                                               columns={['Episode_Id', 'Air_Date', 'Title', 'Full_Title', 'Viewed']}
                                               sx={{minWidth: 500}}/>
                    </Grid>

                </Box>
            </Container>
        );
    }
}