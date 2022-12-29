import * as React from "react";
import './navbar.component.scss'
import {Crown, Alien, SignOut, Atom} from 'phosphor-react'
import {MenuHeader, Style} from "../../models/menu.model";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import sessionService from "../../sevices/session.service";

export interface Setting{
    element: JSX.Element;
    link: string;
}
export default class NavbarComponent extends React.Component<MenuHeader, Style>{

    constructor(props: MenuHeader, private setting: Setting) {
        super(props);
        this.state = {};
        this.handleOpenNavMenu = this.handleOpenNavMenu.bind(this)
        this.handleOpenUserMenu = this.handleOpenUserMenu.bind(this)
        this.handleCloseNavMenu = this.handleCloseNavMenu.bind(this)
        this.handleCloseUserMenu = this.handleCloseUserMenu.bind(this)
    }

    pages = ['Genres', 'Ongoings']
    settings = [
        {
        icon:<Crown size={40}/>,
        text: 'Admin Panel',
        link: '/administration'
    },
        {
            icon: <Alien size={40}/>,
            text: 'Edit Profile',
            link: ''
        },
        {
            icon: <SignOut size={40}/>,
            text: "Log Out",
            link: ''
        }
         ];
    handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({anchorElNav: event.currentTarget})
    };
    handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({anchorElUser: event.currentTarget})
    };

    handleCloseNavMenu = () => {
        this.setState({anchorElNav: null})
    };

     handleCloseUserMenu = () => {
         this.setState({anchorElUser: null})
    };

    render() {
        return (
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/*<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />*/}
                        <Atom size={40}/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={this.handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={this.state?.anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(this.state?.anchorElNav)}
                                onClose={this.handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {this.pages.map((page) => (
                                    <MenuItem key={page} onClick={this.handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {this.pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={this.handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={this.handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={sessionService.getCurrentUser().nickname} src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={this.state?.anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(this.state?.anchorElUser)}
                                onClose={this.handleCloseUserMenu}
                            >
                                {this.settings.map((setting, index) => (
                                    <MenuItem key={index} onClick={this.handleCloseUserMenu}>
                                        {setting.icon}
                                        <Button
                                            key={index}
                                            onClick={()=>{document.location.replace(setting.link)}}
                                            sx={{ my: 2, color: 'black', display: 'block' }}
                                        >
                                            {setting.text}
                                        </Button>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>)
    }
}