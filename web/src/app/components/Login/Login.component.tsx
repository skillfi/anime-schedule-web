import * as React from "react";
import LoginFormComponent from "./Login-Form.component";
import ModeToggle from "../../ui/modetoggle/mode-toggle.component";
import {CssVarsProvider} from "@mui/joy/styles";
import loginService from "../../sevices/login.service";
import {useNavigate} from "react-router-dom";

interface LProps {
    formData?: FormData;
}

export default function LoginComponent(props: LProps) {
    const navigate = useNavigate();

    if (loginService.isLoggedIn()) {
        navigate('/menu')
    }

    return (
        <CssVarsProvider>
            <ModeToggle/>
            <LoginFormComponent/>
        </CssVarsProvider>
    )

}
