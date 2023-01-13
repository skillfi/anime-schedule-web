import * as React from "react";
import {TableRow} from "@mui/material";
import {getColumnNames} from "../../../helpers/toolls";
import {styled} from "@mui/material/styles";

/** Table Cell Props
 * @property {T} cell - `Data Array`
 * @property {function(cell: T): JSX.Element} renderCells - `Rendered Data Cell`
 */
interface TableRowProps<T> {
    /** Data Cell
     *
     */
    cell?: T;
    /** Render Cell with Data
     *
     * @param {T} cell - `Data`
     * @param {number} index - `Index Data`
     */
    renderCells: (cell: T | string, index: number) => JSX.Element;
    columns: string[];

}
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
export default function TableRowBodyComponent<T>(props: TableRowProps<T>) {
    return (
        <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            {/*{props.renderCells(props.cell)}*/}
            {props.columns.map(props.renderCells)}
        </StyledTableRow>
    )
}