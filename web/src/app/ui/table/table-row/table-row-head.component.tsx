import * as React from "react";
import {TableRow} from "@mui/material";
import {styled} from "@mui/material/styles";

/** Table Row Props
 * @property {Array<string>} cells - `Cell Names`
 * @property {function(cell: string, index: number): JSX.Element} renderCells - Render `Cell With Nane` Element
 */
interface TableRowProps {
    /** Cell Name
     * @default []
     */
    cells: string[];
    renderCells: (cell: string, index: number) => JSX.Element

}

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
/** Table Row Component
 *
 * @param {TableRowProps} props - `Row Head Props`
 * @constructor
 */
export default function TableRowHeadComponent(props: TableRowProps) {

    return (
        <StyledTableRow>
            {props.cells.map(props.renderCells)}
        </StyledTableRow>
    )
}