import * as React from "react";
import {Menu, MenuItem} from "@mui/material";
import loginService from "../../sevices/login.service";
import {finalize} from "rxjs";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import {useNavigate} from "react-router-dom";
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

interface PaddingMenuProps {
    anchorElUser: HTMLElement | null;
    handleCloseUserMenu: (event: Object) => void;
}

export default function PaddingMenuComponent(props: PaddingMenuProps){
    const navigate = useNavigate();
    const {anchorElUser, handleCloseUserMenu} = props

    return (
        <Menu
            sx={{ mt: 5 }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
        >
            <MenuItem>
                <IconButton onClick={() => {
                    loginService.logOut().pipe(finalize(() => {
                        navigate('/');
                    }))
                        .subscribe(() => {
                        })
                }} color={'secondary'}>
                    <LogoutIcon/>
                </IconButton>
                Log Out
            </MenuItem>
            <MenuItem>
                <IconButton>
                    <ContactEmergencyIcon/>
                </IconButton>
                Edit Profile
            </MenuItem>
            <MenuItem>
                <IconButton>
                    <PersonOutlineIcon/>
                </IconButton>
                View Info
            </MenuItem>
        </Menu>
    )
}