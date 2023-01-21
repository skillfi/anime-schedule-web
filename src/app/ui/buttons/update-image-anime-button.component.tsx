import * as React from "react";
import {
    Button,
    ButtonProps, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    TextField
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CollectionsIcon from '@mui/icons-material/Collections';
import AnimeServices from "../../sevices/anime.services";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import {finalize} from "rxjs";

interface UpdateImageAnimeButtonProps extends ButtonProps{
    row_id: string;
    url: string;
}

export default class UpdateImageAnimeButtonComponent extends React.Component<UpdateImageAnimeButtonProps,
    {image: string, open: boolean}>{

    constructor(props: UpdateImageAnimeButtonProps) {
        super(props);
        this.state = {image: '', open: false}
        this.handleClose = this.handleClose.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    data = new FormData()

    handleAdd() {
        this.data.append('image', this.state.image)
        AnimeServices.update(this.props.row_id, this.data)
            .pipe(finalize(()=> {
                this.setState({open: false})
                // eslint-disable-next-line no-restricted-globals
                location.reload()
            }))
            .subscribe(()=>{})
    }

    handleClose(){
        this.setState({open: false})
    }

    onChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        switch (e.currentTarget.name) {
            case 'image': {
                this.setState({image: e.currentTarget.value})
                break;
            }
        }
        console.log(e.currentTarget.name)
    }

    render() {
        return (
            <React.Fragment>
                <IconButton color="primary" aria-label="Update"
                            onClick={()=>this.setState({open: true})}
                            size={this.props.size}>
                    <CollectionsIcon />
                </IconButton>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>Generate</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Edit Image <code>Anime</code> from url
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="image"
                            label="Image Url"
                            type="url"
                            fullWidth
                            variant="standard"
                            name={"image"}
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