import * as React from "react";
import {IconButton, Sheet, Typography} from "@mui/joy";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import GoogleIcon from "@mui/icons-material/Google";
import {GoogleLogin} from "@react-oauth/google";
import loginService from "../../sevices/login.service";
import sessionService from "../../sevices/session.service";
import {finalize} from "rxjs";
import {useNavigate} from "react-router-dom";

export default function GoogleSuccessComponent() {
    const navigate = useNavigate();

    function getMe() {
        loginService.me()
            .pipe(finalize(()=>navigate('/anime-list/search')))
            .subscribe((response) => {
                sessionService.setCurrentUser(response.data.data.user)
                sessionService.setToken(response.data.data.auth_token)
            })
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
            <IconButton onClick={getMe}>
                <GoogleIcon/>
            </IconButton>
        </Sheet>
    )
}