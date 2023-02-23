import * as React from "react";
import {IconButton} from "@mui/material";
import animeServices from "../../sevices/anime.services";
import {finalize} from "rxjs";
import {IAnime} from "../../types/types";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface EpisodeProps {
    viewers: string[];
    row_id: string;
    view: boolean;
}

export default class ViewEpisodeComponent extends React.Component<EpisodeProps, { view: boolean }> {

    anime: IAnime = {
        _id: '',
        bookmarks: [],
        title: '',
        release_date: new Date(),
        image: '',
        rating: 0,
        time: 0,
        quality: 0,
        country: '',
        subscribe: false,
        episodes: 0,
        tags: [],
        url: '',
        episode: [],
        full_title: '',
        description: [],
        aid: 0,
        title_en: '',
        title_jp: ''
    };

    constructor(props: EpisodeProps) {
        super(props);
        this.state = {view: false}
        this.view = this.view.bind(this)
        this.un_view = this.un_view.bind(this)
        this.fetch = this.fetch.bind(this)
    }

    view(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        animeServices.viewEpisode(this.props.row_id)
            .pipe((finalize(()=>this.fetch())))
            .subscribe((response)=>{
                if (response.status == 200){
                    this.setState({view: response.data.data.view})
                }
            })
    }

    fetch() {
        animeServices.getEpisode(this.props.row_id)
            .subscribe((response) => {
                this.setState({view: response.data.data.view})
            })
    }

    componentDidMount() {
        this.setState({view: this.props.view})
    }

    un_view(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        animeServices.un_viewEpisode(this.props.row_id)
            .pipe((finalize(()=>this.fetch())))
            .subscribe((response)=>{
                if (response.status == 200){
                    this.setState({view: response.data.data.view})
                }

        })
    }

    render() {
        return (
            <strong defaultValue={this.props.row_id}>
                {!this.state.view ? <IconButton onClick={this.view}
                                                defaultValue={this.props.row_id}
                                                color={'secondary'}><VisibilityIcon/></IconButton> :
                    <IconButton defaultValue={this.props.row_id}
                                onClick={this.un_view}
                                color={"secondary"}
                                size={'small'}><VisibilityOffIcon/></IconButton>}
            </strong>
        );
    }
}