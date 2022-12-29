import * as React from "react";
import InputFieldComponent from "./InputField.component";
import './Login.scss'
import {settings} from "../../../environments/environment";

interface LProps {
    formData?: FormData;
}
export default class LoginComponent extends React.Component<LProps, {}>{

    componentDidMount() {
        document.title = settings.title + " Login"
    }


    render() {

        return (
            <div className={"login"}>
                <InputFieldComponent />
            </div>
        )
    }
}
