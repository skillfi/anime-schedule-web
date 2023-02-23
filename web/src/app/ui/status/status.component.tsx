import * as React from "react";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import HMobiledataIcon from "@mui/icons-material/HMobiledata";
import HdIcon from "@mui/icons-material/Hd";
import HdrOnIcon from "@mui/icons-material/HdrOn";
import {StyledChip} from "../styles/styles";
import {OverridableStringUnion} from "@mui/types";
import {ChipProps, ChipPropsSizeOverrides} from "@mui/material/Chip/Chip";

/** Anime Status Quality
 * @property {string, 'Low', 'Normal', 'HD', 'HDR'} status - `Anime Quality`
 */
interface StatusProps extends ChipProps{
    status: string;
    quality: number;
    size?: OverridableStringUnion<'small' | 'medium', ChipPropsSizeOverrides>;
}

/** Status Component
 *
 */
const StatusComponent = React.memo((props: StatusProps) => {
    const {status, quality, size} = props;

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
        <StyledChip className={status} icon={icon} label={quality} variant="outlined" size={size}/>
    );
});

export default StatusComponent;