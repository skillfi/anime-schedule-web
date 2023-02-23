import * as React from "react";
import {ButtonProps, IconButton} from "@mui/material";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AnimeServices from "../../sevices/anime.services";
import {finalize} from "rxjs";
import {useNavigate} from "react-router-dom";

interface NewProps extends ButtonProps{
    row_id: string;
    object: any;
}

export default function OpenAnimePageButtonComponent(props: NewProps) {
    const navigate = useNavigate();
    const {row_id, object} = props
    function onClick() {
        navigate(`/anime/${row_id}`)
    }

    return (
        <IconButton color="primary" aria-label="Update"
                    onClick={()=>onClick()}
                    size={'small'}>
            <OpenInNewIcon />
        </IconButton>
    )
}