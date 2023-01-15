import * as React from "react";
import {IconButton} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import animeServices from "../../sevices/anime.services";
import {useEffect, useState} from "react";
import {finalize} from "rxjs";

interface SubscribeProps{
    value: boolean;
    row_id: string;
}
export default function SubscribeComponent(props: SubscribeProps){
    const [sub, setSubscribe] = useState<boolean>(false)
    const buttonElement = React.useRef<HTMLButtonElement | null>(null);

    function subscribe(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        let data = new FormData()
        data.append('anime_id', props.row_id)
        animeServices.subscribe(data)
            .subscribe(() => {}, ((e)=>alert(e)), (()=>setSubscribe(false)))
    }

    function unsubscribe(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        animeServices.unsubscribe(props.row_id)
            .subscribe(() => {}, ((e)=>alert(e)), (()=>setSubscribe(false)))
    }

    useEffect(() => {
        animeServices.getById(props.row_id).subscribe((response) => {
            setSubscribe(response.data.data.subscribe)
        })
    }, [props.row_id, sub])

    return (
        <strong defaultValue={props.row_id}>
            {!sub ? <IconButton onClick={subscribe}
                                ref={buttonElement}
                                defaultValue={props.row_id}
                                color={'secondary'}><AddIcon/></IconButton>: <IconButton defaultValue={props.row_id}
                               ref={buttonElement}
                               onClick={unsubscribe}
                               color={"secondary"}><RemoveIcon/></IconButton>}
        </strong>
    )
}