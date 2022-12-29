import * as React from "react";
import ManageAnimeComponent from "./manage-anime/manage-anime.component";

export default class AdministrationComponent extends React.Component<any, any>{

    render() {
        return (
            <div>
                <ManageAnimeComponent/>
            </div>
        );
    }
}