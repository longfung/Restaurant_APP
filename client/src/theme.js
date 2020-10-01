import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';



const theme = createMuiTheme({
    typography: {
        subtitle1: {
            fontSize: 12,
            fontWeight: 700,
        },
        body1: {
            fontWeight: 500,
        },
        button: {
            fontStyle: 'italic',
        },
    },
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: "#000000",
        },
        secondary: {
            // This is green.A700 as hex.
            main: '#FFFFFF',
        },
        grey: {
            main: "#FFFFFF",
        },
        textPrimary: {
            main: "#FFFFFF",
        },
        appbar_tx: {
            main: "#FFFFFF",
        },
        neutral: {
            main: '3F51B5',
            blue: '#3F51B5',
            white: 'white',
            black: 'black',
            gold: 'gold',
            grey: 'grey'
        },
    },
})

export default theme;