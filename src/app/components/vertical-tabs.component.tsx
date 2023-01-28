import * as React from "react";
import {Box, BoxProps, SxProps, Tab, Tabs} from "@mui/material";
import * as colors from "@mui/material/colors";
import TabPanelFC from "../ui/tab-panel/tab-panel.component";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {IAnime} from "../types/types";
import {BookmarkRow} from "./Menu/Menu-Body.component";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import CreateIcon from "@mui/icons-material/Create";
import AnimeListComponent from "./anime-list/anime-list.component";
import UserListComponent from "./users-list/user-list.component";
import AdminListComponent from "./admin-list/admin-list.component";
import {getColors} from "../ui/styles/styles";
import {getWindowDimensions} from "../ui/navbar/navbar.component";


const theme = createTheme({
    palette: {
        primary: {
            main: getColors('brown', 800)
        },
        secondary: {
            main: getColors('brown', 700)
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
export interface VerticalTab extends  BoxProps {
    admin: boolean;
    data: IAnime[];
}

export default class VerticalTabsComponent extends React.Component<VerticalTab, {
    value: number, book: IAnime[],
    lists: string[]
}> {
    book: IAnime[] = []
    color = colors.teal[500]
    private lists: any[] = []

    constructor(props: VerticalTab) {
        super(props);
        this.state = {value: 0, book: [], lists: []}
        this.handleChange = this.handleChange.bind(this)
    }

    componentWillUnmount() {
        this.setState({value: 0, book: []})
    }

    public render() {
        return (
            <Box
                sx={this.props.sx}
            >
                <ThemeProvider theme={theme}>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={this.state.value}
                        onChange={this.handleChange}
                        aria-label="Panel"
                        textColor="primary"
                        indicatorColor="secondary"
                    >
                        <Tab icon={<FormatListBulletedIcon/>} iconPosition={"start"}
                             label={'Anime List'} {...a11yProps(0)}
                             sx={{fontFamily: ['Consolas'], borderRadius: 50}} key={1}/>
                        <Tab icon={<FolderSharedIcon/>} iconPosition={"start"} label={'My List'} {...a11yProps(1)}
                             sx={{fontFamily: ['Consolas'], borderRadius: 50}} key={2}/>
                        {this.props.admin ?
                            <Tab icon={<CreateIcon/>} iconPosition={"start"} label={'Administration'} {...a11yProps(2)}
                                 sx={{fontFamily: ['Consolas'], borderRadius: 50}} key={3}/> :
                            <React.Fragment/>}
                    </Tabs>
                </ThemeProvider>
                <TabPanelFC index={0} value={this.state.value}>
                    <AnimeListComponent rows={this.props.data} user_lists={this.state.lists}/>
                </TabPanelFC>
                <TabPanelFC index={1} value={this.state.value}>
                    <UserListComponent user_lists={this.state.lists}/>
                </TabPanelFC>
                <TabPanelFC index={2} value={this.state.value}>
                    <AdminListComponent/>
                </TabPanelFC>
            </Box>
        );
    }

    private handleChange(event: React.SyntheticEvent, newValue: number) {
        event.preventDefault()
        this.setState({value: newValue})
    };
}