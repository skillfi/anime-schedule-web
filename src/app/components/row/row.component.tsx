import * as React from "react";
import AnimeService, {Anime} from "../../sevices/anime.services";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {Button} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";

function createData(
    anime: Anime
) {
    return anime
}
export interface RowProps{
    row: ReturnType<typeof createData>;
}

export interface RowState{
    open: boolean
    row?: ReturnType<typeof createData> | null;
}
export default class RowComponent extends React.Component<RowProps, RowState>{

    constructor(props: RowProps) {
        super(props);
        this.removeAnime = this.removeAnime.bind(this)
        this.state = {open: false}
    }

    removeAnime(e: React.FormEvent<MouseEvent>, anime_id: number){
        e.preventDefault()
        AnimeService.remove(anime_id).then((res)=>{
            // console.log(res.data.data)
            // SessionService.setCurrentUser(res.data.data?.user)
            // SessionService.setToken(res.data.data?.user)
            // return document.location.replace('/menu')
        }).catch((e: Error)=> {
            console.log(e)
        })
    }

    componentDidUpdate(prevProps: Readonly<RowProps>, prevState: Readonly<RowState>, snapshot?: any) {

    }

    render() {
        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => this.setState({open: false})}
                        >
                            {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {this.props.row?.id}
                    </TableCell>
                    <TableCell align="right">{this.props.row?.name}</TableCell>
                    <TableCell align="right">{this.props.row?.rating}</TableCell>
                    <TableCell align="right">{this.props.row?.release_date}</TableCell>
                    <TableCell align="right">
                        <Button onClick={(event)=>{
                            AnimeService.remove(this.props.row?.id).then((res)=>{
                                this.setState({row: null})
                            }).catch((e: Error)=> {
                                console.log(e)
                            })
                        }
                        }>
                            <DeleteIcon/>
                        </Button>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Genre
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.props.row?.genres?.map((genre) => (
                                            <TableRow key={genre?.id}>
                                                <TableCell component="th" scope="row">
                                                    {genre?.name}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }
}