import * as React from "react";
import {DrawerHeader, Main} from "../../../ui/styles/styles";
import MenuItemComponent from "../../Menu/Menu-Item.component";
import {Typography} from "@mui/material";

export default function UserPageComponent(){

    return (
        <Main open={true}>
            <MenuItemComponent value={0} disabled={true}/>
            <DrawerHeader/>
            <Typography>
                Genearal Inforamtion
            </Typography>
        </Main>
    )
}