import React, { useState } from 'react';
import { Radio, RadioGroup } from 'react-radio-group'
import { useTranslation } from 'react-i18next';
import {
    Input,
    Row,
    Col,
    FormGroup,
    Label,
} from "reactstrap";
import Checkbox from '@material-ui/core/Checkbox';
// import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    LinearProgress,
    Grid,
    Box,
} from '@material-ui/core';
import { mergeClasses } from '@material-ui/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding: '1px 1px',
        margin: '1px 1px',
    },
    container: {
        maxHeight: 500,
        margin: '1px 1px',
        padding: '0px 0px'
    },
    content: {
        textAlign: 'left',
        align: 'left',
        marginLeft: 0,
        marginBottom: 0,
        paddingLeft: 0,
        paddingTop: 0,
        paddingBottom: 0,
    },
    quantityBox: {
        // color: theme.palette.neutral.white,
        // backgroundColor: theme.palette.neutral.black,
        align: 'left',
        alignItems: 'left',
        textAlign: 'left',
        marginLeft: 0,
        paddingLeft: 0,
        marginBottom: 0,
        paddingBottom: 0,
        marginTop: 0,
        paddingTop: 0,
    },
    toppingContent: {
        color: theme.palette.neutral.black,
        fontSize: "0.8rem",
        fontWeight: 300,
        // verticalAlign: 'center',
        // textAlign: 'right',
        // marginTop: theme.spacing(1),
        // marginRight: '1rem',
        // fontWeight: 'fontWeightBold',
        margin: 0,
        padding: 0,
        display: 'inline-block',
        textTransform: 'none',
    }
}));



function Toppingmenuline(props) {
    const { t } = useTranslation();
    const [count, setcount] = useState(0);
    const itemId = props.item.id;
    const itemSeq = props.item.cloneSequence;
    const toppingApplyMenu = props.toppingApplyMenu;
    const toppingGroupMap = props.toppingGroupMap;
    const toppingMap = props.toppingMap;
    const toppingMenuResult = props.toppingMenuResult;
    const setMenuToppingBox = props.setMenuToppingBox;
    const setMenuToppingRadio = props.setMenuToppingRadio;
    const classes = useStyles();

    return (
        <Grid container spacing={0}>


            {toppingApplyMenu && toppingApplyMenu.map((elem, idx) => {
                // debugger;
                const g = (toppingMap[elem])[1];
                const p = (toppingMap[elem])[2];


                if (g == 'G0') {
                    return (
                        // <FormGroup className="float-left my-0 py-0 pl-0 ml-0" key={idx}>

                        //     <Input className="form-control margin-left" type="checkbox" id="applyOrder"
                        //         checked={
                        //             toppingMenuResult[idx]
                        //         }
                        //         onChange={e => setMenuToppingBox(e, idx, itemId, itemSeq, toppingMenuResult)}
                        //     />
                        //     <Label for="applyOrder" className="indented-checkbox-text">
                        //         {(toppingMap[elem])[0]}{p > 0 ? '$(' + p + ")" : null}
                        //     </Label>
                        // </FormGroup>)
                        <Grid item xs="12" className={classes.content}>
                            <FormControl component="fieldset">
                                {idx === 0 ?

                                    <FormLabel component="legend" filled >
                                        <Typography variant="caption" display="block">
                                            G0 (Select one or more)
                                            </Typography>
                                    </FormLabel>

                                    :
                                    null}

                                <FormControlLabel
                                    key={idx}
                                    control={
                                        <Checkbox className={classes.quantityBox}
                                            checked={toppingMenuResult[idx]}
                                            onChange={e => setMenuToppingBox(e, idx, itemId, itemSeq, toppingMenuResult)}
                                            name="checkedB"
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <Box component="p" fontSize={15} className={classes.quantityBox}>
                                            <Typography className={classes.toppingContent}>
                                                {(toppingMap[elem])[0]}
                                            </Typography>
                                        &nbsp;
                                        <Typography className={classes.toppingContent}>
                                                {p > 0 ? '$(' + p + ")" : null}
                                            </Typography>
                                        &nbsp;
                                    </Box>

                                    }

                                />
                            </FormControl>
                        </Grid>
                    )
                } else {
                    const g = (toppingMap[elem])[1];
                    const gItemArr = toppingGroupMap[g];
                    const gn = g + itemId + itemSeq;
                    // debugger;
                    return (
                        <Grid item xs="12" className={classes.content}>
                            <FormControl component="fieldset">

                                <FormLabel component="span" key={idx}>
                                    <Typography variant="caption" display="block" className={classes.toppingContent}>
                                        {idx + 1}: {g} (Select one)
                                        </Typography>
                                </FormLabel>

                                <RadioGroup aria-label="quiz" name={gn} value={toppingMenuResult[idx]} onChange={e => setMenuToppingRadio(e, idx, itemId, itemSeq, toppingMenuResult)}>
                                    {gItemArr.map((elem, gIdx) => {
                                        return (
                                            <FormControlLabel
                                                checked={toppingMenuResult[idx] == elem}
                                                value={elem}
                                                control={<Radio color="primary" />}
                                                label={<Typography className={classes.toppingContent}>{(toppingMap[elem])[0]}</Typography>}
                                                labelPlacement="end"
                                            />
                                        )
                                    })}
                                </RadioGroup>

                            </FormControl>
                        </Grid>

                    )
                    // })}

                    // <RadioGroup name={gn} key={g} className="radio-button-background" onChange={e => setMenuToppingRadio(e, idx, itemId, itemSeq, toppingMenuResult)}>
                    //     &nbsp;&nbsp;&nbsp;&nbsp;
                    //     {gItemArr.map((elem, gIdx) => {
                    //     return (
                    //         <span key={gIdx}>
                    //             &nbsp;
                    //             <Radio value={elem}
                    //                 className="radio-button"
                    //                 checked={toppingMenuResult[idx] == elem}
                    //             />

                    //             {(toppingMap[elem])[0]}
                    //             &nbsp;&nbsp;&nbsp;
                    //         </span>
                    //     )
                    // })}
                    // </RadioGroup>

                }


            })}
        </Grid >

    );
}

export default Toppingmenuline;