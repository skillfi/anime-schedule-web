import * as React from "react";
import {ButtonProps, IconButton} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AnimeServices from "../../sevices/anime.services";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import {finalize} from "rxjs";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import {Tools} from "../../../tools";
import {IAnime} from "../../types/types";

interface RefreshButtonProps extends ButtonProps{
    row_id: string;
    url: string;
}

export default class RefreshAnimeButtonComponent extends React.Component<RefreshButtonProps, {visible: boolean, row: any}>{

    constructor(props: RefreshButtonProps) {
        super(props);
        this.onClick = this.onClick.bind(this)
        this.state = {visible: false, row: {}}
    }

    data = new FormData()

    onClick(){
        const data = {url: this.props.url, upload_link: ''}
        const formData = Tools.getFormData(data)
        this.setState({visible: true})
        AnimeServices.generateAnime(formData)
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
                <Backdrop open={this.state.visible} sx={{ color: '#32fd00', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <CircularProgress/>
                </Backdrop>
            </React.Fragment>

        );
    }
}