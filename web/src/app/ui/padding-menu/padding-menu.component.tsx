import * as React from "react";
import {FormControl, FormControlLabel, FormGroup, FormLabel, Menu, MenuItem, Switch} from "@mui/material";
import loginService from "../../sevices/login.service";
import {finalize} from "rxjs";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";

import {useNavigate} from "react-router-dom";
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import usersService from "../../sevices/users.service";
import sessionService from "../../sevices/session.service";
import {useEffect, useState} from "react";
import LanguageSelectorComponent from "../buttons/language-selector.component";

interface PaddingMenuProps {
    anchorElUser: HTMLElement | null;
    handleCloseUserMenu: (event: Object) => void;
    language: string;
}

export default function PaddingMenuComponent(props: PaddingMenuProps){
    const navigate = useNavigate();
    const {anchorElUser, handleCloseUserMenu} = props
    const [language, setLanguage] = useState<string>('')
    const [state, setState] = React.useState({
        [language]: true
    });


    useEffect(()=>{
        setState({...state, [language]: true})
    }, [state, language])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const data = {language: event.target.name}
        usersService.updateUser(data)
            .pipe(finalize(()=>{
                setState({
                    ...state,
                    // @ts-ignore
                    [event.target.name]: event.target.checked,
                });
                // eslint-disable-next-line no-restricted-globals
                location.reload()
            }))
            .subscribe((response)=>{
                // @ts-ignore
                return setLanguage(response.data.data?.language);
            })
    };

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
            <MenuItem>
                <LanguageSelectorComponent/>
            </MenuItem>
        </Menu>
    )
}