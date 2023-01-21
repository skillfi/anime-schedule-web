import * as React from "react";
import {Collapse} from "@mui/material";

interface CollapseProps<T> {
    collapse_name: string;
    open: boolean;
    cells: T[];
    render_cell: (cell: T) => JSX.Element;

}
export default function CollapseComponent<T>(props: CollapseProps<T>) {
    return (
        <Collapse in={props.open} timeout={'auto'} unmountOnExit={true}>

        </Collapse>
    )
}