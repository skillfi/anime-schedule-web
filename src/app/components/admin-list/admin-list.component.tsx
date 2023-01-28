import * as React from "react";
import AnimeServices from "../../sevices/anime.services";
import {finalize} from "rxjs";
import AdministrationTabComponent from "../../ui/tab-panel/administration-tabs/administration-tabs.component";

interface UserListRow{
    [index: string]: any[]
}
export default class AdminListComponent extends React.Component<any, {bookmarks: string[], rows: any[],
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
            <React.Fragment>
                <AdministrationTabComponent key={2}
                                            type={'admin'}
                                            sx={{borderBottom: 1, borderColor: 'divider', width: '100%'}}
                                            bookmarks={this.state.bookmarks}
                                            UserList={this.state.AdminList}/>
            </React.Fragment>
        );
    }
}