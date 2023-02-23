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
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {Tools} from "../../../tools";

interface GenerateButtonState{
    url: string;
    open: boolean;
    alert: boolean;
    severity: AlertColor;
    message: string;
    visible: boolean;
    upload_link: string;
}

export default class GenerateAnimeButtonComponent extends React.Component<ButtonProps, GenerateButtonState>{

    constructor(props: ButtonProps) {
        super(props);
        this.state = {url: '', open: false, alert: false, severity: 'success', message: '', visible: false, upload_link: ''}
        this.handleClose = this.handleClose.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    handleAdd() {
        const formData = Tools.getFormData({url: this.state.url, upload_link: this.state.upload_link})
        AnimeServices.generateAnime(formData)
            .pipe(finalize(()=> {
                this.setState({visible: false})
                // eslint-disable-next-line no-restricted-globals
                location.reload()
            }))
            .subscribe((response)=>{
                switch (response.status) {
                    case 200: {
                        this.setState({open: false, severity: 'success', alert: true, message: response.statusText, visible: true})
                        break;
                    }
                    case 400: {
                        this.setState({open: false, severity: 'error', alert: true, message: response.statusText, visible: true})
                        break;
                    }
                }
            })
    }

    handleClose(){
        this.setState({open: false})
    }

    data = {}

    onChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        switch (e.currentTarget.name) {
            case 'url': {
                this.setState({url: e.currentTarget.value})
                break;
            }
            case 'upload_link': {
                this.setState({upload_link: e.currentTarget.value})
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
                        /><TextField
                            autoFocus
                            margin="dense"
                            id="upload_link"
                            label="Upload Link For Get Episodes"
                            type="url"
                            fullWidth
                            variant="standard"
                            name={"upload_link"}
                            onChange={this.onChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>Close</Button>
                        <Button onClick={this.handleAdd}>Add</Button>
                    </DialogActions>
                </Dialog>
                <Backdrop open={this.state.visible} sx={{ color: '#32fd00', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <CircularProgress/>
                </Backdrop>
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