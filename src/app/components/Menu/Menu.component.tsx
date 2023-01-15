import * as React from "react";
import './Menu.css'

import NavbarComponent from "../../ui/navbar/navbar.component";
import MenuBodyComponent, {BookmarkRow} from "./Menu-Body.component";
import {settings} from "../../../environments/environment";
import {User} from "../../models/form-data.model";
import {IAnime} from "../../types/types";

interface MenuState {
    anime: IAnime[];
    bookmarks: BookmarkRow[]
}

export default class MenuComponent extends React.Component<User, MenuState> {

    book = new Array<BookmarkRow>();

    constructor(props: any) {
        super(props);
        this.state = {anime: [], bookmarks: []}
    }

    componentDidMount() {
        document.title = settings.title + " Menu"
    }

    componentDidUpdate(prevProps: Readonly<User>, prevState: Readonly<any>, snapshot?: any) {
        document.title = settings.title + " Menu"
    }


    render() {
        return (
            <React.Fragment>
                <NavbarComponent/>
                <MenuBodyComponent/>
            </React.Fragment>);
    }
}