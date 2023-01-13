import * as React from "react";
import {Box, Table, Typography} from "@mui/material";

interface CollapseBoxProps<T>{
    box_name: string;

}

export default function CollapseBoxComponent<T>(props: CollapseBoxProps<T>) {
    return (
        <Box sx={{ margin: 1 }}>
            <Typography variant={'h6'} gutterBottom={true} component={"div"}>
                {props.box_name}
            </Typography>
            <Table>

            </Table>
        </Box>
    )
}