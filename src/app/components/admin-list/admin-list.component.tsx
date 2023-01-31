import * as React from "react";
import AnimeServices from "../../sevices/anime.services";
import {finalize} from "rxjs";
import AdministrationTabComponent from "../../ui/tab-panel/administration-tabs/administration-tabs.component";
import {Main} from "../../ui/styles/styles";

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
                <AdministrationTabComponent key={3}
                                            type={'user'}
                                            sx={{borderBottom: 1, borderColor: 'divider'}}
                                            bookmarks={this.state.bookmarks}
                                            UserList={this.state.AdminList}/>
            </Main>
        );
    }
}