import * as React from "react";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import HMobiledataIcon from "@mui/icons-material/HMobiledata";
import HdIcon from "@mui/icons-material/Hd";
import HdrOnIcon from "@mui/icons-material/HdrOn";
import {StyledChip} from "../styles/styles";


interface StatusProps {
    status: string;
}

export const Status = React.memo((props: StatusProps) => {
    const {status} = props;

    let icon: any = null;
    if (status === 'Low') {
        icon = <LowPriorityIcon className="icon"/>;
    } else if (status === 'Normal') {
        icon = <HMobiledataIcon className="icon"/>;
    } else if (status === 'HD') {
        icon = <HdIcon className="icon"/>;
    } else if (status === 'HDR') {
        icon = <HdrOnIcon className="icon"/>;
    }

    let label: string = status;
    if (status === 'Low') {
        label = 'Low';
    }

    return (
        <StyledChip className={status} icon={icon} size="small" label={label} variant="outlined"/>
    );
});