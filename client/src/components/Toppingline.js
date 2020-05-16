import React from 'react';
import { Radio, RadioGroup } from 'react-radio-group'
import { useTranslation } from 'react-i18next';
import {
    Input,
    Row,
    Col,
    FormGroup,
    Label,
} from "reactstrap";
function Toppingline(props) {
    const { t } = useTranslation();
    // debugger;
    const toppingApplyOrder = props.toppingApplyOrder;
    const toppingGroupMap = props.toppingGroupMap;
    const toppingMap = props.toppingMap;
    const toppingOrderResult = props.toppingOrderResult;
    const setOrderToppingBox = props.setOrderToppingBox;
    const setOrderToppingRadio = props.setOrderToppingRadio;

    return (
        <Row form>
            <Col sm="12">
                {toppingApplyOrder && toppingApplyOrder.map((elem, idx) => {
                    // debugger;
                    const g = (toppingMap[elem])[1];
                    if (g == 'G0') {
                        return (
                            <FormGroup className="float-left" key={idx}>

                                <Input className="form-control margin-left" type="checkbox" id="applyOrder"
                                    checked={
                                        toppingOrderResult[idx]
                                    }
                                    onChange={e => setOrderToppingBox(e, idx)}
                                />
                                <Label for="applyOrder" className="indented-checkbox-text">
                                    {(toppingMap[elem])[0]}
                                </Label>
                            </FormGroup>)
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
            </Col>
        </Row>
    );
}

export default Toppingline;