import * as React from "react";
import {At, Key, Atom} from 'phosphor-react'
import AnMagicButtonComponent from "../../ui/an-buttons/an-magic-button/AnMagicButton.component";
import LogoComponent from "../Logo/logo.component";

interface IProps {
    submit?: any;
}

export default class InputFieldComponent extends React.Component<IProps, any>{
    private Form: React.RefObject<HTMLInputElement>;

    public formData = new FormData()
    constructor(props: IProps) {
        super(props);
        this.Form = React.createRef();
        this.state = {user: ''}
        this.onChange = this.onChange.bind(this)
    }

    onChange = (e: React.FormEvent<HTMLInputElement>): void => {
        e.preventDefault()
        // console.log(e.currentTarget.name)
        this.formData.append(e.currentTarget.name, e.currentTarget.value)
    };

    render() {
        return (
            <form className={"form"} noValidate={true} autoComplete={'off'}>
                <LogoComponent/>
                <div className={'form-field'}>
                    <label htmlFor={"login-mail"}>
                        <At/>
                    </label>
                    <input id={"login-mail"} placeholder={"E-Mail"} type={'text'}
                           pattern={'[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'} required={true}
                            name={'email'} onChange={this.onChange}/>
                </div>
                <div className={'form-field'}>
                    <label htmlFor={"login-password"}>
                        <Key/>
                    </label>
                    <input id={'login-password'} type={"password"} placeholder={"Password"}
                    pattern={".{4,}"} required={true} name={'password'} onChange={this.onChange}/>
                </div>
                <div className={'submit-wrap'}>
                    <AnMagicButtonComponent text={'Sign In'} style={{width: '100%', cursor: "pointer"}}
                    formData={this.formData}/>
                </div>
            </form>
        )
    }
}
