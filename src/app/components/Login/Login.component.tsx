import * as React from "react";
import LoginFormComponent from "./Login-Form.component";
import './Login.scss'
import {settings} from "../../../environments/environment";
import ModeToggle from "../../ui/modetoggle/mode-toggle.component";
import {CssVarsProvider} from "@mui/joy/styles";
import {Sheet} from "@mui/joy";

interface LProps {
    formData?: FormData;
}
export default class LoginComponent extends React.Component<LProps, {}>{

    componentDidMount() {
        document.title = settings.title + " Login"
    }


    render() {

        return (
            <CssVarsProvider>
                <ModeToggle/>
                <LoginFormComponent />
            </CssVarsProvider>
        )
    }
}
