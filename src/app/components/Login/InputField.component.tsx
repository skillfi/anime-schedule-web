import * as React from "react";
import {At, Key} from 'phosphor-react'
import {Box, TextField, Button} from '@mui/material';
import LogoComponent from "../Logo/logo.component";
import LoginService from "../../sevices/login.service";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {ILogin} from "../../types/types";
import sessionService from "../../sevices/session.service";
import loginService from "../../sevices/login.service";

interface IProps {
    submit?: any;
}

interface IState{
    email: string;
    password: string;
}

const InputFields: React.FC<IProps> = ({submit}) => {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const formData = new FormData()

    function submitForm(event: React.MouseEvent<HTMLButtonElement>){

        // Preventing the page from reloading
        event.preventDefault();
        formData.append('email', email)
        formData.append('password', password)
        console.log(formData)

        // Do something
        try {
            loginService.logIn(formData).then((value)=>{
                sessionService.setCurrentUser(value?.data.user)
                sessionService.setToken(value?.data.auth_token)
            })
            navigate('/menu')
        } catch (e){
            alert(e)
        }
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {

        e.preventDefault()
        switch (e.currentTarget.name){
            case 'email': {
                setEmail(e.currentTarget.value)
                break;
            }
            case 'password': {
                setPassword( e.currentTarget.value)
                break;
            }
        }
        console.log(e.currentTarget.name)

    };

    return (
        <Box sx={{ '& > :not(style)': { m: 2 }, alignItems: 'center'}}>
            <LogoComponent/>
            <Box sx={{ display: 'flex', alignItems: 'center', alignContent: 'center'}}>
                <At size={40}/>
                <TextField id="input-with-sx" label="E-Mail" variant="standard" name={'email'}
                           onChange={onChange} inputProps={{pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'}}/>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', alignContent: 'center'}}>
                <Key size={40}/>
                <TextField id="input-with-sx" label="Password" type={'password'} variant="standard" name={'password'}
                           onChange={onChange} inputProps={{pattern: '.{4,}'}}/>
            </Box>
            <Button variant="outlined" onClick={submitForm}>Log In</Button>
        </Box>
    )

}

export default InputFields;