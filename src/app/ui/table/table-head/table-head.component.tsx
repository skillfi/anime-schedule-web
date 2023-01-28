import * as React from "react";
import {TableCell, TableHead, TableRow} from "@mui/material";
import TableRowHeadComponent from "../table-row/table-row-head.component";
import TableCellHeadComponent from "../table-cell/table-cell-head.component";
import GenerateAnimeButtonComponent from "../../buttons/generate-anime-button.component";

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

    function replaceTitle(title: string) {
        if (title == 'Episode_Id'){
            return '№'
        }
        return title.replace('_', ' ')
    }

    return (
        <TableHead>
            <TableRowHeadComponent cells={props.columns} renderCells={(cell, index)=>(
                <TableCellHeadComponent cellName={replaceTitle(cell)} align={'center'} collapse={false} key={index}
                                        action_button={<GenerateAnimeButtonComponent size={'medium'}/>}/>)} key={1}/>
        </TableHead>)
}