import * as React from "react";
import {useState} from "react";
import {AlertColor, BoxProps} from '@mui/material';
import loginService from "../../sevices/login.service";
import {useNavigate} from "react-router-dom";
import sessionService from "../../sevices/session.service";
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {Button, FormControl, FormLabel, Input, Sheet, Typography} from '@mui/joy';
import PasswordIcon from "@mui/icons-material/Password";
import EmailIcon from '@mui/icons-material/Email';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import {Tools} from "../../../tools";
import { finalize } from "rxjs";


interface IProps extends BoxProps {
    submit?: any;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LoginFormComponent: React.FC<IProps> = ({submit}) => {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState<boolean>(false)
    const [severity, setSeverity] = useState<AlertColor>('info')
    const formData = new FormData()

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
        loginService.logIn(formData)
            .pipe(finalize(() => {
                setSeverity('success')
                setOpen(true)
                navigate('/menu')
            }))
            .subscribe((response) => {
                // console.log(response)
                sessionService.setCurrentUser(response.data.data.user)
                sessionService.setToken(response.data.data.auth_token)
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
                setPassword(e.currentTarget.value)
                break;
            }
        }
        // console.log(e.currentTarget.name)

    }
    return (
        <Sheet
            sx={{
                width: 250,
                my: 10,
                mx: 'auto',
                py: 3, // padding top & bottom
                px: 2, // padding left & right
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRadius: 'sm',
                boxShadow: 'md',
            }}
            variant="outlined"
        >
            <div style={{alignContent: 'center'}}>
                <Typography level="h4" component="h1">
                    <LocalActivityIcon/> <b>AnisChe</b>
                </Typography>
                <Typography level="body2">Sign in to continue.</Typography>
            </div>
            <FormControl sx={{maxWidth: Tools.getWindowDimension().minWidth}}>
                <FormLabel>Email</FormLabel>
                <Input
                    // html input attribute
                    name="email"
                    type="email"
                    placeholder="johndoe@email.com"
                    onChange={onChange}
                    startDecorator={<EmailIcon/>}
                />
            </FormControl>
            <FormControl sx={{maxWidth: Tools.getWindowDimension().minWidth}}>
                <FormLabel>Password</FormLabel>
                <Input
                    // html input attribute
                    name="password"
                    type="password"
                    placeholder="password"
                    onChange={onChange}
                    startDecorator={<PasswordIcon/>}
                />
            </FormControl>
            <Button variant="outlined" onClick={submitForm}>Log In</Button>
        </Sheet>
    )

}

export default LoginFormComponent;