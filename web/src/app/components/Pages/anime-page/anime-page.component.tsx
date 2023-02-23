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
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PaddingMenuComponent from "../../../ui/padding-menu/padding-menu.component";
import MenuItemComponent from "../../Menu/Menu-Item.component";


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
    const [value, setValue] = React.useState<number>(1);

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
            <MenuItemComponent value={3} disabled={false}/>
            {windowDimensions.minWidth < 1000 ? <Main>
                <AnimeMobileComponent _id={id} key={2}/>
            </Main> : <Main><AnimeComponent _id={id} key={2}/></Main>}
        </Box>
    )
}