import * as React from "react";
import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import {ALState} from "../../types/types";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import animeServices from "../../sevices/anime.services";
import loginService from "../../sevices/login.service";
import {finalize} from "rxjs";



export default class ModalGenerateAnimeComponent extends React.Component<ALState, {url: string, open: boolean}>{
    public formData = new FormData();
    constructor(props: ALState) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.state = {url: '', open: this.props.open}
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>){
        this.setState({url: event.target.value})
    }

    handleClick(event: React.MouseEvent<HTMLButtonElement>){
        event.preventDefault()
        this.formData.append('url', this.state?.url)
        animeServices.generateAnime(this.formData).subscribe((response)=>{
            switch (response.status){
                case 200: {
                    this.setState({open: false});
                    alert(response.statusText);
                    break;
                }
                case 401: {
                    loginService.logOut().pipe(finalize(()=>{
                        document.location.reload()
                    }));
                    break;
                }
            }
        })
    }

    render() {
        return (
            <Modal
                open={this.state.open}
                onClose={()=>{
                }
                }
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={this.props.style}>
                    <CloudDownloadIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" label="Link" variant="standard"
                               value={this.state?.url} onChange={this.handleChange}/>
                    <Button variant={'contained'} onClick={this.handleClick}>Submit</Button>
                </Box>
            </Modal>
        );
    }
}