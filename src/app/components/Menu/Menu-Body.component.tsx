import * as React from "react";
import './Menu.css'
import VerticalTabs from "../vertical-tabs.component";
import sessionService from "../../sevices/session.service";
import {IAnime, TabComponent, TabProps} from "../../types/types";
import AnimeServices from "../../sevices/anime.services";
import {finalize} from "rxjs";
import {useEffect, useState} from "react";
import {getWindowDimensions} from "../../ui/navbar/navbar.component";


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
export default class MenuBodyComponent extends React.Component<any, {anime: IAnime[],
    dimension: ReturnType<typeof getWindowDimensions> }>{

    constructor(props: any) {
        super(props);
        this.state = {anime: [], dimension: getWindowDimensions()}
    }


    render() {
        return (
            <VerticalTabs sx={{
                flexGrow: 1, bgcolor: 'transparent', display: 'flex', mt: 5, borderRadius: 5,
                width: "max-content"
            }} admin={sessionService.isAdmin()} data={this.state.anime}/>
        );
    }
}