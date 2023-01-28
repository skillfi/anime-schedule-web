import * as React from "react";
import {Box, Paper, Table, TableBodyProps, TableContainer, TablePagination} from "@mui/material";
import TableHeadComponent from "./table-head/table-head.component";
import TableBodyComponent from "./table-body/table-body.component";
import {IAnime} from "../../types/types";
import {Episodes} from "../../components/anime-list/anime-list.component";
import Row from "./collapse/collapse-box/collapse-table-cell.component";
import {getWindowDimensions} from "../navbar/navbar.component";

/** User List Props
 * @property {string} list_name - `User List Name`
 * @property {Array<IAnime>} [rows] - `Anime List` from response
 * @property {Array<string>} columns - `Table Head Cells`
 */
interface UserListProps extends TableBodyProps {
    /** User List Name
     * @default Favorites
     */
    list_name: string;
    /** Anime List from response
     * @default BookmarkRow[]
     */
    rows: IAnime[];
    columns: any[];
    lists: string[]
    type?: string;
    episodes?: Episodes[]
    actions: string[]

}

/** Table Class Component
 * @property {UserListProps} props - `Table Props`
 */
export default class TableComponent extends React.Component<UserListProps,
    { page: number, rowsPerPage: number, book: IAnime[], lists: string[], anime: IAnime[], open: boolean,
        windowDimensions: ReturnType<typeof getWindowDimensions>}> {
    lists: string[] = []
    book: IAnime[] = []
    anime: IAnime[] = []
    public rows = []

    constructor(props: UserListProps) {
        super(props);
        this.state = {page: 0, rowsPerPage: 5, book: [], anime: [], lists: [], open: false,
            windowDimensions: getWindowDimensions()}
        this.handleChangePage = this.handleChangePage.bind(this)
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
        this.handleResize = this.handleResize.bind(this)
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

    handleResize(){
        this.setState({windowDimensions: getWindowDimensions()})
    }

    componentDidUpdate(prevProps: Readonly<UserListProps>,
                       prevState: Readonly<{ page: number; rowsPerPage: number; book: IAnime[]; lists: string[];
        anime: IAnime[]; open: boolean; windowDimensions: ReturnType<typeof getWindowDimensions> }>, snapshot?: any) {
        window.addEventListener('click', this.handleResize)
        return () => window.removeEventListener('click', this.handleResize)

    }

    render() {
        return (
            <Paper sx={{width: this.state.windowDimensions.minWidth * 0.8, overflow: 'hidden'}}>
                <TableContainer sx={{minWidth: this.state.windowDimensions.minWidth * 0.8}}>
                    <Table aria-label={"mui table"} size={"small"} align={'center'}>
                        <TableHeadComponent columns={this.props.columns}/>
                        <TableBodyComponent rows={this.props.rows} page={this.state.page}
                                            rowsPerPage={this.state.rowsPerPage}
                                            renderRows={(row: IAnime) => (
                                                <Row cell={row} anime={row} type={this.props.type}
                                                     lists={this.props.lists} key={row._id}
                                                     box_name={'Episodes'}
                                                     episodes={row.episode}
                                                actions={this.props.actions}/>
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