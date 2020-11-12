import React, { useState } from 'react';
import clsx from 'clsx';
// import { Radio, RadioGroup } from 'react-radio-group'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
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
// import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
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
        margin: 0,
        padding: 0,
    },
    quantityBox: {
        // color: theme.palette.neutral.white,
        // backgroundColor: theme.palette.neutral.black,
        align: 'left',
        alignItems: 'left',
        fontSize: '0.7rem',
        // border: "1px solid red",
        textAlign: 'left',
        marginLeft: 0,
        paddingright: 1,
        marginBottom: 0,
        paddingBottom: 0,
        marginTop: 0,
        paddingTop: 0,
    },
    toppingContent: {
        color: theme.palette.neutral.black,
        fontSize: props => props.wordSize * 0.1 + 'rem',
        // border: "1px solid red",
        fontWeight: 300,
        // verticalAlign: 'center',
        // textAlign: 'right',
        // marginTop: theme.spacing(1),
        // marginRight: '1rem',
        // fontWeight: 'fontWeightBold',
        margin: theme.spacing(0),
        padding: theme.spacing(0),
        display: 'inline',
        textTransform: 'none',
    },
    checkboxCSS: {
        border: "1px solid red",
        fontSize: '1rem'
    },
    iconRoot: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    icon: {
        borderRadius: '50%',
        width: props => 1.2 * props.weight,
        height: props => 1.2 * props.weight,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: '#ebf1f5',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
    checkedIcon: {
        backgroundColor: '#137cbd',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: props => 1.2 * props.weight,
            height: props => 1.2 * props.weight,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#106ba3',
        },
    },
}));

function StyledRadio(props) {
    const classes = useStyles(props);
    debugger;
    return (

        <Radio
            className={classes.iconRoot}
            disableRipple
            color="default"
            // size="small"
            // fontSize={ 1== 1 ? "0.8rem" : "1.6ren"}
            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
            icon={<span className={classes.icon} />}
            // icon={<RadioButtonUncheckedIcon style={{ fontSize: '0.8rem' }} />}
            // icon={<RadioButtonUncheckedIcon fontSize="small" />}
            // checkedIcon={<RadioButtonCheckedIcon fontSize="small" />}
            // checkedIcon={<RadioButtonCheckedIcon style={{ fontSize: '0.8rem' }} />}
            {...props}
        />
    );
}


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
    const wordSize = props.wordSize;
    const classes = useStyles(props);

    return (
        <Grid container spacing={0}>


            {toppingApplyMenu && toppingApplyMenu.map((elem, idx) => {
                debugger;
                const g = (toppingMap[elem])[1];
                const p = (toppingMap[elem])[2];
                let fSize = (wordSize * 0.1) + 'rem'


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
                                            classes={{
                                                label: classes.checkboxCSS
                                            }}
                                            style={{ width: 36, height: 36 }}
                                            checked={toppingMenuResult[idx]}
                                            onChange={e => setMenuToppingBox(e, idx, itemId, itemSeq, toppingMenuResult)}
                                            name="checkedB"
                                            color="primary"
                                            icon={<CheckBoxOutlineBlankIcon style={{ fontSize: fSize }} />}
                                            checkedIcon={<CheckBoxIcon style={{ fontSize: fSize }} />}
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
                    debugger;
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
                                                control={<StyledRadio weight={wordSize} />}
                                                label={<Typography noWrap className={classes.toppingContent}>{(toppingMap[elem])[0]}  </Typography>}
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