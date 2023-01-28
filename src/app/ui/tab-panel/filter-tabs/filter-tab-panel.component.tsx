import * as  React from "react";
import {Typography, Box} from "@mui/material";


interface TabPanelProps{
    children?: JSX.Element;
    index: number;
    value: number;

}

export default function FilterTabPanelComponent(props: TabPanelProps){
    const {children, value, index, ...other} = props;

    return (
        <div
            role={"tabpanel"}
            hidden={value !== index}
            id={`filter-tab-panel-${index}`}
            aria-labelledby={`filter-tab-${index}`}
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