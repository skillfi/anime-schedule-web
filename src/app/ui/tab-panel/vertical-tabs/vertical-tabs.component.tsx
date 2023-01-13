import * as React from "react";
import {Box, SxProps, Tab, Tabs} from "@mui/material";
import * as colors from "@mui/material/colors";
import TabPanelComponent from "../tab-panel.component";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {TabComponent, TabProps} from "../../../types/types";
import {TabResult} from "../../../components/Menu/Menu-Body.component";


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

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

/** Vertical Tab prop
 * @property {Array<TabComponent>} tabComponent - `JSX.Element`
 * @property {Array<TabProps>} other - `Name and JSX.Element`
 * @property {TabResult} [tabs] - `JSX.Element`
 * @property {SxProps} sx - `Style`
 * @property {boolean} admin - `Administration`
 * @property {SxProps} tabs_sx - `Tabs Style`
 * @property {Array<TabComponent>} [adminComponent] - `JSX.Element (Admin)`
 * @property {Array<TabProps>} [adminOther] - `Name and Icon`
 */
export interface VerticalTab {
    tabComponent: TabComponent[];
    other: TabProps[];
    tabs?: TabResult;
    sx?: SxProps;
    admin?: boolean;
    tabs_sx?: SxProps;
    adminComponent?: TabComponent[];
    adminOther?: TabProps[];
}

export default function VerticalTabs(props: VerticalTab) {
    const [value, setValue] = React.useState(0);
    const color = colors.teal[500]
    const lblue = colors.lightBlue[300]

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    if (props.admin){
        return (
            <Box
                sx={props.sx}
            >
                <ThemeProvider theme={theme}>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Panel"
                        sx={{
                            borderRight: 1, borderColor: 'divider', color: color,
                            // background: `radial-gradient(${lblue}, ${colors.indigo[900]})`,
                            borderRadius: 10
                        }}
                        textColor="primary"
                        indicatorColor="secondary"
                    >
                        {props.other.map((other, index) =>
                            <Tab icon={other.icon} iconPosition={"start"} label={other.label} {...a11yProps(index)}
                                 sx={{fontFamily: ['Consolas'], borderRadius: 50, mt: 10}} key={index}/>
                        )}
                        {props.adminOther?.map((other) =>
                            <Tab icon={other.icon} iconPosition={"start"} label={other.label} {...a11yProps(3)}
                                 sx={{fontFamily: ['Consolas'], borderRadius: 50, mt: 10}} key={3}/>
                        )}
                    </Tabs>
                </ThemeProvider>
                {props.tabComponent.map((tab, index) => (
                    <TabPanelComponent index={index} value={value} key={index}>
                        {tab.component}
                    </TabPanelComponent>
                ))}
                {props.adminComponent?.map((tab, ) => (
                    <TabPanelComponent index={3} value={value} key={3}>
                        {tab.component}
                    </TabPanelComponent>
                ))}
            </Box>
        )
    }
    return (
        <Box
            sx={props.sx}
        >
            <ThemeProvider theme={theme}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Panel"
                    sx={{
                        borderRight: 1, borderColor: 'divider', color: color,
                        // background: `radial-gradient(${lblue}, ${colors.indigo[900]})`,
                        borderRadius: 10
                    }}
                    textColor="primary"
                    indicatorColor="secondary"
                >
                    {props.other.map((other, index) =>
                        <Tab icon={other.icon} iconPosition={"start"} label={other.label} {...a11yProps(index)}
                             sx={{fontFamily: ['Consolas'], borderRadius: 50, mt: 10}} key={index}/>
                    )}
                </Tabs>
            </ThemeProvider>
            {props.tabComponent.map((tab, index) => (
                <TabPanelComponent index={index} value={value} key={index}>
                    {tab.component}
                </TabPanelComponent>
            ))}
        </Box>
    );
}