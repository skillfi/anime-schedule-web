import * as  React from "react";
import {Typography, Box} from "@mui/material";


interface TabPanelProps{
    children?: JSX.Element;
    index: number;
    value: number;

}

export default function HorizonatalTabPanelComponent(props: TabPanelProps){
    const {children, value, index, ...other} = props;

    return (
        <div
            role={"tabpanel"}
            hidden={value !== index}
            id={`horizontal-tabpanel-${index}`}
            aria-labelledby={`horizontal-tab-${index}`}
            key={index}
            {...other}>
            {value === index && (
                <Box sx={{p:1, width: (theme)=> theme.spacing(160)}}>
                    {children}
                </Box>
            )}
        </div>
    )
}