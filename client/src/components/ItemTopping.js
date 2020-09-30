import React from 'react'
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    textContent: {
        fontSize: "12px",
        fontWeight: 300,
        align: 'justify',
        marginTop: theme.spacing(0),
        fontWeight: 'fontWeightBold',
        display: 'inline-block',
    }

}));
function ItemTopping(props) {
    debugger;
    const classes = useStyles();
    const { t } = useTranslation();
    const elem = props.elem;
    const toppingMap = props.toppingMap;
    return (
        <Grid container spacing={0}>
            { elem.isTopping > 0 ?
                <Grid xs="12" >
                    {/* <span className="SmallFont font-weight-bold">{t("Note")}:&nbsp;&nbsp;</span> */}
                    <Typography variant="body2" className={classes.textContent}>
                        {t("Note")}:
                    </Typography>
                    {elem.toppingArray && elem.toppingArray.map((item, idx) => {
                        const g = (toppingMap[item])[1];
                        const n = (toppingMap[item])[0];
                        const p = (toppingMap[item])[2];
                        // if (elem.toppingResult[idx] == true) {
                        //     tSum = p == 0 ? tSum : tSum + parseFloat(p);
                        // }
                        if (g == 'G0') {
                            if (elem.toppingResult[idx] == true) {
                                if (idx != 0)
                                    return <Typography variant="body2" component="span" className={classes.textContent}>
                                        ,&nbsp;&nbsp;{n}{p > 0 ? '($' + p + ")" : null}
                                    </Typography>
                                else
                                    return <Typography variant="body2" className={classes.textContent}>
                                        {n}{p > 0 ? '($' + p + ")" : null}
                                    </Typography>
                            }
                        } else {
                            const res = toppingMap[elem.toppingResult[idx]];
                            if (idx != 0)
                                return <Typography variant="body2" component="span" className={classes.textContent}>,&nbsp;&nbsp;{res[0]}</Typography>
                            else
                                return <Typography variant="body2" component="span" className={classes.textContent}>{res[0]}</Typography>
                        }
                    })}
                </Grid>
                : null
            }

        </Grid >
    )
}
export default ItemTopping
