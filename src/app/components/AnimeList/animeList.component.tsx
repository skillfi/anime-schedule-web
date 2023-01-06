import * as React from "react";
import {HTMLProps} from "react";
import {Anime} from "../../sevices/anime.services";
import {Box} from "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {generateColumns, rowCustomisation} from "../../helpers/toolls";

interface AnimeProps {
    html?: HTMLProps<any>;
    obj: object;
    rows: Anime[];

}



export default class AnimeListComponent extends React.Component<AnimeProps, any> {

    background = 'transparent'

    constructor(props: AnimeProps) {
        super(props);
    }



    render() {
        return (
            <Box sx={{height: 551, width: 1381}}>
                <DataGrid columns={generateColumns(this.props.obj)} rows={rowCustomisation(this.props.rows)}
                          pageSize={5} rowsPerPageOptions={[5]} checkboxSelection={true}
                          disableSelectionOnClick={true} sx={{
                    textAlign: 'center', fontFamily: 'Roboto',
                    fontSize: 'large', alignContent: 'center', fontWeight: 'bold',
                    background: this.background
                }}
                          components={{
                              Toolbar: GridToolbar
                          }
                          }
                          autoPageSize
                />
            </Box>
        );
    }
}