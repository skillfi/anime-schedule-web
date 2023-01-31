import * as React from "react";
import {useState} from "react";
import './Menu.css'

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
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import FortIcon from "@mui/icons-material/Fort";
import sessionService from "../../sevices/session.service";
import {a11yProps, AppBar, DrawerHeader, drawerWidth, userListTheme} from "../../ui/styles/styles";
import {useNavigate} from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import {Tools} from "../../../tools";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import CreateIcon from "@mui/icons-material/Create";
import {ThemeProvider} from "@mui/material/styles";
import TabPanelFC from "../../ui/tab-panel/tab-panel.component";
import AnimeListComponent from "../anime-list/anime-list.component";
import UserListComponent from "../users-list/user-list.component";
import AdminListComponent from "../admin-list/admin-list.component";
import PaddingMenuComponent from "../../ui/padding-menu/padding-menu.component";

export interface ISetting {
    icon: React.ReactNode | JSX.Element;
    text: string;
    link: string;
}

export default function MenuComponent() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [settings, setSettings] = useState<ISetting[]>([])
    const [windowDimensions, setWindowDimensions] = useState(Tools.getWindowDimension());
    const [userOpen, setUserOpen] = useState<boolean>(false);
    const navigate = useNavigate()
    const theme = useTheme();
    const [open, setOpen] = React.useState<boolean>(false);
    const [value, setValue] = React.useState<number>(0);

    let Setting: ISetting = {
        icon: <LogoutIcon/>,
        text: 'Sign Out',
        link: '/'
    }

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
        setSettings([Setting])
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
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    function handleChange(event: React.SyntheticEvent, newValue: number) {
        event.preventDefault()
        setValue(newValue)
    }

    return (
        <Box sx={{display: 'flex'}}>
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
                        <MenuIcon/>
                    </IconButton>
                    <IconButton onClick={() => navigate('menu')}>
                        <FortIcon/>
                    </IconButton>
                    <Box sx={{flexGrow: 2, display: {xs: 'flex', md: 'flex'}}}/>
                    <Box sx={{flexGrow: 0}}>
                        <Typography sx={{fontFamily: 'consolas', fontSize: 20}}>
                            {sessionService.getCurrentUser()?.nickname + ' '}
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0, mr: 5, cursor: userOpen ? 'help': 'pointer'}}>
                                    <Avatar alt={sessionService.getCurrentUser()?.nickname}/>
                                </IconButton>
                            </Tooltip>
                        </Typography>
                        <PaddingMenuComponent anchorElUser={anchorElUser} handleCloseUserMenu={handleCloseUserMenu}/>
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
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
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
                        <Tab icon={<FormatListBulletedIcon/>}
                             label={'Anime List'} {...a11yProps(0)}
                             sx={{fontFamily: ['Consolas'], borderRadius: 50}} key={0}/>
                        <Tab icon={<FolderSharedIcon/>} label={'My List'} {...a11yProps(1)}
                             sx={{fontFamily: ['Consolas'], borderRadius: 50}} key={1}/>
                        <Divider/>
                        <Tab icon={<CreateIcon/>} label={'Administration'} {...a11yProps(2)}
                             sx={{fontFamily: ['Consolas'], borderRadius: 50}} key={2}/>
                    </Tabs>
                </ThemeProvider>
            </Drawer>
            <TabPanelFC index={0} value={value}>
                <AnimeListComponent rows={[]} user_lists={[]} open={open}/>
            </TabPanelFC>
            <TabPanelFC index={1} value={value}>
                <UserListComponent user_lists={[]} open={open}/>
            </TabPanelFC>
            <TabPanelFC index={2} value={value}>
                <AdminListComponent open={open}/>
            </TabPanelFC>
        </Box>);
}