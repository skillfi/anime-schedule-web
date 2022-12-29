import * as React from "react";
import {Atom} from "phosphor-react";

export default class LogoComponent extends React.Component<any, any>{

    render() {
        return (
            <h2 style={{alignContent: "center"}}>
                <Atom size={60}/>
                <span>AniSche</span>
            </h2>
        );
    }
}