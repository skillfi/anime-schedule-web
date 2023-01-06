import * as  React from "react";
import {Typography, Box} from "@mui/material";


interface TabPanelProps{
    children?: React.ReactNode;
    index: number;
    value: number;
}

export default function TabPanelComponent(props: TabPanelProps){
    const {children, value, index, ...other} = props;

    return (
        <div role={"tabpanel"} hidden={value !== index} id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{p:1, width: (theme)=> theme.spacing(240)}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}