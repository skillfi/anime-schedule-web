import * as React from "react";
import {ButtonProps, IconButton} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AnimeServices from "../../sevices/anime.services";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import {finalize} from "rxjs";

interface RefreshButtonProps extends ButtonProps{
    row_id: string;
    url: string;
}

export default class RefreshAnimeButtonComponent extends React.Component<RefreshButtonProps, any>{

    constructor(props: RefreshButtonProps) {
        super(props);
        this.onClick = this.onClick.bind(this)
    }

    data = new FormData()

    onClick(){
        this.data.append('url', this.props.url)
        AnimeServices.generateAnime(this.data)
            // eslint-disable-next-line no-restricted-globals
            .pipe(finalize(()=>location.reload()))
            .subscribe(()=>{})
    }

    render() {
        return (
            <IconButton color="primary" aria-label="Update"
                        onClick={()=>this.onClick()}
                        size={this.props.size}>
                <AutorenewIcon />
            </IconButton>
        );
    }
}