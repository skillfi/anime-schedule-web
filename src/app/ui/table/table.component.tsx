import * as React from "react";
import {HTMLProps, useState} from "react";
import animeServices  from "../../sevices/anime.services";
import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import {DataGrid, GridColDef, GridToolbar} from "@mui/x-data-grid";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import {finalize} from "rxjs";
import {Anime} from "../../types/types";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface AnimeDataProps<T> {
    rows: T[];
    columns: (row: T[]) => GridColDef[];

}

export default function TableComponent<T>(props: AnimeDataProps<T>) {
    const formData = new FormData();
    const [url, setUrl] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);

    function modalOpen() {
        setOpen(true)
    }

    function modalClose() {
        setOpen(false)
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUrl(event.target.value)
    }

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        formData.append('url', url)
        animeServices.generateAnime(formData).pipe(finalize(() => setOpen(false)))
    }

    return (
        <Box sx={{height: 'auto'}}>
            <Box display={"flex"} flexDirection={"row"}>
                <Typography sx={{fontFamily: 'Consolas', fontSize: 40}}>
                    Anime List
                    <Button variant={'contained'} sx={{m: 2}} onClick={modalOpen}>Generate</Button>
                    <Modal
                        open={open}
                        onClose={handleClick}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <CloudDownloadIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                            <TextField id="input-with-sx" label="Link" variant="standard"
                                       value={url} onChange={handleChange}/>
                            <Button variant={'contained'} onClick={handleClick}>Submit</Button>
                        </Box>
                    </Modal>
                </Typography>
            </Box>
            <DataGrid columns={props.columns(props.rows)} rows={props.rows}
                      pageSize={5} rowsPerPageOptions={[5, 10, 15, 25]} checkboxSelection={true}
                      disableSelectionOnClick={true}
                      components={{
                          Toolbar: GridToolbar
                      }}
                      autoHeight={true}
                      density={'compact'}
                      pagination={true}
                      autoPageSize={true}
                      style={{fontFamily: 'Consolas',  fontSize: 'smaller', alignContent: 'center', fontWeight: "bold",
                          width: '100%', color: 'black'}}
            />
        </Box>
    )
}

