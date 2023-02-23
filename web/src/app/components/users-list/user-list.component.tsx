import * as React from 'react';
import UserListTabComponent from "../../ui/tab-panel/user-list-tabs/user-list-tabs.component";
import UserListService from "../../sevices/user_list.services";
import {finalize} from "rxjs";
import {IAnime} from "../../types/types";
import * as colors from "@mui/material/colors";
import {Tools} from "../../../tools";
import {DrawerHeader, Main} from "../../ui/styles/styles";
import MenuItemComponent from "../Menu/Menu-Item.component";
import sessionService from "../../sevices/session.service";

interface UserListProps{
    user_lists: string[]
    open: boolean;
}

interface UserListRow{
    [index: string]: IAnime[]
}


export default class UserListComponent extends React.Component<UserListProps,
    { bookmarks: string[], anime: IAnime[], UserList: UserListRow, language: string }>{

    public lists: string[] = []
    public anime: IAnime[] = []
    private color = colors.teal[900]
    public user_list: UserListRow = {};
    constructor(props: UserListProps) {
        super(props);
        this.state = {bookmarks: [], anime: [], UserList: {}, language: sessionService.getCurrentUser().language}
        this.fetchLists = this.fetchLists.bind(this)
    }

    fetchLists(){
        UserListService.getAllMyLists()
            .pipe(finalize(() => {
                this.setState({UserList: this.user_list, bookmarks: this.lists})
            }))
            .subscribe((response) => {
                let users_list: UserListRow = {};
                let lists: string[] = []
                response.data.data.map((user_list) => {
                    users_list[user_list.bookmark_name] = user_list.anime
                    this.user_list = users_list
                    lists.push(user_list.bookmark_name)
                    this.lists = lists
                })
            })
    }

    componentDidMount() {
        this.fetchLists()
    }

    componentDidUpdate(prevProps: Readonly<UserListProps>, prevState: Readonly<{ bookmarks: string[]; anime: IAnime[]; UserList: UserListRow }>, snapshot?: any) {
        if (prevState.bookmarks.length !== this.state.bookmarks.length){
            this.fetchLists()
        } if(this.state.language !== sessionService.getCurrentUser().language){
            this.setState({language: sessionService.getCurrentUser().language})
            this.fetchLists()
        }
    }

    render() {
        return (
            <Main open={this.props.open}>
                <MenuItemComponent value={1} disabled={true}/>
                <DrawerHeader/>
                <UserListTabComponent key={1}
                                      type={"user"}
                                      sx={{borderBottom: 1, borderColor: 'divider'}}
                                      bookmarks={this.state.bookmarks}
                                      UserList={this.state.UserList}/>
            </Main>
        );
    }
}