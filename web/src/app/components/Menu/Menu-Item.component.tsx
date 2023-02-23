import * as React from "react";
import {FC, useEffect, useState} from "react";
import {
    Avatar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    Tab,
    Tabs,
    Toolbar,
    Tooltip,
    Typography,
    useTheme
} from "@mui/material";
import {
    AdminPanelSettings,
    AdminPanelSettingsRounded,
    CalendarMonth,
    CalendarMonthRounded,
    ChevronLeft,
    ChevronRight,
    Fort,
    ListAlt,
    ListAltRounded,
    Menu,
    Search,
    SearchRounded,
    Shuffle,
    ShuffleRounded
} from '@mui/icons-material';
import {useNavigate} from "react-router-dom";
import {a11yProps, AppBar, DrawerHeader, drawerWidth, userListTheme} from "../../ui/styles/styles";
import IconButton from "@mui/material/IconButton";
import sessionService from "../../sevices/session.service";
import PaddingMenuComponent from "../../ui/padding-menu/padding-menu.component";
import {ThemeProvider} from "@mui/material/styles";
import {Tools} from "../../../tools";
import {ISetting} from "./Menu.component";
import {IAnime} from "../../types/types";
import AnimeServices from "../../sevices/anime.services";
import {finalize} from "rxjs";

interface MenuItemProps {
    value: number;
    disabled: boolean
}

const MenuItemComponent: FC<MenuItemProps> = (props) => {
    const navigate = useNavigate();
    const {value, disabled} = props
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [settings, setSettings] = useState<ISetting[]>([])
    const [windowDimensions, setWindowDimensions] = useState(Tools.getWindowDimension());
    const [userOpen, setUserOpen] = useState<boolean>(false);
    const theme = useTheme();
    const [open, setOpen] = React.useState<boolean>(false);
    const [page, setPage] = React.useState<number>(0);
    const [anime, setAnime] = React.useState<IAnime[]>([])
    const [randomTitle, setTitle] = React.useState<string>('')
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
        setUserOpen(true)
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
        setUserOpen(false)
    };

    const handleDrawerOpen = () => {
        setOpen(true);
        fetch()
    };

    function fetch(){
        AnimeServices.getAll()
            .pipe(finalize(()=>randomAnime()))
            .subscribe((response)=>{
                setAnime(response.data.data)
            })
    }

    const handleDrawerClose = () => {
        setOpen(false);
    };

    function handleChange(event: React.SyntheticEvent, newValue: number) {
        event.preventDefault()
        fetch()
        return setPage(newValue)
    }

    function randomAnime(){
        setTitle(anime[getRandom(anime.length)]._id)
        return anime[getRandom(anime.length)]._id
    }

    function getRandom(animeLength: number){
        return Math.floor(Math.random() * animeLength)
    }

    function selectedTab(tabValue: number, currentValue: number, tabName: 'search' | 'list' | 'schedule' | 'random' | 'admin') {
        switch (tabName) {
            case 'search': {
                if (tabValue === currentValue) {
                    return <SearchRounded/>
                } else {
                    return <Search/>
                }
            }
            case 'list': {
                if (tabValue === currentValue) {
                    return <ListAltRounded/>
                } else {
                    return <ListAlt/>
                }
            }
            case 'random': {
                if (tabValue === currentValue) {
                    return <ShuffleRounded/>
                } else {
                    return <Shuffle/>
                }
            }
            case 'admin': {
                if (tabValue === currentValue) {
                    return <AdminPanelSettingsRounded/>
                } else {
                    return <AdminPanelSettings/>
                }
            }
            case 'schedule': {
                if (tabValue === currentValue) {
                    return <CalendarMonthRounded/>
                } else {
                    return <CalendarMonth/>
                }
            }
        }

    }

    const user = sessionService.getCurrentUser()
    return (
        <React.Fragment>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar disableGutters>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{mr: 2, ...(open && {display: 'none'})}}
                    >
                        <Menu/>
                    </IconButton>
                    <IconButton onClick={() => navigate('/menu')}>
                        <Fort/>
                    </IconButton>
                    <Box sx={{flexGrow: 2, display: {xs: 'flex', md: 'flex'}}}/>
                    <Box sx={{flexGrow: 0}}>
                        <Typography sx={{fontFamily: 'consolas', fontSize: 20}}>
                            {user?.name + ' '}
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu}
                                            sx={{p: 0, mr: 5, cursor: userOpen ? 'help' : 'pointer'}}>
                                    <Avatar alt={user?.name}
                                            src={user?.main_image}/>
                                </IconButton>
                            </Tooltip>
                        </Typography>
                        <PaddingMenuComponent anchorElUser={anchorElUser} handleCloseUserMenu={handleCloseUserMenu} language={user?.language}/>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
                    variant="persistent"
                    anchor="left"
                    open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeft/> : <ChevronRight/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <ThemeProvider theme={userListTheme}>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Panel"
                        textColor="primary"
                        indicatorColor="secondary"
                    >
                        <Tab icon={selectedTab(0, value, 'search')}
                             label={'Search'} {...a11yProps(0)}
                             sx={{fontFamily: ['Consolas'], borderRadius: 50}} key={0}
                             onClick={() => navigate('/anime-list/search')}/>
                        <Tab icon={selectedTab(1, value, 'list')} label={'My List'} {...a11yProps(1)}
                             sx={{fontFamily: ['Consolas'], borderRadius: 50}} key={1}
                             onClick={() => navigate('/anime-list/user')}/>
                        <Tab icon={selectedTab(2, value, 'schedule')} label={'Schedule'} {...a11yProps(2)}
                             sx={{fontFamily: ['Consolas'], borderRadius: 50}} key={2}
                             onClick={() => navigate('/timeline')}/>
                        <Tab icon={selectedTab(3, value, 'random')} label={'Random Title'} {...a11yProps(3)}
                             sx={{fontFamily: ['Consolas'], borderRadius: 50}} key={3} onClick={()=>navigate(`/anime/${randomAnime()}`)}/>
                        <Divider/>
                        {sessionService.getCurrentUser().is_admin ? (
                            <Tab icon={selectedTab(4, value, 'admin')} label={'Administration'} {...a11yProps(4)}
                                 sx={{fontFamily: ['Consolas'], borderRadius: 50}} key={4}
                                 onClick={() => navigate('/administration')}/>
                        ) : null}
                    </Tabs>
                </ThemeProvider>
            </Drawer>
        </React.Fragment>

    )
}

export default MenuItemComponent