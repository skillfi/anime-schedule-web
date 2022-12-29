import * as React from "react";
import './Menu.css'
import TableFormComponent from "../../ui/table/table-form/table-form.component";
import AnimeServices, {Anime} from "../../sevices/anime.services";
import {GridColDef} from "@mui/x-data-grid";
import { useDemoData, GridColDefGenerator } from '@mui/x-data-grid-generator'

export interface MenuStates{
    rows: any[];
    fields: GridColDef[];
}
export default class MenuBodyComponent extends React.Component<any, MenuStates>{

    constructor(props: any, private anime: Anime) {
        super(props);
        this.generateRow = this.generateRow.bind(this)
        this.getAnime = this.getAnime.bind(this)
        this.state = {rows: [], fields: []}
    }


    generateRow(){
        const  anime_list = this.getAnime()
        const rows: any[] = []
        const fields: GridColDef[] = []
        anime_list.map((anime)=> {
            rows.push({
                id: anime.id,
                name: anime.name,
                release_date: anime.release_date
            })
        })
        fields.push(
            {field: 'id', headerName: 'Id', width: 60},
            {field: 'name', headerName: 'Name', width: 200},
            {field: 'release_date', headerName: 'Release Date', width: 140}
        )
        this.setState({fields: fields, rows: rows})

    }

    componentDidMount() {
        this.generateRow()
    }

    // componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<MenuStates>, snapshot?: any) {
    //     if (this.state !== prevState){
    //         this.generateRow()
    //     }
    // }

    getAnime(): Anime[]{
         AnimeServices.getAll().then((response)=> {
                this.setState({rows:response.data.data})
            }
        )
        return this.state.rows
    }

    render() {
        return (
            <div>
                <TableFormComponent columns={this.state.fields} rows={this.state.rows}/>
            </div>
        );
    }
}