import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
    Col,
} from "reactstrap";
import { MdAccountCircle } from "react-icons/md";
import { store } from "./Store";
import i18next from "i18next";
import { useTranslation } from 'react-i18next';
import "../index.css"
import { Grid } from "@material-ui/core";
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";


const useStyles = makeStyles((theme) => ({

    textContent: {
        fontSize: "20px",
        fontWeight: 500,
        align: 'justify',
        marginTop: theme.spacing(2),
        fontWeight: 'fontWeightBold',
        display: 'inline-block',
    },
    whiteColor: {
        color: theme.palette.neutral.white,
        // backgroundColor: theme.palette.neutral.black,
    },
    blueColor: {
        color: theme.palette.neutral.white,
        backgroundColor: theme.palette.neutral.blue,
    },

}));

function Language(props) {
    const classes = useStyles();
    const shareContext = useContext(store);
    const { t } = useTranslation();
    const username = shareContext.state.username;
    const [supportLocale, setSupportLocale] = useState([]);
    const [rId, setRid] = useState(0);

    if (rId == 0 && shareContext.state.restaurant)
        setRid(shareContext.state.restaurant.id);

    useEffect(() => {
        // debugger;
        if (shareContext.state.restaurant && shareContext.state.restaurant.support_locale) {
            const arr = shareContext.state.restaurant.support_locale.split(',')
            setSupportLocale(arr);
        } else {
            setSupportLocale(['en', 'tw', 'zh'])
            shareContext.dispatch({ type: "setLocale", value: 'en' });
        }

    }, [rId])

    const setLanguage = (locale) => {
        shareContext.dispatch({ type: "setLocale", value: locale });
        i18next.changeLanguage(locale);
    };

    return (

        <Grid>
            {supportLocale.map((elem, idx) => {
                return (
                    <Button key={idx}
                        // variant={shareContext.state.locale == elem ? 'outlined' : 'text'}
                        variant="text"
                        onClick={
                            () => setLanguage(elem)
                        }
                        // component={Link}
                        className={shareContext.state.locale == elem ? classes.blueColor : classes.whiteColor}
                    >
                        <Typography className={classes.whiteColor}>
                            {t(elem)}
                        </Typography>
                    </Button>
                )
            })}
        </Grid>

    );
}

export default Language;
