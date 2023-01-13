import * as React from "react";
import {useEffect, useState} from "react";
import './Menu.css'
import AnimeServices from "../../sevices/anime.services";
import animeServices from "../../sevices/anime.services";
import {GridColDef} from "@mui/x-data-grid";
import VerticalTabs from "../../ui/tab-panel/vertical-tabs/vertical-tabs.component";
import CreateIcon from '@mui/icons-material/Create';
import sessionService from "../../sevices/session.service";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import {generateColumns, rowCustomisation} from "../../helpers/toolls";
import {IAnime, TabComponent, TabProps, UAnime, UserAnimeProps} from "../../types/types";
import TableComponent from "../../ui/table/table.component";
import UserListComponent from "../../ui/user-list/user-list.component";
import HorizontalTabsComponent from "../../ui/tab-panel/horizontal-tabs/horizontal-tabs.component";
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import UserListService from "../../sevices/user_list.services";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';


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
    const [rows, setRows] = useState<UAnime[]>([])
    const [fields, setFields] = useState<GridColDef[]>([])
    const [result, setResult] = useState<TabResult>({components: [], props: []})
    const [user, setUser] = useState<UserAnimeProps[]>([])
    const [UserList, setUserList] = useState<TabResult>({components: [], props: [], list_name: 'Favorites'})
    const [adminList, setAdminList] = useState<TabResult>({components: [], props: []})
    const [AnimeList, setAnimeList] = useState<IAnime[]>([])
    let book = new Array<BookmarkRow>();
    const [BookMarks, setBookmark] = useState<Array<BookmarkRow>>(book);

    useEffect(() => {
        generateUserList()
        putAnime()
    }, [UserList, result, generateUserList, putAnime])

    function putAnime() {
        let rows: IAnime[] = [];
        AnimeServices.getAll().subscribe((response) => {
            response.data.data.map((anime, index) => {
                rows.push({
                    id: anime.id,
                    image: anime.image,
                    full_name: anime.full_name,
                    quality: anime.quality,
                    episodes: anime.episodes,
                    release_date: anime.release_date,
                    rating: anime.rating,
                    time: anime.time,
                    subscribe: anime.subscribe,
                    country: anime.country,
                    name: anime.name
                })
            })
        }, ((e) => alert(e)), (() => generateTabs(rows, sessionService.isAdmin())))
    }

    function generateTabs(rows: IAnime[], admin: boolean) {
        if (admin) {
            generateAdminTabs(rows)
        }
        let tabs: TabComponent[] = []
        let props: TabProps[] = []
        tabs.push(
            {
                component: <TableComponent rows={rowCustomisation(rows)}
                                           columns={(row: IAnime[]) => generateColumns(rows[1], rows)}
                                           key={1}/>,
            },
            {
                component: <HorizontalTabsComponent tabComponent={UserList.components}
                                                    other={UserList.props}
                                                    list_name={UserList.list_name}
                                                    key={2}/>
            }
        )
        props.push(
            {
                label: 'Anime List',
                icon: <FormatListBulletedIcon/>
            },

            {
                label: 'My List',
                icon: <FolderSharedIcon/>
            })
        return setResult({components: tabs, props: props})
    }

    function generateAdminTabs(rows: IAnime[]) {
        let tabs: TabComponent[] = []
        let props: TabProps[] = []
        tabs.push({
            component: <HorizontalTabsComponent tabComponent={[{
                component: <TableComponent rows={rowCustomisation(rows)}
                                           columns={(row: IAnime[]) => generateColumns(rows[1], rows)}
                                           key={3}/>,
            }]}
                                                other={[{
                                                    label: 'Manage Anime',
                                                    icon: <CreateIcon/>
                                                }]}
                                                list_name={'Manage Anime'}
                                                key={3}/>,
        },)
        props.push({
            label: 'Administration',
            icon: <CreateIcon/>
        },)
        return setAdminList({components: tabs, props: props})
    }

    function addToList(tabs: TabComponent[], props: TabProps[]) {
        return setUserList({components: tabs, props: props, list_name: 'Favorites'})
    }

    function generateUserList() {
        let tabs: TabComponent[] = []
        let props: TabProps[] = []
        let anime: IAnime = {
            id: '', name: '', image: '', subscribe: false, country: '', rating: 0, quality: 0, time: 0,
            release_date: '', episodes: 12, full_name: ''
        }
        UserListService.getAllMyLists().subscribe((response) => {
            response.data.data.map((list, index) => {
                let animeS: IAnime[] = []
                list.anime_list.map((id) => {
                    animeServices.getById(id).subscribe((res) => {
                        animeS.push(res.data.data)
                        // @ts-ignore
                        book[list.name] = animeS
                    }, ((e) => alert(e)), (() => setBookmark(book)))
                })
                tabs.push({
                    component: <UserListComponent list_name={list.name} key={index}
                                                  columns={['Image', 'Name', 'Quality', 'Episodes',
                                                      'Release_date', 'Rating', 'Time', 'Country']}
                                                  rows={BookMarks}/>
                })
                props.push(
                    {
                        label: list.name + ` (${list.anime_list.length})`,
                        icon: <AutoStoriesIcon/>
                    }
                )
                // count_list.push(list.animeIds.length)
            })

        }, ((e) => alert(e)), (() => addToList(tabs, props)))
    }

    return (
        <div>
            <VerticalTabs other={result.props} tabComponent={result.components} key={1}
                          sx={{
                              flexGrow: 1, bgcolor: 'transparent', display: 'flex', width: 'max-content',
                              marginTop: 5, borderRadius: 5
                          }} admin={sessionService.isAdmin()}
                          adminOther={adminList.props}
                          adminComponent={adminList.components}/>
        </div>
    );
}