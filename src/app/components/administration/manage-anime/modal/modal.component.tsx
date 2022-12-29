import * as React from "react";
import './modal.component.scss'
import {TextField, Box} from '@mui/material';
import AnimeService, {Anime} from "../../../../sevices/anime.services";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';

export interface ModalState{
    active?: boolean;
    loading: boolean

}
export class ModalComponent extends React.Component<any, Anime>{
    public formData = new FormData()
    constructor(props: any) {
        super(props);
        this.state = {release_date: '', loading: false, id: 0}
        this.onChange = this.onChange.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault()
        // console.log(e.currentTarget.name)
        this.formData.append(e.currentTarget.name, e.currentTarget.value)
    };

    onChangeDate = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault()
        // console.log(e.currentTarget.name)
        this.formData.append(e.currentTarget.name, e.currentTarget.value)
    }

    submitForm = (event: React.MouseEvent<HTMLButtonElement>) => {
        // Preventing the page from reloading
        event.preventDefault();
        // console.log(this.props.formData)

        // Do something
        AnimeService.create(this.formData).then((res)=>{
            console.log(res.data.data)
            this.setState({loading: true})
            // SessionService.setCurrentUser(res.data.data?.user)
            // SessionService.setToken(res.data.data?.user)
            // return document.location.replace('/menu')
        }).catch((e: Error)=> {
            console.log(e)
        })
    }

    render() {
        return (
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 2, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div style={{display: "flex", flexDirection: "row"}}>
                    <TextField
                        id="outlined-name"
                        label="Name"
                        name={'name'}
                        value={this.state.name}
                        onChange={this.onChange}
                    />
                    <TextField
                        id="input-with-sx"
                        variant={'standard'}
                        label="Rating"
                        name={'rating'}
                        value={this.state.name}
                        onChange={this.onChange}
                    />
                </div>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Release Date"
                            value={this.state.date}
                            onChange={(date, keyboardInputValue) => {
                                this.setState({date: date?.toLocaleString()})
                                console.log(date?.toString())
                            }}
                            renderInput={(params) => <TextField {...params} name={'release_date'}/>}
                        />
                    </LocalizationProvider>
                    <TextField
                        id="input-with-sx"
                        variant={'standard'}
                        label="Country"
                        name={'country'}
                        value={this.state.name}
                        onChange={this.onChange}
                    />
                </div>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <TextField
                        id="input-with-sx"
                        variant={'standard'}
                        label="Quality"
                        name={'quality'}
                        value={this.state.name}
                        onChange={this.onChange}
                    />
                    <TextField
                        id="input-with-sx"
                        variant={'standard'}
                        label="Time"
                        name={'time'}
                        value={this.state.name}
                        onChange={this.onChange}
                    />
                </div>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <TextField
                        id="input-with-sx"
                        variant={'standard'}
                        label="URL"
                        name={'url'}
                        value={this.state.name}
                        onChange={this.onChange}
                    />
                    <LoadingButton
                        size="small"
                        onClick={this.submitForm}
                        endIcon={<SendIcon />}
                        loading={this.state.loading}
                        loadingPosition="end"
                        variant="contained"
                    >
                        Send
                    </LoadingButton>
                </div>
            </Box>
        );
    }
}