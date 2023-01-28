import * as React from "react";
import {useNavigate} from "react-router-dom";
import {createTheme, ThemeProvider, styled} from "@mui/material/styles";
import {Chip} from "@mui/material";
import {orange, red} from "@mui/material/colors";
import {getColors} from "../styles/styles";
interface ChipProps{
    tag: string;
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
        fontSize: 15
    },
    color: getColors('orange', 600),
    fontFamily: 'Cambria Math',
    fontSize: 18,
    borderColor: getColors('red', 500),
    cursor: 'help'
}))

export default function ChipTagComponent(props: ChipProps) {
    const {tag} = props
    const navigate = useNavigate();

    return (
        <TagChip label={tag} variant={"outlined"}/>
    )
}