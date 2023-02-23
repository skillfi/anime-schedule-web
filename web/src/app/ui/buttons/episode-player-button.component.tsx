import * as React from "react";
import {ButtonProps, IconButton, Modal} from "@mui/material";
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import {finalize} from "rxjs";
import AnimeServices from "../../sevices/anime.services";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface PlayerProps extends ButtonProps {
    episode_id: string
}

interface PlayerState {
    url: string,
    open: boolean,
    visible: boolean
}

export default class EpisodePlayerButtonComponent extends React.Component<PlayerProps, PlayerState> {

    data = new FormData()

    constructor(props: PlayerProps) {
        super(props);
        this.state = {url: '', open: false, visible: false}
        this.handleClose = this.handleClose.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    handleAdd() {
        this.data.append('url', this.state.url)
        this.setState({visible: true})
        AnimeServices.uploadEpisode(this.props.episode_id)
            .pipe(finalize(() => {
                this.setState({visible: false})
            }))
            .subscribe((response) => {
                this.setState({url: response.data.data.iframe, open: true, visible: true})
            })
    }

    handleClose() {
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
                <IconButton onClick={() => this.handleAdd()}>
                    <SmartDisplayIcon/>
                </IconButton>
                <Modal open={this.state.open} sx={{width: 500, height: 500, py: 10, px: 'center'}} onClose={()=>this.setState({open: false})}>
                    <iframe src={this.state.url} width={500} height={500} frameBorder={'0'} allowFullScreen></iframe>
                </Modal>
                <Backdrop open={this.state.visible} sx={{color: '#32fd00', zIndex: (theme) => theme.zIndex.drawer + 1}}>
                    <CircularProgress/>
                </Backdrop>
            </React.Fragment>

        );
    }
}