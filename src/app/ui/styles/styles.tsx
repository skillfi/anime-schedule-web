import {styled, createTheme} from '@mui/material/styles';
import Chip from "@mui/material/Chip";
import Tabs from "@mui/material/Tabs";
import * as colors from "@mui/material/colors";
import {getWindowDimensions} from "../navbar/navbar.component";

export const StyledChip = styled(Chip)(({theme}) => ({
    justifyContent: 'left',
    '& .icon': {
        color: 'inherit',
        size: 10
    },
    '&.Low': {
        color: (theme || theme).palette.info.dark,
        border: `2px solid ${(theme || theme).palette.info.main}`,
        fontSize: 20,
        fontFamily: 'Consolas'
    },
    '&.Normal': {
        color: (theme || theme).palette.success.dark,
        border: `2px solid ${(theme || theme).palette.success.main}`,
        fontSize: 20,
        fontFamily: 'Consolas'
    },
    '&.HD': {
        color: (theme || theme).palette.warning.dark,
        border: `2px solid ${(theme || theme).palette.warning.main}`,
        fontSize: 20,
        fontFamily: 'Consolas'
    },
    '&.HDR': {
        color: (theme || theme).palette.error.dark,
        border: `1px solid ${(theme || theme).palette.error.main}`,
        fontSize: 20,
        fontFamily: 'Consolas'
    },
}));

export function getColors(
    color: 'red' | 'purple'| 'pink' | 'deepPurple' | 'indigo' | 'blue'
| 'lightBlue' | 'cyan' | 'teal' | 'green' | 'lightGreen' | 'lime'
| 'yellow' | 'amber' | 'orange' | 'deepOrange' | 'brown' | 'grey' | 'blueGrey',
    palette: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'A100'
| 'A200' | 'A400' | 'A700') {
    switch (color) {
        case 'red': {
            return colors.red[palette]
        }
        case 'purple': {
            return colors.purple[palette]
        }
        case 'pink': {
            return colors.pink[palette]
        }
        case 'deepPurple': {
            return colors.deepPurple[palette]
        }
        case 'indigo': {
            return colors.indigo[palette]
        }
        case 'blue': {
            return colors.blue[palette]
        }
        case 'lightBlue': {
            return colors.lightBlue[palette]
        }
        case 'cyan': {
            return colors.cyan[palette]
        }
        case 'teal': {
            return colors.teal[palette]
        }
        case 'green': {
            return colors.green[palette]
        }
        case 'lightGreen': {
            return colors.lightGreen[palette]
        }
        case 'lime': {
            return colors.lime[palette]
        }
        case 'yellow': {
            return colors.yellow[palette]
        }
        case 'amber': {
            return colors.amber[palette]
        }
        case 'orange': {
            return colors.orange[palette]
        }
        case 'deepOrange': {
            return colors.deepOrange[palette]
        }
        case 'brown': {
            return colors.brown[palette]
        }
        case 'grey': {
            return colors.grey[palette]
        }
        case 'blueGrey': {
            return colors.blueGrey[palette]
        }
    }
}

export const StyledTabs = styled(Tabs)(({theme})=>(
    {
        borderRight: 2,
        borderColor: 'divider',
        background: 'transparent',
        borderRadius: 10,
        height: 60,
        indicatorColor: theme.palette.primary,
        textColor: theme.palette.secondary
    }
))

export  const userListTheme = createTheme({
    palette: {
        primary: {
            main: getColors('brown', 900)
        },
        secondary: {
            main: getColors('deepOrange', 900)
        }
    }
})

export  const adminTabsTheme = createTheme({
    palette: {
        primary: {
            main: getColors('red', 900)
        },
        secondary: {
            main: getColors('deepOrange', 900)
        }
    }
})