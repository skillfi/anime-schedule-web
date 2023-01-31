import * as React from "react";
import {ButtonProps, IconButton} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AnimeServices from "../../sevices/anime.services";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import {finalize} from "rxjs";
import {ColorRing} from "react-loader-spinner";

interface RefreshButtonProps extends ButtonProps{
    row_id: string;
    url: string;
}

export default class RefreshAnimeButtonComponent extends React.Component<RefreshButtonProps, {visible: boolean}>{

    constructor(props: RefreshButtonProps) {
        super(props);
        this.onClick = this.onClick.bind(this)
        this.state = {visible: false}
    }

    data = new FormData()

    onClick(){
        this.data.append('url', this.props.url)
        this.setState({visible: true})
        AnimeServices.generateAnime(this.data)
            .pipe(finalize(()=> {
                this.setState({visible: false})
                // eslint-disable-next-line no-restricted-globals
                location.reload()
            }))
            .subscribe(()=>{})
    }

    render() {
        return (
            <React.Fragment>
                <IconButton color="primary" aria-label="Update"
                            onClick={()=>this.onClick()}
                            size={this.props.size}>
                    <AutorenewIcon />
                </IconButton>
                <ColorRing visible={this.state.visible} height={80} width={80} ariaLabel={"blocks-loading"}/>
            </React.Fragment>

        );
    }
}