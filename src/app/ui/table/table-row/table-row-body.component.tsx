import * as React from "react";
import {TableCell, tableCellClasses, TableRow} from "@mui/material";
import {styled} from "@mui/material/styles";
import {Episodes} from "../../../components/anime-list/anime-list.component";

/** Table Cell Props
 * @property {T} [cell] - `Data Array`
 * @property {function(cell: T, index: number): JSX.Element} renderCells - `Rendered Data Cell`
 * @property {string} columns - `Object Keys`
 */
interface TableRowProps<T> {
    /** Render Cell with Data
     *
     * @param {T} cell - `Data`
     * @param {number} index - `Index Data`
     */
    renderCells: (cell: T | string, index: number) => JSX.Element;
    columns: string[];
    episodes?: Episodes;

}

export const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 14,
        fontFamily: ['Consolas']
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        fontFamily: ['Consolas'],
        width: 'max-content',
        paddingBottom: 0,
        paddingTop: 0
    },
}))

export default class TableRowBodyComponent<T> extends React.Component<TableRowProps<T>, any> {

    public row: any;

    constructor(props: TableRowProps<T>) {
        super(props);
    }

    render() {
        return (
            <StyledTableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                {this.props.columns.map(this.props.renderCells)}
            </StyledTableRow>
        );
    }
}