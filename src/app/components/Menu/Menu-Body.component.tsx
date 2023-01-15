import * as React from "react";
import './Menu.css'
import VerticalTabs from "../../ui/tab-panel/vertical-tabs/vertical-tabs.component";
import sessionService from "../../sevices/session.service";
import {IAnime, TabComponent, TabProps} from "../../types/types";


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

export default function MenuBodyComponent() {

    const demo = new Array<BookmarkRow>();
    // @ts-ignore
    demo['All'] = [{id: ''}]


    return (
        <React.Fragment>
            <VerticalTabs sx={{
                flexGrow: 1, bgcolor: 'transparent', display: 'flex', width: 'max-content',
                marginTop: 5, borderRadius: 5
            }} admin={sessionService.isAdmin()} demo={demo}/>
        </React.Fragment>
    );
}