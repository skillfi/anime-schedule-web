import * as React from "react";
import {Box, BoxProps, SxProps, Tab, Tabs} from "@mui/material";
import * as colors from "@mui/material/colors";
import TabPanelComponent from "../tab-panel.component";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {IAnime, TabComponent, TabProps} from "../../../types/types";
import {BookmarkRow, TabResult} from "../../../components/Menu/Menu-Body.component";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import CreateIcon from "@mui/icons-material/Create";
import {generateColumns, rowCustomisation} from "../../../helpers/toolls";
import TableComponent from "../../table/table.component";
import HorizontalTabsComponent from "../horizontal-tabs/horizontal-tabs.component";
import {useEffect, useState} from "react";
import AnimeServices from "../../../sevices/anime.services";
import UserListService from "../../../sevices/user_list.services";
import animeServices from "../../../sevices/anime.services";
import UserListComponent from "../../user-list/user-list.component";
import {finalize} from "rxjs";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";


const theme = createTheme({
    palette: {
        primary: {
            main: colors.lightBlue[300]
        },
        secondary: {
            main: colors.deepPurple[600]
        },
    }
});

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

/** Vertical Tab prop
 * @property {SxProps} sx - `Style`
 * @property {boolean} admin - `Administration`
 * @property {Array<BookmarkRow>} [demo] - `Demo Preview`
 */
export interface VerticalTab extends  BoxProps{
    admin: boolean;
    demo: BookmarkRow[];
}

export default function VerticalTabs(props: VerticalTab) {
    const [value, setValue] = React.useState(0);
    const [anime, setAnime] = useState<IAnime[]>([])
    const [list, setList] = useState<string[]>([])
    let book = new Array<BookmarkRow>();
    let lists = new Array<string>();
    const [BookMarks, setBookmark] = useState<Array<BookmarkRow>>(book);
    const color = colors.teal[500]
    const lblue = colors.lightBlue[300]


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        AnimeServices.getAll()
            .pipe(finalize(()=> setValue(newValue)))
            .subscribe((response) => {
            // @ts-ignore
            book['All'] = response.data.data
        }, ((e) => alert(e)), (() => setBookmark(book)))
        if (newValue === 1){
            let books = new Array<BookmarkRow>();
            UserListService.getAllMyLists()
                .pipe(finalize(()=>setValue(newValue)))
                .subscribe((response) => {
                response.data.data.map((list) => {
                    let animeS: IAnime[] = []
                    lists.push(list.bookmark_name)
                    list.anime_list.map((anime) => {
                        animeServices.getById(anime.anime_id).subscribe((res) => {
                            animeS.push(res.data.data)
                            // @ts-ignore
                            books[list.bookmark_name] = animeS
                        }, ((e) => alert(e)), (() => {
                            setBookmark(books)
                        }))
                    })
                })
            }, ((e)=>alert(e)), (()=>setList(lists)))
        }
    };

    return (
        <Box
            sx={props.sx}
        >
            <ThemeProvider theme={theme}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Panel"
                    sx={{
                        borderRight: 1, borderColor: 'divider', color: color,
                        // background: `radial-gradient(${lblue}, ${colors.indigo[900]})`,
                        borderRadius: 10
                    }}
                    textColor="primary"
                    indicatorColor="secondary"
                >
                    <Tab icon={<FormatListBulletedIcon/>} iconPosition={"start"} label={'Anime List'} {...a11yProps(0)}
                         sx={{fontFamily: ['Consolas'], borderRadius: 50, mt: 10}} key={1}/>
                    <Tab icon={<FolderSharedIcon/>} iconPosition={"start"} label={'My List'} {...a11yProps(1)}
                         sx={{fontFamily: ['Consolas'], borderRadius: 50, mt: 10}} key={2}/>
                    {props.admin ? <Tab icon={<CreateIcon/>} iconPosition={"start"} label={'Administration'} {...a11yProps(2)}
                                        sx={{fontFamily: ['Consolas'], borderRadius: 50, mt: 10}} key={3}/>: <React.Fragment/>
                    }
                </Tabs>
            </ThemeProvider>
            <TabPanelComponent index={0} value={value}>
                <UserListComponent list_name={'All'} columns={['Image', 'Name', 'Quality', 'Episodes',
                    'Release_date', 'Rating', 'Time', 'Country', 'Subscribe', 'Bookmarks']}
                                   rows={BookMarks} key={0} lists={list}/>
            </TabPanelComponent>
            <TabPanelComponent index={1} value={value}>
                <HorizontalTabsComponent list_name={'Favorites'}
                                         key={1}
                bookmarks={BookMarks} type={"user"} lists={list}
                                         sx={{borderBottom: 1, borderColor: 'divider', width: '100%'}}/>
            </TabPanelComponent>
            <TabPanelComponent index={2} value={value}>
                <HorizontalTabsComponent list_name={'Manage Anime'} key={2}
                                         bookmarks={BookMarks} type={'admin'} lists={['All']}
                                         sx={{borderBottom: 1, borderColor: 'divider', width: '100%'}}/>
            </TabPanelComponent>
        </Box>
    )
}