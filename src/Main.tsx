import { Routes, Route } from 'react-router-dom';
import * as React from "react";
import LoginComponent from "./app/components/Login/Login.component";
import MenuComponent from "./app/components/Menu/Menu.component";
import AdministrationComponent from "./app/components/administration/administration.component";

export default class Main extends React.Component<any, any>{
    render() {
        return (
            <Routes>
                <Route path='' element={<LoginComponent/>} />
                <Route path={'/menu'} element={<MenuComponent/>}/>
                <Route path={'/administration'} element={<AdministrationComponent/>}/>
            </Routes>
        )
    }
}