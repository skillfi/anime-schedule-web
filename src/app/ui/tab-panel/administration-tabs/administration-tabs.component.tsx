import * as React from "react";
import {AlertColor, Box, Tab} from "@mui/material";
import {IAnime, TabComponent, TabProps} from "../../../types/types";
import AdministrationTabPanelComponent from "./administration-tab-panel.component";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import TableComponent from "../../table/table.component";
import UserListService from "../../../sevices/user_list.services";
import {finalize} from "rxjs";
import CustomAlert from "../../alert/CustomAlert";
import {BoxProps} from "@material-ui/core";
import {adminTabsTheme, getColors, StyledTabs} from "../../styles/styles";
import {ThemeProvider} from "@mui/material/styles";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import {Tools} from "../../../../tools";

function a11yProps(index: number) {
    return {
        id: `administration-tab-${index}`,
        'aria-controls': `administration-tab-panel-${index}`,
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
export interface AdministrationTab extends BoxProps {
    bookmarks: string[];
    type: 'admin' | 'user' | string;
    UserList: UserListRow;
}

interface UserListRow {
    [index: string]: any[]
}

export default class AdministrationTabComponent extends React.Component<AdministrationTab,
    {
        value: number, open: boolean, name: string, bookmarks: string[], current_list: string, anime: IAnime[],
        alert: boolean, response: AlertColor, message: string, view: string
    }> {
    data = new FormData()
    lists: string[] = []
    anime: IAnime[] = []
    color = getColors('teal', 900)
    user_list: UserListRow = {};

    constructor(props: AdministrationTab) {
        super(props);
        this.state = {
            value: 0, open: false, name: '', current_list: '', anime: [], bookmarks: [],
            alert: false, response: 'success', message: '', view: 'list'
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.onChange = this.onChange.bind(this)
        this.changeView = this.changeView.bind(this)
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

    changeView(event: React.MouseEvent<HTMLElement>, nextView: string){
        this.setState({view: nextView})
    }

    componentDidUpdate(prevProps: Readonly<AdministrationTab>,
                       prevState: Readonly<{ value: number; open: boolean; name: string; bookmarks: string[]; current_list: string; anime: IAnime[] }>,
                       snapshot?: any) {
        if (prevState.current_list !== this.state.current_list) {
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
                <ToggleButtonGroup value={this.state.view} onChange={this.changeView} exclusive={true}>
                    <ToggleButton value="list" aria-label="list">
                        <ViewListIcon />
                    </ToggleButton>
                    <ToggleButton value="module" aria-label="module">
                        <ViewModuleIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
                <CustomAlert message={this.state.message} open={this.state.alert}
                             onClose={() => this.setState({alert: false})}/>
                <ThemeProvider theme={adminTabsTheme}>
                    <StyledTabs
                        orientation="horizontal"
                        value={this.state.value}
                        onChange={this.handleChange}
                        variant="scrollable"
                        sx = {{
                            mt: 10, width: Tools.getWindowDimension().minWidth * 0.9
                        }}
                        // centered={true}
                    >
                        {this.props.bookmarks.map((name, index) =>
                            <Tab icon={<AutoFixHighIcon/>} iconPosition={"start"} label={name}
                                 sx={{fontFamily: ['Consolas'], borderRadius: 20}} key={index}
                                 aria-label={name} {...a11yProps(index)}/>
                        )}
                    </StyledTabs>
                </ThemeProvider>
                {this.props.bookmarks.map((name, index) =>
                    <AdministrationTabPanelComponent index={index} value={this.state.value} key={index}>
                        <TableComponent list_name={name} key={index} type={'user'}
                                        columns={['Image', 'Name', 'Quality', 'Episodes', 'Rating',
                                            'Subscribe', 'Actions']}
                                        rows={this.props.UserList[name]} lists={[]}
                                        actions={['refresh', 'update', 'delete']}/>
                    </AdministrationTabPanelComponent>
                )}

            </Box>
        );
    }

}