import * as React from "react";
import {useEffect, useState} from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Tab,
    TableBodyProps,
    Tabs,
    TextField
} from "@mui/material";
import * as colors from "@mui/material/colors";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {TabComponent, TabProps} from "../../../types/types";
import {BookmarkRow, TabResult} from "../../../components/Menu/Menu-Body.component";
import HorizonatalTabPanelComponent from "./horizonatal-tab-panel.component";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import UserListComponent from "../../user-list/user-list.component";
import AddIcon from "@mui/icons-material/Add";
import UserListService from "../../../sevices/user_list.services";
import {finalize} from "rxjs";


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
 * @property {Array<BookmarkRow>} bookmarks - `Bookmarks with anime`
 * @property {string} type - `Type Panel`
 */
export interface HorizontalTab extends TableBodyProps {
    list_name?: string;
    list_count?: number;
    lists: string[]
    bookmarks: BookmarkRow[];
    type: 'admin' | 'user' | string;
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
    const [bookmark, setBookmark] = useState<string[]>([])
    const [open, setOpen] = React.useState(false);
    const data = new FormData()
    const [name, setName] = useState<string>('')

    useEffect(() => {

    }, [props.lists])
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        data.append('bookmark_name', name)
        UserListService.createNew(data)
            .pipe(finalize(() => {
                setOpen(false)
                props.lists.push(name)
            }))
            .subscribe(() => {
            })
            .unsubscribe();
    };


    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        switch (e.currentTarget.name) {
            case 'name': {
                setName(e.currentTarget.value)
                break;
            }
        }
        console.log(e.currentTarget.name)
    }

    return (
        <Box
            sx={props.sx}
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

                    {props.type === 'user' ? props.lists.map((name, index) =>
                        <Tab icon={<AutoStoriesIcon/>} iconPosition={"start"} label={name}
                             sx={{fontFamily: ['Consolas'], borderRadius: 20}} key={index}
                             aria-label={name} {...a11yProps(index)}/>
                    ) : props.type === 'admin' ? props.lists.map((name, index) =>
                        <Tab icon={<AutoStoriesIcon/>} iconPosition={"start"} label={name}
                             sx={{fontFamily: ['Consolas'], borderRadius: 20}} key={index}
                             aria-label={name} {...a11yProps(index)}/>) : <React.Fragment/>}
                    <Tab icon={<AddIcon/>} label={'Add New'} sx={{fontFamily: ['Consolas'], borderRadius: 20}}
                         key={props.lists.length}
                         aria-label={'Add New'} {...a11yProps(props.lists.length)} onClick={handleClickOpen}/>
                </Tabs>
            </ThemeProvider>
            {props.type === 'user' ? props.lists.map((name, index) =>
                <HorizonatalTabPanelComponent index={index} value={value} key={index}>
                    <UserListComponent list_name={name} key={index}
                                       columns={['Image', 'Name', 'Quality', 'Episodes',
                                           'Release_date', 'Rating', 'Time', 'Country']}
                                       rows={props.bookmarks} lists={props.lists}/>
                </HorizonatalTabPanelComponent>
            ) : props.type === 'admin' ? props.lists.map((name, index) =>
                <UserListComponent list_name={name} key={index}
                                   columns={['Image', 'Name', 'Quality', 'Episodes',
                                       'Release_date', 'Rating', 'Time', 'Country']}
                                   rows={props.bookmarks} lists={props.lists}/>) : <React.Fragment/>}
            <HorizonatalTabPanelComponent index={props.lists.length} value={props.lists.length}
                                          key={props.lists.length}>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Create New bookmark?
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="BookMark Name"
                            type="name"
                            fullWidth
                            variant="standard"
                            name={"name"}
                            onChange={onChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                        <Button onClick={handleClose}>Add</Button>
                    </DialogActions>
                </Dialog>
            </HorizonatalTabPanelComponent>
        </Box>
    );
}