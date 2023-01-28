import * as React from "react";
import {Paper, Table, TableBodyProps, TableContainer, TablePagination} from "@mui/material";
import TableHeadComponent from "./table-head/table-head.component";
import TableBodyComponent from "./table-body/table-body.component";
import {Episode, IAnime} from "../../types/types";
import TableRowBodyComponent from "./table-row/table-row-body.component";
import TableCellEpisodesComponent from "./table-cell/table-cell-episodes.component";
import {Episodes} from "../../components/anime-list/anime-list.component";

/** User List Props
 * @property {string} list_name - `User List Name`
 * @property {Array<IAnime>} [rows] - `Anime List` from response
 * @property {Array<string>} columns - `Table Head Cells`
 */
interface UserListProps extends TableBodyProps {
    rows: Episode[];
    columns: any[];
    lists?: string[]
    episodes?: Episodes[]

}

/** Table Class Component
 * @property {UserListProps} props - `Table Props`
 */
export default class TableEpisodeComponent extends React.Component<UserListProps,
    { page: number, rowsPerPage: number, book: IAnime[], lists: string[], anime: IAnime[], open: boolean }> {
    lists: string[] = []
    book: IAnime[] = []
    anime: IAnime[] = []
    public rows = []

    constructor(props: UserListProps) {
        super(props);
        this.state = {page: 0, rowsPerPage: 5, book: [], anime: [], lists: [], open: false}
        this.handleChangePage = this.handleChangePage.bind(this)
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
    }

    handleChangePage(event: unknown, newPage: number) {
        this.setState({page: newPage});
    }

    handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({rowsPerPage: parseInt(event.target.value, 10)})
        this.setState({page: 0});
    }

    componentWillUnmount() {
        this.setState({page: 0, rowsPerPage: 5, book: [], anime: [], lists: [], open: false})
    }

    render() {
        return (
            <Paper>
                <TableContainer>
                    <Table sx={this.props.sx} aria-label={"simple table"} size={"small"}>
                        <TableHeadComponent columns={this.props.columns}/>
                        <TableBodyComponent rows={this.props.rows}
                                            page={this.state.page}
                                            rowsPerPage={this.state.rowsPerPage}
                                            renderRows={(row: Episode, index) => (
                                                <TableRowBodyComponent columns={this.props.columns} renderCells={
                                                    (cell: string, index) =>
                                                        <TableCellEpisodesComponent cell={row} cellName={cell.toLowerCase()}
                                                                                    align={"center"} list_name={''}
                                                                                    key={index}/>
                                                } key={index}/>
                                            )}
                                            list_name={'Favorites'}/>

                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={typeof this.props.rows !== 'undefined' ? this.props.rows.length : 5}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onPageChange={this.handleChangePage}
                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }

}

// /** Table To View Information about Anime
//  *
//  * @param props - `UserListProps`
//  * @type {UserListProps}
//  * @constructor
//  */
// export function UserListComponent(props: UserListProps) {
//     const [anime, setAnime] = useState<IAnime[]>([])
//     const [rowsPerPage, setRowsPerPage] = React.useState(5);
//     const [page, setPage] = React.useState(0);
//
//     const handleChangePage = (event: unknown, newPage: number) => {
//         setPage(newPage);
//     };
//
//     const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };
//
//     const data: IAnime = {id: '0', full_name: 'Demonstration', episodes: 12, time: 25, subscribe: false,
//         country: 'Japan', quality: 1080, rating: 5, image: 'Demo', name: 'Demo', release_date: ''}
//     const Adata: IAnime[] = [data, data, data, data]
//     // @ts-ignore
//     return (
//         <Paper>
//             <TableContainer>
//                 <Table sx={{minWidth: 250}} aria-label={"simple table"}>
//                     <TableHeadComponent columns={props.columns}/>
//                     <TableBodyComponent rows={// @ts-ignore
//                         props.rows[props.list_name]} page={page} rowsPerPage={rowsPerPage} renderRows={
//                         (row: IAnime) => (<TableRowBodyComponent columns={props.columns} renderCells={
//                             (cell: string, index) => (
//                                 <TableCellEpisodesComponent cell={row} cellName={cell.toLowerCase()} align={'center'}
//                                                         id={index.toString()} list_name={props.list_name} cells={anime}
//                                                         key={cell} all_lists={props.lists}/>)
//                         } key={row.id}/>)}
//                                         list_name={props.list_name}/>
//                 </Table>
//             </TableContainer>
//             <TablePagination
//                 rowsPerPageOptions={[5, 10, 25]}
//                 component="div"
//                 // @ts-ignore
//                 count={!props.rows[props.list_name] ? 1: props.rows[props.list_name].length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//         </Paper>
//
//     )
// }