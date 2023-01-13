import * as React from "react";
import {MenuListProps} from "../../types/types";
import {Menu} from "@mui/material";

export default function MenuListComponent<T>(props: MenuListProps<T>){
    return (
        <Menu
            // sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={props.anchorElUser}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(props.anchorElUser)}
            onClose={props.handleCloseUserMenu}
        >
            {props.items.map(props.renderItems)}
        </Menu>
    )
}