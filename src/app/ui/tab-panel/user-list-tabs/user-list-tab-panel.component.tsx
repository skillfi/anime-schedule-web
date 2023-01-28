import * as  React from "react";
import {Typography, Box} from "@mui/material";


interface TabPanelProps{
    children?: JSX.Element;
    index: number;
    value: number;

}

export default function UserListTabPanelComponent(props: TabPanelProps){
    const {children, value, index, ...other} = props;

    return (
        <div
            role={"tabpanel"}
            hidden={value !== index}
            id={`user-list-tab-panel-${index}`}
            aria-labelledby={`user-list-tab-${index}`}
            key={index}
            {...other}>
            {value === index && (
                <Box sx={{p:1}}>
                    {children}
                </Box>
            )}
        </div>
    )
}