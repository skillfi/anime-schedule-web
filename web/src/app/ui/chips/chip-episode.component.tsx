import * as React from "react";
import {useNavigate} from "react-router-dom";
import {createTheme, ThemeProvider, styled} from "@mui/material/styles";
import {Chip} from "@mui/material";
import {orange, red} from "@mui/material/colors";
import {getColors} from "../styles/styles";
interface ChipProps{
    label: number;
    _id: string;
}

const EpisodeChip = styled(Chip)(({theme})=> ({
    ':hover': {
        color: getColors('blue', 800),
        fontSize: 15
    },
    color: getColors('orange', 600),
    fontFamily: 'Consolas',
    fontSize: 18,
    borderColor: getColors('red', 800),
    cursor: 'help'
}))

export default function ChipEpisodeComponent(props: ChipProps) {
    const {label, _id} = props
    const navigate = useNavigate();

    return (
        <EpisodeChip label={label} variant={"outlined"}/>
    )
}