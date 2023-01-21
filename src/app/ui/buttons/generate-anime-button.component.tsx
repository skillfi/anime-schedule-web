import * as React from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {
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

export default class GenerateAnimeButtonComponent extends React.Component<ButtonProps, {url: string, open: boolean}>{

    constructor(props: ButtonProps) {
        super(props);
        this.state = {url: '', open: false}
        this.handleClose = this.handleClose.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    data = new FormData()
    handleAdd() {
        this.data.append('url', this.state.url)
        AnimeServices.generateAnime(this.data)
            .pipe(finalize(()=>this.setState({open: false})))
            .subscribe(()=>{})
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
                <IconButton color="primary" aria-label="Generate Anime"
                            onClick={()=>this.setState({open: true})} sx={this.props.sx}
                size={this.props.size}>
                    <AddBoxIcon />
                </IconButton>
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
            </React.Fragment>

        );
    }
}