import * as React from "react";
import {useState} from "react";
import './navbar.component.scss'
import {Atom} from 'phosphor-react'
import LogoutIcon from '@mui/icons-material/Logout';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import sessionService from "../../sevices/session.service";
import {useNavigate} from "react-router-dom";
import loginService from "../../sevices/login.service";
import {finalize} from "rxjs";
import {ISetting} from "../../types/types";
import MenuListComponent from "../../components/Menu/Menu-List.component";


export default function NavBarComponent() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [settings, setSettings] = useState<ISetting[]>([])
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const pages = ['Genres', 'Ongoings']
    const navigate = useNavigate()

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
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Atom size={40}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/anische"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 500,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            textAlign: 'center'
                        }}
                    >

                        {' Anime Schedule'}
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}/>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}/>
                    <Box sx={{flexGrow: 0}}>
                        <Typography sx={{fontFamily: 'consolas', fontSize: 20}}>
                            {sessionService.getCurrentUser()?.nickname + ' '}
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt={sessionService.getCurrentUser()?.nickname}/>
                                </IconButton>
                            </Tooltip>
                        </Typography>
                        <MenuListComponent items={settings} renderItems={(settings: ISetting) =>
                            (<MenuItem key={settings.text}>
                                    <Button startIcon={settings.icon} variant={'outlined'} onClick={() => {
                                        loginService.logOut().pipe(finalize(() => {
                                            navigate('/');
                                        }))
                                            .subscribe(()=>{})
                                    }
                                    }>
                                        {settings.text}
                                    </Button>
                                </MenuItem>
                            )}
                                           anchorElUser={anchorElUser} handleCloseUserMenu={handleCloseUserMenu}/>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>)
}