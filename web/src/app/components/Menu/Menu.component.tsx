import * as React from "react";
import './Menu.css'

import {Box} from "@mui/material";
import MenuItemComponent from "./Menu-Item.component";

export interface ISetting {
    icon: React.ReactNode | JSX.Element;
    text: string;
    link: string;
}

export default function MenuComponent() {


    return (
        <Box sx={{display: 'flex'}}>
            <MenuItemComponent value={0} disabled={true}/>
        </Box>);
}