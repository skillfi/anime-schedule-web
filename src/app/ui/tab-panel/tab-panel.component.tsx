import * as  React from "react";
import {Typography, Box, BoxProps} from "@mui/material";


interface TabPanelProps{
    children?: JSX.Element;
    index: number;
    value: number;

}

export default function TabPanelFC(props: TabPanelProps){
    const {children, value, index, ...other} = props;

    return (
        <div
            role={"tabpanel"}
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            key={index}
            {...other}>
            {value === index && (
                <Box sx={{p:0}}>
                    {children}
                </Box>
            )}
        </div>
    )
}