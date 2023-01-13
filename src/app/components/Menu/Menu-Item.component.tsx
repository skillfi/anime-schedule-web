import * as React from "react";
import {Button, MenuItem} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {ISetting, MenuItemProps, MenuListProps} from "../../types/types";
import {FC} from "react";
import loginService from "../../sevices/login.service";
import {finalize} from "rxjs";

const MenuItemComponent: FC<MenuItemProps> = ({setting, onClick}) => {
    const navigate = useNavigate();
    return (
        <MenuItem onClick={() => onClick(setting)}>
            {setting.icon}
            <Button
                onClick={() => {
                    loginService.logOut().pipe(finalize(()=>{navigate('/')}))
                        .subscribe(()=>{})
                }}
                sx={{my: 2, color: 'black', display: 'block'}}
            >
                {setting.text}
            </Button>
        </MenuItem>
    )
}

export default MenuItemComponent