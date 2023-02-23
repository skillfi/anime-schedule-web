import * as React from "react";
import {AlertColor, ButtonProps, IconButton} from "@mui/material";
import AnimeServices from "../../sevices/anime.services";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import {finalize} from "rxjs";
import CustomAlert from "../alert/CustomAlert";

interface DeleteAnimeProps extends ButtonProps {
    row_id: string;
}

export default class DeleteAnimeButtonComponent extends React.Component<DeleteAnimeProps,
    { open: boolean, message: string, severity: AlertColor }> {

    data = new FormData()

    constructor(props: DeleteAnimeProps) {
        super(props);
        this.state = {open: false, message: '', severity: 'info'}
        this.handleClose = this.handleClose.bind(this)
        this.Delete = this.Delete.bind(this)
    }

    Delete() {
        AnimeServices.remove(this.props.row_id)
            .subscribe((response) => {
                switch (response.status){
                    case 200: {
                        this.setState({open: true, message: response.statusText, severity: 'success'})
                        // eslint-disable-next-line no-restricted-globals
                        location.reload()
                        break;
                    }
                    case 400: {
                        this.setState({open: true, message: response.statusText, severity: 'error'})
                        break;
                    }
                }
            })
    }

    handleClose() {
        this.setState({open: false})
    }

    render() {
        return (
            <React.Fragment>
                <IconButton color="primary" aria-label="Update"
                            onClick={this.Delete}
                            size={this.props.size}>
                    <DeleteSweepIcon/>
                </IconButton>
                <CustomAlert message={this.state.message} open={this.state.open}
                             severity={this.state.severity} onClose={()=>this.setState({open: false})}/>
            </React.Fragment>

        );
    }
}