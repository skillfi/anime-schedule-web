import * as React from "react";
import {Stack} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
interface CustomAlertProps extends AlertProps{
    message: string;
    open: boolean;
}
export default class  CustomAlert extends React.Component<CustomAlertProps, any>{


    render() {
        return (
            <Snackbar open={this.props.open} autoHideDuration={5} onClose={()=>this.props.onClose}>
                <Alert severity={this.props.severity} sx={{width: '100%'}}>
                    {this.props.message}
                </Alert>
            </Snackbar>
        );
    }
}
