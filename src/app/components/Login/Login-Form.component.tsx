import * as React from "react";
import {useState} from "react";
import {At, Key} from 'phosphor-react'
import {Box, BoxProps, Button, TextField} from '@mui/material';
import loginService from "../../sevices/login.service";
import {useNavigate} from "react-router-dom";
import sessionService from "../../sevices/session.service";
import {Simulate} from "react-dom/test-utils";
import AnimeServices from "../../sevices/anime.services";
import {finalize} from "rxjs";
import {BookmarkRow} from "../Menu/Menu-Body.component";

interface IProps extends BoxProps{
    submit?: any;
}

interface IState {
    email: string;
    password: string;
}

const LoginFormComponent: React.FC<IProps> = ({submit}) => {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const formData = new FormData()
    let book = new Array<BookmarkRow>();
    const [BookMarks, setBookmark] = useState<Array<BookmarkRow>>(book);

    /**
     * Функція відправлення вхідних даних на сервер
     * @api: /api/login
     * @param event React.MouseEvent<HTMLButtonElement>
     */
    function submitForm(event: React.MouseEvent<HTMLButtonElement>) {

        // Preventing the page from reloading
        event.preventDefault();
        formData.append('email', email)
        formData.append('password', password)
        // console.log(formData.values())

        // Do something
        loginService.logIn(formData).subscribe((response) => {
            // console.log(response)
            sessionService.setCurrentUser(response.data.data.user)
            sessionService.setToken(response.data.data.auth_token)
        }, (error) => {
            alert(error)
        }, () => {
            navigate('/menu')
            return AnimeServices.getAll()
                .pipe(finalize(()=> setBookmark(book)))
                .subscribe((response) => {
                    // @ts-ignore
                    book['All'] = response.data.data
                }, ((e) => alert(e)), (() => setBookmark(book)))
        })
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
        // console.log(e.currentTarget.name)

    };

    return (
        <Box sx={{ '& > :not(style)': { m: 2 }, alignItems: 'center'}}>
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

export default LoginFormComponent;