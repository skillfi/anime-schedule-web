import * as React from "react";
import AnimeServices, {Anime, AnimeResponse, AnimeTable} from "../../../sevices/anime.services";
import {Plus, DotsThreeOutlineVertical} from "phosphor-react";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RowComponent from "../../row/row.component";

import './manage-anime.component.scss'
import {Modal, TablePagination, Button} from "@mui/material";
import {ModalComponent} from "./modal/modal.component";
import AnimeService from "../../../sevices/anime.services";

function createData(
    anime: Anime
) {
    return anime
}





export default class ManageAnimeComponent extends React.Component<any, AnimeResponse>{

    constructor(props: any, private animeService: typeof AnimeServices, private anime: Anime) {
        super(props);
        this.getAnime = this.getAnime.bind(this)
        this.state = {data: [], open: false}
        this.handleChangePage = this.handleChangePage.bind(this)
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)

    }


    getAnime(){
        return AnimeServices.getAll().then((response)=> {
            this.setState({data: response.data.data})
            // response.data.data?.map((anime)=> {
            //     this.rows.push(anime)
            // })
            this.rows = response.data.data
            }
        )}

    rows = new Array(this.anime)

    componentDidMount() {
        return this.getAnime()
    }


    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<AnimeResponse>, snapshot?: any) {
        if (this.state.data !== prevState.data){
            // this.state.data.map((anime)=>{
            //
            //     // console.log(anime)
            //     this.rows.push(anime)
            // })
        }else {
            return this.getAnime()
        }
    }

     handleChangePage = (event: unknown, newPage: number) => {
        this.setState({page: newPage})
    };

     handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
         this.setState({page: 0, rowPerPage: +event.target.value})
    };

     handleOpen(){
         this.setState({open: true})
     }
     handleClose(){
         this.setState({open: false})
     }

     style = {
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

    render() {
        return (
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Id</TableCell>
                            <TableCell>Anime Name</TableCell>
                            <TableCell align="right">Rating</TableCell>
                            <TableCell align="right">Release</TableCell>
                            <TableCell align="right">
                                <Button onClick={this.handleOpen}><Plus/></Button>
                                <Modal
                                    open={this.state?.open}
                                    onClose={this.handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={this.style}>
                                        <ModalComponent/>
                                    </Box>
                                </Modal>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.data?.map((row) => (
                            <RowComponent key={row?.id} row={row} />
                        ))}
                    </TableBody>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={1}
                        rowsPerPage={5}
                        page={0}
                        onPageChange={this.handleChangePage}
                        onRowsPerPageChange={this.handleChangeRowsPerPage}
                    />
                </Table>
            </TableContainer>
    );
    }
}