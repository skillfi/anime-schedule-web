import * as React from "react";
import {
    AlertColor,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Tab,
    TextField
} from "@mui/material";
import * as colors from "@mui/material/colors";
import {IAnime, TabComponent, TabProps} from "../../../types/types";
import FilterTabPanelComponent from "./filter-tab-panel.component";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import TableComponent from "../../table/table.component";
import AddIcon from "@mui/icons-material/Add";
import UserListService from "../../../sevices/user_list.services";
import {finalize} from "rxjs";
import CustomAlert from "../../alert/CustomAlert";
import {BoxProps} from "@material-ui/core";
import {StyledTabs} from "../../styles/styles";

function a11yProps(index: number) {
    return {
        id: `filter-tab-${index}`,
        'aria-controls': `filter-tab-panel-${index}`,
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
export interface FilterTab extends BoxProps {
    bookmarks: string[];
    type: 'admin' | 'user' | string;
    UserList: UserListRow;
}

interface UserListRow{
    [index: string]: any[]
}

export default class FilterTabComponent extends React.Component<FilterTab,
    {
        value: number, open: boolean, name: string, bookmarks: string[], current_list: string, anime: IAnime[],
        alert: boolean, response: AlertColor, message: string
    }> {
    data = new FormData()
    lists: string[] = []
    anime: IAnime[] = []
    color = colors.teal[900]
    user_list: UserListRow = {};

    constructor(props: FilterTab) {
        super(props);
        this.state = {
            value: 0, open: false, name: '', current_list: '', anime: [], bookmarks: [],
            alert: false, response: 'success', message: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    handleChange(event: React.SyntheticEvent, newValue: number) {
        this.setState({value: newValue})
        this.setState({current_list: this.lists[newValue]})
    }

    handleClickOpen() {
        this.setState({open: true})
    }

    handleClose() {
        this.data.append('bookmark_name', this.state.name)
        UserListService.createNew(this.data)
            .pipe(finalize(() => {
                this.setState({open: false})
                this.lists.push(this.state.name)
            }))
            .subscribe((response) => {
                switch (response.status) {
                    case 200: {
                        this.setState({open: false, response: "success", message: response.statusText, alert: true})
                        this.lists.push(this.state.name)
                    }
                }
            })

    }

    onChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        switch (e.currentTarget.name) {
            case 'name': {
                this.setState({name: e.currentTarget.value})
                break;
            }
        }
    }

    componentDidUpdate(prevProps: Readonly<FilterTab>,
                       prevState: Readonly<{ value: number; open: boolean; name: string; bookmarks: string[]; current_list: string; anime: IAnime[] }>,
                       snapshot?: any) {
        if (prevState.current_list !== this.state.current_list){
            this.setState({anime: this.props.UserList[this.state.current_list]})
        }
    }

    componentDidMount() {
        this.setState({anime: this.props.UserList[this.state.current_list]})
    }

    componentWillUnmount() {
        this.setState({value: 0, open: false, name: '', bookmarks: [], current_list: '', anime: []})
    }

    render() {
        return (
            <Box
                sx={this.props.sx}
            >
                <StyledTabs
                    orientation="horizontal"
                    value={this.state.value}
                    onChange={this.handleChange}
                    // variant="scrollable"
                    centered={true}
                >
                    {this.props.bookmarks.map((name, index) =>
                        <Tab icon={<AutoStoriesIcon/>} iconPosition={"start"} label={name}
                             sx={{fontFamily: ['Consolas'], borderRadius: 20}} key={index}
                             aria-label={name} {...a11yProps(index)}/>
                    )}
                    <Tab icon={<AddIcon/>} label={'Add New'} sx={{fontFamily: ['Consolas'], borderRadius: 20}}
                         key={this.state.bookmarks.length}
                         aria-label={'Add New'} {...a11yProps(this.state.bookmarks.length)}
                         onClick={this.handleClickOpen}/>
                </StyledTabs>
                {this.props.bookmarks.map((name, index) =>
                    <FilterTabPanelComponent index={index} value={this.state.value} key={index}>
                        {this.props.type == 'admin' ? <TableComponent list_name={name} key={index} type={'admin'}
                                                                      columns={['Image', 'Name', 'Quality', 'Episodes', 'Rating',
                                                                          'Subscribe', 'Actions']}
                                                                      rows={this.props.UserList[name]} lists={[]}
                                                                      actions={['refresh', 'update', 'delete']}/> :
                            <TableComponent list_name={name} key={index} type={'user'}
                                            columns={['Image', 'Name', 'Quality', 'Episodes', 'Rating',
                                                'Subscribe']}
                                            rows={this.props.UserList[name]} lists={[]}
                                            actions={[]}/>}

                    </FilterTabPanelComponent>
                )}
                <FilterTabPanelComponent index={this.state.bookmarks.length} value={this.lists.length}
                                         key={this.state.bookmarks.length}>
                    <Dialog open={this.state.open} onClose={this.handleClose}>
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
                                onChange={this.onChange}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose}>Close</Button>
                            <Button onClick={this.handleClose}>Add</Button>
                        </DialogActions>
                    </Dialog>
                </FilterTabPanelComponent>
                <CustomAlert message={this.state.message} open={this.state.alert}
                             onClose={() => this.setState({alert: false})}/>
            </Box>
        );
    }

}

// /** Horizontal Tab React element
//  *
//  * @param {HorizontalTab} props - `Props for Tabs`
//  * @constructor
//  */
// export default function HorizontalTabsComponent(props: HorizontalTab) {
//     const [value, setValue] = React.useState(0);
//     const color = colors.teal[900]
//     const lblue = colors.lightBlue[900]
//     const [bookmark, setBookmark] = useState<string[]>([])
//     const [open, setOpen] = React.useState(false);
//     const data = new FormData()
//     const [name, setName] = useState<string>('')
//
//     useEffect(() => {
//
//     }, [props.lists])
//     const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//         setValue(newValue);
//     };
//
//     const handleClickOpen = () => {
//         setOpen(true);
//     };
//
//     const handleClose = () => {
//         data.append('bookmark_name', name)
//         UserListService.createNew(data)
//             .pipe(finalize(() => {
//                 setOpen(false)
//                 props.lists.push(name)
//             }))
//             .subscribe(() => {
//             })
//             .unsubscribe();
//     };
//
//
//     function onChange(e: React.ChangeEvent<HTMLInputElement>) {
//         e.preventDefault()
//         switch (e.currentTarget.name) {
//             case 'name': {
//                 setName(e.currentTarget.value)
//                 break;
//             }
//         }
//         console.log(e.currentTarget.name)
//     }
//
//     return (
//         <Box
//             sx={props.sx}
//         >
//             <ThemeProvider theme={theme}>
//                 <Tabs
//                     orientation="horizontal"
//                     value={value}
//                     onChange={handleChange}
//                     // variant="scrollable"
//                     centered={true}
//                     sx={{
//                         borderRight: 2, borderColor: 'divider', color: color,
//                         background: `transparent`, width: 'fullwidth',
//                         borderRadius: 10
//                     }}
//                     textColor="primary"
//                     indicatorColor="secondary"
//                 >
//
//                     {props.type === 'user' ? props.lists.map((name, index) =>
//                         <Tab icon={<AutoStoriesIcon/>} iconPosition={"start"} label={name}
//                              sx={{fontFamily: ['Consolas'], borderRadius: 20}} key={index}
//                              aria-label={name} {...a11yProps(index)}/>
//                     ) : props.type === 'admin' ? props.lists.map((name, index) =>
//                         <Tab icon={<AutoStoriesIcon/>} iconPosition={"start"} label={name}
//                              sx={{fontFamily: ['Consolas'], borderRadius: 20}} key={index}
//                              aria-label={name} {...a11yProps(index)}/>) : <React.Fragment/>}
//                     <Tab icon={<AddIcon/>} label={'Add New'} sx={{fontFamily: ['Consolas'], borderRadius: 20}}
//                          key={props.lists.length}
//                          aria-label={'Add New'} {...a11yProps(props.lists.length)} onClick={handleClickOpen}/>
//                 </Tabs>
//             </ThemeProvider>
//             {props.type === 'user' ? props.lists.map((name, index) =>
//                 <AdministrationTabPanelComponent index={index} value={value} key={index}>
//                     <TableComponent list_name={name} key={index}
//                                        columns={['Image', 'Name', 'Quality', 'Episodes',
//                                            'Release_date', 'Rating', 'Time', 'Country']}
//                                        rows={props.bookmarks} lists={props.lists}/>
//                 </AdministrationTabPanelComponent>
//             ) : props.type === 'admin' ? props.lists.map((name, index) =>
//                 <TableComponent list_name={name} key={index}
//                                    columns={['Image', 'Name', 'Quality', 'Episodes',
//                                        'Release_date', 'Rating', 'Time', 'Country']}
//                                    rows={props.bookmarks} lists={props.lists}/>) : <React.Fragment/>}
//             <AdministrationTabPanelComponent index={props.lists.length} value={props.lists.length}
//                                           key={props.lists.length}>
//                 <Dialog open={open} onClose={handleClose}>
//                     <DialogTitle>Subscribe</DialogTitle>
//                     <DialogContent>
//                         <DialogContentText>
//                             Create New bookmark?
//                         </DialogContentText>
//                         <TextField
//                             autoFocus
//                             margin="dense"
//                             id="name"
//                             label="BookMark Name"
//                             type="name"
//                             fullWidth
//                             variant="standard"
//                             name={"name"}
//                             onChange={onChange}
//                         />
//                     </DialogContent>
//                     <DialogActions>
//                         <Button onClick={handleClose}>Close</Button>
//                         <Button onClick={handleClose}>Add</Button>
//                     </DialogActions>
//                 </Dialog>
//             </AdministrationTabPanelComponent>
//         </Box>
//     );
// }