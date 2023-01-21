import * as React from "react";
import './Menu.css'
import VerticalTabs from "../../ui/tab-panel/vertical-tabs/vertical-tabs.component";
import sessionService from "../../sevices/session.service";
import {IAnime, TabComponent, TabProps} from "../../types/types";
import AnimeServices from "../../sevices/anime.services";
import {finalize} from "rxjs";
import {useEffect, useState} from "react";


/** Render Tabs Interface
 * @property {Array<TabComponent>} components - `Render Elements`
 * @property {Array<TabProps>} props - `Render Tab`
 * @property {string} list_name - `Bookmark name`
 */
export interface TabResult {
    components: TabComponent[],
    props: TabProps[];
    list_name?: string;
}


export interface BookmarkRow {
    [index: string]: IAnime[];
}
export default class MenuBodyComponent extends React.Component<any, {anime: IAnime[]}>{

    constructor(props: any) {
        super(props);
        this.state = {anime: []}
        this.fetch = this.fetch.bind(this)
    }

    book: IAnime[] = []

    fetch(){
        AnimeServices.getAll()
            .pipe(finalize(()=> {
                console.log(`Finalize: ${this.book}`)
                this.setState({anime: this.book})
            }))
            .subscribe((response) => {
                this.book = response.data.data
            })
    }

    render() {
        return (
            <React.Fragment>
                <VerticalTabs sx={{
                    flexGrow: 1, bgcolor: 'transparent', display: 'flex', width: 'max-content',
                    marginTop: 5, borderRadius: 5
                }} admin={sessionService.isAdmin()} data={this.state.anime}/>
            </React.Fragment>
        );
    }
}