import * as React from "react";
import'./an-magic-button.module.scss'
import {CSSProperties} from "react";
import {loginResponse, User} from "../../../models/form-data.model";
import LoginService from "../../../sevices/login.service";
import SessionService from "../../../sevices/session.service";
import {Navigate} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {settings} from "../../../../environments/environment";

export let response: loginResponse = {
}

interface BProps {
    text?: string;
    style?: CSSProperties;
    className?: string
    formData: FormData;
    response?: loginResponse;
    submit?: any;
    navigate?: any;
}

interface State {
    response?: loginResponse;
}

export default class AnMagicButtonComponent extends React.Component<BProps, State>{

    constructor(
        props: BProps,
        private loginService: typeof LoginService,
        private sessionService: typeof SessionService
    ) {
        super(props);
        this.state = {response: {}}
        this.submitForm = this.submitForm.bind(this)
    }

    submitForm = (event: React.MouseEvent<HTMLButtonElement>) => {
        // Preventing the page from reloading
        event.preventDefault();
        console.log(this.props.formData)

        // Do something
        LoginService.login(this.props.formData).then((res)=>{
            console.log(res.data.data)
            SessionService.setCurrentUser(res.data.data?.user)
            SessionService.setToken(res.data.data?.user)
            return document.location.replace('/menu')
        }).catch((e: Error)=> {
            console.log(e)
        })
    }


    render() {
        return (
            <button className={this.props.className} style={this.props.style}
                    onClick={this.submitForm}>
                {this.props.text}

            </button>
        );
    }
}