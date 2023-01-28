import * as React from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {
    AlertColor,
    Button, ButtonProps, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    TextField
} from "@mui/material";
import UserListService from "../../sevices/user_list.services";
import {finalize} from "rxjs";
import AnimeServices from "../../sevices/anime.services";
import CustomAlert from "../alert/CustomAlert";

export default class GenerateAnimeButtonComponent extends React.Component<ButtonProps, {url: string,
    open: boolean, alert: boolean, severity: AlertColor, message: string}>{

    constructor(props: ButtonProps) {
        super(props);
        this.state = {url: '', open: false, alert: false, severity: 'success', message: ''}
        this.handleClose = this.handleClose.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    data = new FormData()
    handleAdd() {
        this.data.append('url', this.state.url)
        AnimeServices.generateAnime(this.data)
            .subscribe((response)=>{
                switch (response.status) {
                    case 200: {
                        this.setState({open: false, severity: 'success', alert: true, message: response.statusText})
                        break;
                    }
                    case 400: {
                        this.setState({open: false, severity: 'error', alert: true, message: response.statusText})
                        break;
                    }
                }
            })
    }

    handleClose(){
        this.setState({open: false})
    }

    onChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        switch (e.currentTarget.name) {
            case 'url': {
                this.setState({url: e.currentTarget.value})
                break;
            }
        }
        console.log(e.currentTarget.name)
    }

    render() {
        return (
            <React.Fragment>
                <Button color="primary" aria-label="Generate Anime"
                            onClick={()=>this.setState({open: true})} sx={this.props.sx}
                size={this.props.size} startIcon={<AddBoxIcon/>}>
                    Add New
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>Generate</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Add new <code>Anime</code> from url
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="url"
                            label="Anime Url"
                            type="url"
                            fullWidth
                            variant="standard"
                            name={"url"}
                            onChange={this.onChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>Close</Button>
                        <Button onClick={this.handleAdd}>Add</Button>
                    </DialogActions>
                </Dialog>
                <CustomAlert message={this.state.message} open={this.state.alert} severity={this.state.severity}
                onClick={()=> {
                    // eslint-disable-next-line no-restricted-globals
                    location.reload()
                    this.setState({alert: false})
                }}/>
            </React.Fragment>

        );
    }
}