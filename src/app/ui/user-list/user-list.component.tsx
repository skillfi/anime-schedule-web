import * as React from "react";
import {useEffect, useState} from "react";
import {Paper, Table, TableBodyProps, TableContainer, TablePagination} from "@mui/material";
import TableHeadComponent from "./table-head/table-head.component";
import TableBodyComponent from "./table-body/table-body.component";
import {IAnime} from "../../types/types";
import TableRowBodyComponent from "./table-row/table-row-body.component";
import TableCellBodyComponent from "./table-cell/table-cell-body.component";
import {BookmarkRow} from "../../components/Menu/Menu-Body.component";
import UserListService from "../../sevices/user_list.services";
import {finalize} from "rxjs";
import animeServices from "../../sevices/anime.services";

/** User List Props
 * @property {string} list_name - `User List Name`
 * @property {Array<IAnime>} rows - `Anime List` from response
 * @property {Array<string>} columns - `Table Head Cells`
 */
interface UserListProps extends TableBodyProps{
    /** User List Name
     * @default Favorites
     */
    list_name: string;
    /** Anime List from response
     * @default BookmarkRow[]
     */
    rows: BookmarkRow[];
    columns: string[];
    lists: string[]

}

/** Table To View Information about Anime
 *
 * @param props - `UserListProps`
 * @type {UserListProps}
 * @constructor
 */
export default function UserListComponent(props: UserListProps) {
    const [anime, setAnime] = useState<IAnime[]>([])
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const data: IAnime = {id: '0', full_name: 'Demonstration', episodes: 12, time: 25, subscribe: false,
        country: 'Japan', quality: 1080, rating: 5, image: 'Demo', name: 'Demo', release_date: ''}
    const Adata: IAnime[] = [data, data, data, data]
    // @ts-ignore
    return (
        <Paper>
            <TableContainer>
                <Table sx={{minWidth: 250}} aria-label={"simple table"}>
                    <TableHeadComponent columns={props.columns}/>
                    <TableBodyComponent rows={// @ts-ignore
                        props.rows[props.list_name]} page={page} rowsPerPage={rowsPerPage} renderRows={
                        (row: IAnime) => (<TableRowBodyComponent columns={props.columns} renderCells={
                            (cell: string, index) => (
                                <TableCellBodyComponent cell={row} cellName={cell.toLowerCase()} align={'center'}
                                                        id={index.toString()} list_name={props.list_name} cells={anime}
                                                        key={cell} all_lists={props.lists}/>)
                        } key={row.id}/>)}
                                        list_name={props.list_name}/>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                // @ts-ignore
                count={!props.rows[props.list_name] ? 1: props.rows[props.list_name].length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>

    )
}