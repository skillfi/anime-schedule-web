import * as React from "react";
import NavBarComponent from "../../../ui/navbar/navbar.component";
import {useParams} from "react-router-dom";
import AnimeComponent from "./anime.component";

export default function AnimePageComponent() {
    const params = useParams();
    const id = params.id;

    return (
        <React.Fragment>
            <NavBarComponent/>
            <AnimeComponent _id={id} key={2}/>
        </React.Fragment>
    )
}