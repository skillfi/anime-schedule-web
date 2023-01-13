import * as React from "react";
import {TableBody} from "@mui/material";

interface TableBodyProps<T> {
    rows: T[];
    renderRows: (row: T) => JSX.Element;
    list_name?:string;
    cellNames?: string[]
}

export default function TableBodyComponent<T>(props: TableBodyProps<T>) {
    return (
        <TableBody>
            {props.rows.map(props.renderRows)}
        </TableBody>
    )
}