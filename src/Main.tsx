import {Routes, Route, BrowserRouter} from 'react-router-dom';
import * as React from "react";
import LoginComponent from "./app/components/Login/Login.component";
import MenuComponent from "./app/components/Menu/Menu.component";
import AnimePageComponent from "./app/components/Pages/anime-page/anime-page.component";


export default function Main(){
    return (
        <Routes>
            <Route path={''} element={<LoginComponent/>} />
            <Route path={'menu'} element={<MenuComponent/>}/>
            <Route path="/anime/:id" element={<AnimePageComponent/>} />
        </Routes>
    )
}