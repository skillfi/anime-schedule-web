import * as React from "react";
import {Tabs, Tab, Typography, Box} from "@mui/material";
import * as colors from "@mui/material/colors";
import TabPanelComponent from "../tab-panel.component";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const theme = createTheme({
    palette: {
        primary: {
            main: colors.lightBlue[300]
        },
        secondary: {
            main: colors.deepPurple[600]
        },
    }
});

export interface VerticalTabsProps{
    label?: string;
    component?: JSX.Element;
    icon?: JSX.Element;
}

export interface VerticalTab{
    tabs?: VerticalTabsProps[]
}

export default function VerticalTabs(props: VerticalTab) {
    const [value, setValue] = React.useState(0);
    const color = colors.teal[500]
    const lblue = colors.lightBlue[300]

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'transparent', display: 'flex', height: 770, width: 'max-content',
                marginTop: 25, borderRadius:5 }}
        >
            <ThemeProvider theme={theme}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Panel"
                    sx={{ borderRight: 1, borderColor: 'divider', color: color,
                        background: `radial-gradient(${lblue}, ${colors.indigo[900]})`,
                    borderRadius: 10}}
                    textColor="primary"
                    indicatorColor="secondary"
                >
                    {props.tabs?.map((tab, index)=>(
                        <Tab icon={tab.icon} iconPosition={"start"} label={tab.label} {...a11yProps(index)}
                        sx={{fontFamily: ['Consolas'], borderRadius: 50}}/>
                    ))}
                </Tabs>
            </ThemeProvider>
            {props.tabs?.map((tab, index)=>(
                <TabPanelComponent index={index} value={value}>
                    {tab?.component}
                </TabPanelComponent>
            ))}
        </Box>
    );
}