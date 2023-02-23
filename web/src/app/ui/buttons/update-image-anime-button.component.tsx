import * as React from "react";
import {ButtonProps, IconButton} from "@mui/material";
import animeServices from "../../sevices/anime.services";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {finalize} from "rxjs";
import {Tools} from "../../../tools";

interface UpdateImageAnimeButtonProps extends ButtonProps {
    row_id: string;
    url: string;
}

export default class UpdateImageAnimeButtonComponent extends React.Component<UpdateImageAnimeButtonProps,
    { image: string, open: boolean }> {

    constructor(props: UpdateImageAnimeButtonProps) {
        super(props);
        this.state = {image: '', open: false}
        this.handleClose = this.handleClose.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    data = new FormData()

    handleClose(){
        this.setState({open: false})
    }

    onChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        if (e.target.files) {
            const dt = {image: e.target.files[0]}
            const data = Tools.getFormData(dt)
            animeServices.update(this.props.row_id, data)
                .pipe(finalize(() => {
                    // eslint-disable-next-line no-restricted-globals
                    location.reload()
                })).subscribe(() => {
            })
        }
    }

    render() {
        return (
            <IconButton color="primary" aria-label="upload picture"
                // onClick={()=>this.setState({open: true})}
                        size={this.props.size} component={'label'}>
                <input hidden accept="image/*" type="file" onChange={this.onChange}/>
                <AddPhotoAlternateIcon/>
            </IconButton>

        );
    }
}