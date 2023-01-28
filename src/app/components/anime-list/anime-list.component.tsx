import * as React from 'react';
import TableComponent from "../../ui/table/table.component";
import {Episode, IAnime} from "../../types/types";
import AnimeServices from "../../sevices/anime.services";
import animeServices from "../../sevices/anime.services";
import {finalize} from "rxjs";
import UserListService from "../../sevices/user_list.services";
import {TableProps} from "@material-ui/core";


interface AnimeListProps extends TableProps {
    user_lists: string[]
    rows: IAnime[]
}

export interface Episodes{
    [index: string]: Episode[]
}

export default class AnimeListComponent extends React.Component<AnimeListProps, {rows: IAnime[], all: string[],
episodes: Episodes[]}>{

    book: any[] = []

    episodes = new Array<Episodes>();
    episode: Episode[] = []

    constructor(props: AnimeListProps) {
        super(props);
        this.state = {rows: [], all: [], episodes: []}
        this.fetch = this.fetch.bind(this)
        this.fetchBookmarks = this.fetchBookmarks.bind(this)
    }

    all: string[] = []

    componentWillUnmount() {
        this.setState({rows: []})
    }

    fetch(){
        AnimeServices.getAll()
            .pipe(finalize(()=>this.setState({rows: this.book})))
            .subscribe((response)=>{
                this.book = response.data.data
            })
    }

    fetchBookmarks(){
        UserListService.getMyBookmarks()
            .pipe(finalize(()=>this.setState({all: this.all})))
            .subscribe((response)=>{
                this.all = response.data.data
            })
    }

    fetchEpisodes(){
        animeServices.getEpisodes()
            .pipe(finalize(()=>this.setState({all: this.all})))
            .subscribe((response)=>{
                // this.all = response.data.data
            })
    }

    componentDidMount() {
        this.fetch()
        this.fetchBookmarks()
    }

    render() {
        return (
            <TableComponent list_name={'All'} type={'anime_list'}
                            columns={['Image', 'Name', 'Quality', 'Episodes', 'Rating',
                                'Subscribe', 'Bookmarks', 'Actions']}
                            key={0}
                            rows={this.state.rows}
                            episodes={this.state.episodes}
                            lists={this.state.all} actions={['refresh', 'update', 'navigate']}/>
        );
    }
}