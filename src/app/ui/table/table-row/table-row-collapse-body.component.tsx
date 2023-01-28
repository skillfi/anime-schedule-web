import * as React from "react";
import {TableRow} from "@mui/material";
import {styled} from "@mui/material/styles";
import {Episodes} from "../../../components/anime-list/anime-list.component";

/** Table Cell Props
 * @property {C} cell - `Data Array`
 * @property {function(cell: C | string): JSX.Element} renderCells - `Rendered Data Cell`
 */
interface TableRowProps<C> {
    /** Data Cell
     *
     */
    cell?: C;
    /** Render Cell with Data
     *
     * @param {C, string} cell - `Data`
     * @param {number} index - `Index Data`
     */
    renderCells: (cell: C | string, index: number) => JSX.Element;
    columns: string[];
    episodes?: Episodes;

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

export default class TableRowCollapseBodyComponent<C> extends React.Component<TableRowProps<C>, any> {

    constructor(props: TableRowProps<C>) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <StyledTableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                    {this.props.columns.map(this.props.renderCells)}
                </StyledTableRow>
            </React.Fragment>
        );
    }
}