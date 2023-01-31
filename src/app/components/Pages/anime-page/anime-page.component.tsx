import * as React from "react";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import AnimeComponent from "./anime.component";
import {ISetting} from "../../Menu/Menu.component";
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
import {a11yProps, AppBar, DrawerHeader, drawerWidth, Main, userListTheme} from "../../../ui/styles/styles";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import FortIcon from "@mui/icons-material/Fort";
import sessionService from "../../../sevices/session.service";
import {Tools} from "../../../../tools";
import LogoutIcon from "@mui/icons-material/Logout";
import AnimeMobileComponent from "./anime-page-mobile/anime.mobile.component";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {ThemeProvider} from "@mui/material/styles";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import CreateIcon from "@mui/icons-material/Create";
import PaddingMenuComponent from "../../../ui/padding-menu/padding-menu.component";


export default function AnimePageComponent() {
    const params = useParams();
    const id = params.id;
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [settings, setSettings] = useState<ISetting[]>([])
    const [windowDimensions, setWindowDimensions] = useState(Tools.getWindowDimension());
    const navigate = useNavigate()
    const theme = useTheme();
    const [open, setOpen] = React.useState<boolean>(false);
    const [value, setValue] = React.useState<number>(0);

    let Setting: ISetting = {
        icon: <LogoutIcon/>,
        text: 'Sign Out',
        link: ''
    }

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
        setSettings([Setting])
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
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
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{mr: 1, ...(open && {display: 'none'})}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <IconButton onClick={() => navigate('/menu')}>
                        <FortIcon/>
                    </IconButton>
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'flex'}}}/>
                    <Box sx={{flexGrow: 0}}>
                        <Typography sx={{fontFamily: 'consolas', fontSize: 15}}>
                            {sessionService.getCurrentUser()?.nickname + ' '}
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
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
                             label={'Anime List'} {...a11yProps(1)}
                             sx={{fontFamily: ['Consolas'], borderRadius: 50}} key={1}
                             onClick={() => navigate('/menu')}/>
                        <Tab icon={<FolderSharedIcon/>} label={'My List'} {...a11yProps(2)}
                             sx={{fontFamily: ['Consolas'], borderRadius: 50}} key={2}
                             onClick={() => navigate('/menu')}/>
                        <Divider/>
                        <Tab icon={<CreateIcon/>} label={'Administration'} {...a11yProps(3)}
                             sx={{fontFamily: ['Consolas'], borderRadius: 50}} key={3}
                             onClick={() => navigate('/menu')}/>
                    </Tabs>
                </ThemeProvider>
            </Drawer>
            {windowDimensions.minWidth < 1000 ? <Main>
                <AnimeMobileComponent _id={id} key={2}/>
            </Main> : <Main><AnimeComponent _id={id} key={2}/></Main>}
        </Box>
    )
}