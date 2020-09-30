import React from 'react';
import { Radio, RadioGroup } from 'react-radio-group'
import { useTranslation } from 'react-i18next';
// import {
//     Input,
//     Row,
//     Col,
//     FormGroup,
//     Label,
// } from "reactstrap";
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
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
const useStyles = makeStyles({
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
        // backgroundColor: 'primary',
        // color: 'white',
        fontStyle: 'oblique',
        fontSize: "30px",
        fontWeight: 500,
        textAlign: "left",
        fontWeight: 'fontWeightBold',
    },
});

function Toppingline(props) {
    const { t } = useTranslation();
    // debugger;
    const toppingApplyOrder = props.toppingApplyOrder;
    const toppingGroupMap = props.toppingGroupMap;
    const toppingMap = props.toppingMap;
    const toppingOrderResult = props.toppingOrderResult;
    const setOrderToppingBox = props.setOrderToppingBox;
    const setOrderToppingRadio = props.setOrderToppingRadio;
    const classes = useStyles();


    return (
        <Grid xs={12}>

            {toppingApplyOrder && toppingApplyOrder.map((elem, idx) => {
                // debugger;
                const g = (toppingMap[elem])[1];
                if (g == 'G0') {
                    return (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={toppingOrderResult[idx]}
                                    onChange={e => setOrderToppingBox(e, idx)}
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label={(toppingMap[elem])[0]}
                        />)
                    // <FormGroup className="float-left" key={idx}>

                    //     <Input className="form-control margin-left" type="checkbox" id="applyOrder"
                    //         checked={
                    //             toppingOrderResult[idx]
                    //         }
                    //         onChange={e => setOrderToppingBox(e, idx)}
                    //     />
                    //     <Label for="applyOrder" className="indented-checkbox-text">
                    //         {(toppingMap[elem])[0]}
                    //     </Label>
                    // </FormGroup>)
                } else {
                    const g = (toppingMap[elem])[1];
                    const gItemArr = toppingGroupMap[g];
                    // debugger;
                    return <RadioGroup name={g} key={g} className="radio-button-background" onChange={e => setOrderToppingRadio(e, idx)}>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                {gItemArr.map((elem, gIdx) => {
                        return (
                            <span key={gIdx}>
                                &nbsp;
                                <Radio value={elem}
                                    className="radio-button"
                                    checked={toppingOrderResult[idx] == elem}
                                />

                                {(toppingMap[elem])[0]}
                    &nbsp;&nbsp;&nbsp;
                            </span>
                        )
                    })}
                    </RadioGroup>

                }
            })}
        </Grid>

    );
}

export default Toppingline;