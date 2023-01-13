import * as React from "react";
import {IncotermProps} from "../../types/types";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";

const IncotermComponent = React.memo(function Incoterm(props: IncotermProps) {
    const {value} = props;

    if (!value) {
        return null;
    }

    const valueStr = value.toString();
    const tooltip = valueStr.slice(valueStr.indexOf('(') + 1, valueStr.indexOf(')'));
    const code = valueStr.slice(1, valueStr.indexOf('(')).trim();

    return (
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <span>{code}</span>
            <Tooltip title={tooltip}>
                <InfoIcon sx={{color: '#2196f3', alignSelf: 'center', ml: '8px'}}/>
            </Tooltip>
        </Box>
    );
});

export default IncotermComponent;