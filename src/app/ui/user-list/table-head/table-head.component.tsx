import * as React from "react";
import {TableHead} from "@mui/material";
import TableRowHeadComponent from "../table-row/table-row-head.component";
import TableCellHeadComponent from "../table-cell/table-cell-head.component";

/** Table Head Props
 * @property {Array<string>} columns - `Columns Names`
 */
interface TableHeadProps{
    columns: string[];
}
/** TableHeadComponent
* @param props `TableHeadProps`
 */
export default function TableHeadComponent(props: TableHeadProps) {
    return (
        <TableHead>
            <TableRowHeadComponent cells={props.columns} renderCells={(cell, index)=>(
                <TableCellHeadComponent cellName={cell} align={'center'} collapse={false} key={index}/>
            )}/>
        </TableHead>
    )
}