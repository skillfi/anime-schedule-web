import {Routes, Route, BrowserRouter} from 'react-router-dom';
import * as React from "react";
import LoginComponent from "./app/components/Login/Login.component";
import MenuComponent from "./app/components/Menu/Menu.component";

// export default class Main extends React.Component<any, any>{
//     render() {
//         return (
//             <Routes>
//                 <Route path={''} element={<LoginComponent/>} />
//                 <Route path={'menu'} element={<MenuComponent/>}/>
//                 <Route path={'administration'} element={<AdministrationComponent/>}/>
//             </Routes>
//         )
//     }
// }

export default function Main(){
    return (
        <Routes>
            <Route path={''} element={<LoginComponent/>} />
            <Route path={'menu'} element={<MenuComponent/>}/>
            {/*<Route path={'administration'} element={<AdministrationComponent/>}/>*/}
        </Routes>
    )
}