import * as React from "react";
import {Box, Tab, Tabs} from "@mui/material";
import * as colors from "@mui/material/colors";
import TabPanelComponent from "../tab-panel.component";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {TabComponent, TabProps} from "../../../types/types";
import {TabResult} from "../../../components/Menu/Menu-Body.component";
import HorizonatalTabPanelComponent from "./horizonatal-tab-panel.component";


const theme = createTheme({
    palette: {
        primary: {
            main: colors.lightBlue[900]
        },
        secondary: {
            main: colors.deepPurple[900]
        },
    }
});

function a11yProps(index: number) {
    return {
        id: `horizontal-tab-${index}`,
        'aria-controls': `horizontal-tabpanel-${index}`,
    };
}

/** Horizontal Tab Props
 * @property {Array<TabComponent>} tabComponent - `Component in tabs`
 * @property {Array<TabProps>} other - `Name and Icon`
 * @property {TabResult} [tabs] - `Tabs`
 * @property {string} [list_name] - `BookMark Names`
 * @property {number} [list_count] - `Count of serials in bookmark`
 */
export interface HorizontalTab {
    tabComponent: TabComponent[];
    other: TabProps[];
    tabs?: TabResult;
    list_name?: string;
    list_count?: number;
}

/** Horizontal Tab React element
 *
 * @param {HorizontalTab} props - `Props for Tabs`
 * @constructor
 */
export default function HorizontalTabsComponent(props: HorizontalTab) {
    const [value, setValue] = React.useState(0);
    const color = colors.teal[900]
    const lblue = colors.lightBlue[900]

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ borderBottom: 1, borderColor: 'divider', width: '100%'}}
        >
            <ThemeProvider theme={theme}>
                <Tabs
                    orientation="horizontal"
                    value={value}
                    onChange={handleChange}
                    // variant="scrollable"
                    centered={true}
                    sx={{
                        borderRight: 2, borderColor: 'divider', color: color,
                        background: `transparent`, width: 'fullwidth',
                        borderRadius: 10
                    }}
                    textColor="primary"
                    indicatorColor="secondary"
                >
                    {props.other.map((other, index) =>
                        <Tab icon={other.icon} iconPosition={"start"} label={other.label}
                             sx={{fontFamily: ['Consolas'], borderRadius: 20}} key={index}
                        aria-label={other.label} {...a11yProps(index)}/>
                    )}
                </Tabs>
            </ThemeProvider>
            {props.tabComponent.map((tab, index) => (
                <HorizonatalTabPanelComponent index={index} value={value} key={index}>
                    {tab.component}
                </HorizonatalTabPanelComponent>
            ))}
        </Box>
    );
}