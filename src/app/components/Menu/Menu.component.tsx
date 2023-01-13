import * as React from "react";
import {CSSProperties} from "react";
import './Menu.css'

import NavbarComponent from "../../ui/navbar/navbar.component";
import MenuBodyComponent from "./Menu-Body.component";
import {settings} from "../../../environments/environment";
import {User} from "../../models/form-data.model";


export default class MenuComponent extends React.Component<User, any>{

    constructor(props: any) {
        super(props);

    }

    componentDidMount() {
        document.title = settings.title + " Menu"
    }

    componentDidUpdate(prevProps: Readonly<User>, prevState: Readonly<any>, snapshot?: any) {
        document.title = settings.title + " Menu"
    }

    render() {
        return (
            <div>
                <NavbarComponent/>
                <MenuBodyComponent/>
            </div>);
    }
}