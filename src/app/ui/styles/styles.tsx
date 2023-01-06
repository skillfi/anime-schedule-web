import {styled} from '@mui/material/styles';
import Chip from "@mui/material/Chip";

export const StyledChip = styled(Chip)(({theme}) => ({
    justifyContent: 'left',
    '& .icon': {
        color: 'inherit',
    },
    '&.Low': {
        color: (theme || theme).palette.info.dark,
        border: `1px solid ${(theme || theme).palette.info.main}`,
    },
    '&.Normal': {
        color: (theme || theme).palette.success.dark,
        border: `1px solid ${(theme || theme).palette.success.main}`,
    },
    '&.HD': {
        color: (theme || theme).palette.warning.dark,
        border: `1px solid ${(theme || theme).palette.warning.main}`,
    },
    '&.HDR': {
        color: (theme || theme).palette.error.dark,
        border: `1px solid ${(theme || theme).palette.error.main}`,
    },
}));