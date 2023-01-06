import * as React from "react";
import './Menu.css'
import TableFormComponent from "../../ui/table/table-form/table-form.component";
import AnimeServices, {Anime} from "../../sevices/anime.services";
import {GridColDef} from "@mui/x-data-grid";
import VerticalTabs, {VerticalTab, VerticalTabsProps} from "../../ui/tab-panel/vertical-tabs/vertical-tabs.component";
import FormatShapesSharpIcon from '@mui/icons-material/FormatShapesSharp';
import sessionService from "../../sevices/session.service";
import EqualizerIcon from '@mui/icons-material/Equalizer';
import {Rating} from "@mui/material";
import AnimeListComponent from "../AnimeList/animeList.component";

export interface MenuStates {
    rows: Anime[];
    fields: GridColDef[];
}

interface A {
    id?: number;
    country?: string;
    name?: string;
    quality?: string;
    rating?: number | JSX.Element;
    release_date?: string;
    time?: string;
    url?: string;
    actions?: string
    image?: string
    episodes?: number;

    getRating?(rating: string): JSX.Element;
}

export interface AnimeArray {
    [index: number]: A
}

export default class MenuBodyComponent extends React.Component<any, MenuStates> {

    animeA: A = {id: 0, country: '', name: '', quality: '', release_date: '', rating: 0, time: '', actions: ''}
    animeU: A = {id: 0, image: '', name: '', quality: '',episodes:0, release_date: '', rating: 0, time: ''}

    constructor(props: any, private anime: Anime) {
        super(props);
        this.getAnime = this.getAnime.bind(this)
        this.state = {rows: [], fields: []}
        this.generateTabs = this.generateTabs.bind(this)
    }

    componentDidMount() {
        this.getAnime()
    }

    getAnime(): Anime[] {
        AnimeServices.getAll().then((response) => {
                this.setState({rows: response})
            }
        )
        return this.state.rows
    }


    generateTabs() {
        let tab: VerticalTab[] = []
        let vtab: VerticalTabsProps[] = []
        if (sessionService.isAdmin()) {
            vtab.push(
                {
                    label: 'Anime List',
                    component: <AnimeListComponent rows={this.state.rows} obj={this.animeU}/>,
                    icon: <FormatShapesSharpIcon/>
                },
                {
                    label: 'Manage Anime',
                    component: <AnimeListComponent rows={this.state.rows} obj={this.animeA}/>,
                    icon: <EqualizerIcon/>
                }
            )
        } else {
            vtab.push({
                label: 'Anime List',
                component: <AnimeListComponent rows={this.state.rows} obj={this.animeU}/>,
                icon: <FormatShapesSharpIcon/>
            })
        }
        tab.push({tabs: vtab})
        return vtab
    }

    render() {
        return (
            <div style={{width: '100%'}}>
                <VerticalTabs tabs={this.generateTabs()} key={1}/>
                {/*<TableFormComponent columns={this.state.fields} rows={this.state.rows}/>*/}
            </div>
        );
    }
}