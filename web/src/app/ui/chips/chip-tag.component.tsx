import * as React from "react";
import {useNavigate} from "react-router-dom";
import {createTheme, ThemeProvider, styled} from "@mui/material/styles";
import {Chip} from "@mui/material";
import {orange, red} from "@mui/material/colors";
import {getColors} from "../styles/styles";
import {SxProps} from "@mui/system/styleFunctionSx";
import {Theme} from "@mui/material";
interface ChipProps{
    tag: string;
    sx?: SxProps<Theme>;
}

const outerTheme = createTheme({
    palette: {
        primary: {
            main: orange[500],
        },
    },
});

const TagChip = styled(Chip)(({theme})=> ({
    ':hover': {
        color: getColors('blue', 500),
    },
    color: getColors('orange', 600),
    borderColor: getColors('red', 500),
    cursor: 'pointer',
    fontFamily: 'Consolas'
}))

export default function ChipTagComponent(props: ChipProps) {
    const {tag} = props
    const navigate = useNavigate();

    return (
        <TagChip label={tag} variant={"outlined"}/>
    )
}

export function ChipTagMobileComponent(props: ChipProps) {
    const {tag, sx} = props
    const navigate = useNavigate();

    return (
        <TagChip label={tag} variant={"outlined"} sx={sx} size={'small'}/>
    )
}