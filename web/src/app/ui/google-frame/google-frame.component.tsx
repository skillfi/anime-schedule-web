import * as React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import {IconButton} from "@mui/joy";
import loginService from "../../sevices/login.service";
import {finalize} from "rxjs";
import {useNavigate} from "react-router-dom";
import {createPortal} from "react-dom";

export default function GoogleFrameComponent(props: {src: string, children: React.ReactNode}){
    const {src, children} = props
    const navigate = useNavigate()
    const frame = window.open(src)?.frameElement


    return (
        null
    )
}