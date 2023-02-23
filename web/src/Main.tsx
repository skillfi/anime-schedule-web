import {Routes, Route, BrowserRouter} from 'react-router-dom';
import * as React from "react";
import LoginComponent from "./app/components/Login/Login.component";
import MenuComponent from "./app/components/Menu/Menu.component";
import AnimePageComponent from "./app/components/Pages/anime-page/anime-page.component";
import GoogleSuccessComponent from "./app/components/Login/GoogleSucces.component";
import AnimeListComponent from "./app/components/anime-list/anime-list.component";
import UserListComponent from "./app/components/users-list/user-list.component";
import TimelineScheduleComponent from "./app/components/schedule/timeline-schedule.component";
import AdminListComponent from "./app/components/admin-list/admin-list.component";


export default function Main(){
    return (
        <Routes>
            <Route path={''} element={<LoginComponent/>} />
            <Route path={'login'} element={<GoogleSuccessComponent/>} />
            <Route path={'menu'} element={<MenuComponent/>}/>
            <Route path={'anime-list/search'} element={<AnimeListComponent rows={[]} user_lists={[]} open={true}/>}/>
            <Route path={'anime-list/user'} element={<UserListComponent user_lists={[]} open={true}/>}/>
            <Route path={'timeline'} element={<TimelineScheduleComponent open={true}/>}/>
            <Route path={'administration'} element={<AdminListComponent open={true}/>}/>
            <Route path="/anime/:id" element={<AnimePageComponent/>} />
        </Routes>
    )
}