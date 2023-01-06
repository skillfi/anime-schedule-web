import * as React from "react";
import './table-form.component.scss'
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Anime} from "../../../sevices/anime.services";


export interface TableProps{
    columns: GridColDef[];
    rows: Anime[]
}
export default class TableFormComponent extends React.Component<TableProps, any>{

    constructor(props: TableProps) {
        super(props);
    }

    render() {
        return (
            <div className={'table'}>
                <DataGrid
                    rows={this.props.rows}
                    columns={this.props.columns}
                    pageSize={5}
                    rowsPerPageOptions={[this.props.columns.length]}
                    checkboxSelection
                    style={{fontFamily: 'Consolas',  fontSize: 'large', alignContent: 'center', fontWeight: "bold",
                    width: '100%', color: 'white'}}
                />
            </div>
        );
    }
}