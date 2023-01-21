import * as React from "react";
import {TableBody} from "@mui/material";

interface TableBodyProps<T> {
    rows: T[];
    renderRows: (row: T, index: number) => JSX.Element;
    list_name?:string;
    cellNames?: string[]
    rowsPerPage: number;
    page: number;
    data?: any[]
}

export default function TableBodyComponent<T>(props: TableBodyProps<T>) {
    return (
        <TableBody>
            {!props.rows ? props.data?.slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage)
                .map(props.renderRows): props.rows.slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage)
                .map(props.renderRows)}
        </TableBody>
    )
}