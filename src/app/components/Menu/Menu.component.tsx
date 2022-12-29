import * as React from "react";
import './Menu.css'
import {CSSProperties} from "react";

import NavbarComponent from "../../ui/navbar/navbar.component";
import MenuBodyComponent from "./MenuBody.component";
import {settings} from "../../../environments/environment";
import {User} from "../../models/form-data.model";
import SessionService from "../../sevices/session.service";



export default class MenuComponent extends React.Component<User, any>{

    constructor(props: any,
                private sessionService: typeof SessionService) {
        super(props);

    }

    componentDidMount() {
        document.title = settings.title + " Menu"
    }

    componentDidUpdate(prevProps: Readonly<User>, prevState: Readonly<any>, snapshot?: any) {
        document.title = settings.title + " Menu"
    }


    public menuStyle: CSSProperties = {
        height: 'auto'
    }
    render() {
        return (
            <div style={this.menuStyle} >
                <NavbarComponent user={SessionService.getCurrentUser()}/>
                <MenuBodyComponent/>
            </div>);
    }
}