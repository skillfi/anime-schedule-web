import * as React from "react";
import {Data} from "../../models/form-data.model";
import {Anime} from "../../sevices/anime.services";


interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    // order: Order;
    orderBy: string;
    rowCount: number;
}

export interface TableProps {
    rows: any[] | Anime[];
    obj: object;
    name: string;
    enhance?: EnhancedTableProps;
}


/**
 *  Generate columns
 * @param object Class to render names
 * */
// function GenerateColumns(object: object): GridColDef[] {
//     const [open, setOpen] = useState(false)
//     const style = {
//         position: 'absolute' as 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         width: 400, height: 500,
//         bgcolor: colors.cyan[800],
//         border: '2px solid #000',
//         borderRadius: 4,
//         boxShadow: 24,
//         p: 4,
//     };
//
//     function handleOpen() {
//         setOpen(true)
//     }
//
//     function handleClose() {
//         setOpen(false)
//     }
//
//     let col: GridColDef[] = []
//     let coldef: GridColDef;
//     getColumnNames(object).map((name) => {
//         switch (name) {
//             case 'rating': {
//                 coldef = {
//                     field: name,
//                     headerName: name.charAt(0).toUpperCase() + name.slice(1),
//                     width: 150,
//                     renderCell: renderRating,
//                     type: "number",
//                     align: 'left'
//                 }
//                 col.push(coldef)
//                 break;
//             }
//             case 'release_date': {
//                 coldef = {
//                     field: name,
//                     headerName: 'Release Date',
//                     type: 'date',
//                     width: 150,
//                 }
//                 col.push(coldef)
//                 break;
//             }
//             case 'country': {
//                 coldef = {
//                     field: name,
//                     headerName: name.charAt(0).toUpperCase() + name.slice(1),
//                     width: 120,
//                     hideable: true
//                 }
//                 break;
//             }
//             case 'name': {
//                 coldef = {
//                     field: name,
//                     headerName: name.charAt(0).toUpperCase() + name.slice(1),
//                     width: 200
//                 }
//                 col.push(coldef)
//                 break;
//             }
//             case 'quality': {
//                 coldef = {
//                     field: name,
//                     headerName: name.charAt(0).toUpperCase() + name.slice(1),
//                     width: 150,
//                     renderCell: customRenderStatus,
//
//                 }
//                 col.push(coldef)
//                 break;
//             }
//             case 'actions': {
//                 let action = {
//                     field: 'actions',
//                     type: 'actions',
//                     getActions: (params: GridRowParams) => [
//                         <GridActionsCellItem icon={<ModeIcon/>} onClick={handleOpen} label="Edit">
//                             <Modal
//                                 open={open}
//                                 onClose={handleClose}
//                                 aria-labelledby="modal-modal-title"
//                                 aria-describedby="modal-modal-description"
//                             >
//                                 <Box sx={style}>
//                                     <ModalComponent/>
//                                 </Box>
//                             </Modal>
//                         </GridActionsCellItem>,
//                         <GridActionsCellItem icon={<DeleteIcon/>} label="Delete" showInMenu/>,
//                     ],
//                 }
//                 col.push(action)
//                 break;
//             }
//             default: {
//                 coldef = {
//                     field: name,
//                     headerName: name.charAt(0).toUpperCase() + name.slice(1),
//                     width: 120
//                 }
//                 col.push(coldef)
//                 break;
//             }
//         }
//     })
//     return col
// }


// export default function AutomatedTableComponent(props: TableProps) {
//
//     return (
//         <Box sx={{height: 400, width: '98%'}}>
//             <Box sx={{
//                 display: 'flex', background: `radial-gradient(${colors.deepPurple[500]},#1f1013)`, width: 'max-content',
//                 textAlign: 'center', alignSelf: 'center', borderRadius: 5
//             }}>
//                 <Typography variant="h6"
//                             sx={{
//                                 mr: 10,
//                                 display: {xs: 'none', md: 'flex'},
//                                 fontFamily: 'monospace',
//                                 fontWeight: 500,
//                                 // letterSpacing: '.3rem',
//                                 color: colors.teal[900],
//                                 // textDecoration: 30,
//                                 fontSize: 40
//                             }}>{props.name}</Typography>
//                 {props.name !== 'Manage Anime' ? '' :
//                     <Button variant="contained" style={{borderRadius: 30}}>{'Generate'}</Button>}
//             </Box>
//             <DataGrid columns={GenerateColumns(props.obj)} rows={rowCustomisation(props.rows)}
//                       pageSize={5} rowsPerPageOptions={[5]} checkboxSelection={true}
//                       disableSelectionOnClick={true} sx={{
//                 textAlign: 'center', fontFamily: 'Consolas',
//                 fontSize: 'large', alignContent: 'center', fontWeight: 'bold', color: 'white',
//                 background: 'transparent'
//             }}
//                       components={{
//                           Toolbar: GridToolbar
//                       }
//                       }
//                       autoPageSize
//             />
//         </Box>
//
//     )
// }