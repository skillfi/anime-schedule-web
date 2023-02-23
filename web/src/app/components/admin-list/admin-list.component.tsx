import * as React from "react";
import AnimeServices from "../../sevices/anime.services";
import {finalize} from "rxjs";
import AdministrationTabComponent from "../../ui/tab-panel/administration-tabs/administration-tabs.component";
import {DrawerHeader, Main} from "../../ui/styles/styles";
import MenuItemComponent from "../Menu/Menu-Item.component";
import {CssBaseline} from "@mui/material";

interface UserListRow{
    [index: string]: any[]
}
export default class AdminListComponent extends React.Component<{open: boolean}, {bookmarks: string[], rows: any[],
AdminList: UserListRow}>{

    constructor(props: any) {
        super(props);
        this.state = {bookmarks: ['Manage Anime'], rows: [], AdminList: {}}
    }

    book: any[] = []
    list: UserListRow = {}

    fetch(){
        AnimeServices.getAll()
            .pipe(finalize(()=>this.setState({rows: this.book, AdminList: this.list})))
            .subscribe((response)=>{
                this.book = response.data.data
                this.list['Manage Anime'] = response.data.data
            })
    }

    componentDidMount() {
        this.fetch()
    }

    render() {
        return (
            <Main open={this.props.open}>
                <CssBaseline/>
                <MenuItemComponent value={4} disabled={true}/>
                <DrawerHeader/>
                <AdministrationTabComponent key={3}
                                            type={'admin'}
                                            sx={{borderBottom: 1, borderColor: 'divider'}}
                                            bookmarks={this.state.bookmarks}
                                            UserList={this.state.AdminList}/>
            </Main>
        );
    }
}