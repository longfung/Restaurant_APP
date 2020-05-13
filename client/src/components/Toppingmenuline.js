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
function Toppingmenuline(props) {
    const { t } = useTranslation();
    // debugger;
    const itemId = props.itemId;
    const toppingApplyOrder = props.toppingApplyOrder;
    const toppingGroupMap = props.toppingGroupMap;
    const toppingMap = props.toppingMap;
    const toppingOrderResult = props.toppingOrderResult;
    const setMenuToppingBox = props.setMenuToppingBox;
    const setMenuToppingRadio = props.setMenuToppingRadio;

    return (
        <Row calssName="text-left my-0 py-0 pl-0 ml-0">
            <Col sm="12">
                {toppingApplyOrder && toppingApplyOrder.map((elem, idx) => {
                    // debugger;
                    const g = (toppingMap[elem])[1];
                    if (g == 'G0') {
                        return (
                            <FormGroup className="float-left my-0 py-0 pl-0 ml-0">

                                <Input className="form-control" type="checkbox" id="applyOrder" classname="margin-left"
                                    checked={
                                        toppingOrderResult[idx]
                                    }
                                    onChange={e => setMenuToppingBox(e, idx, itemId, toppingOrderResult)}
                                />
                                <Label for="applyOrder" className="indented-checkbox-text">
                                    {(toppingMap[elem])[0]}
                                </Label>
                            </FormGroup>)
                    } else {
                        const g = (toppingMap[elem])[1];
                        const gItemArr = toppingGroupMap[g];
                        debugger;
                        return <RadioGroup name={itemId} className="radio-button-background" onChange={e => setMenuToppingRadio(e, idx, itemId, toppingOrderResult)}>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                {gItemArr.map(elem => {
                            return (
                                <span>
                                    &nbsp;
                                    <Radio value={(toppingMap[elem])[0]}
                                        className="radio-button"
                                        checked={toppingOrderResult[idx] === (toppingMap[elem])[0]}
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

export default Toppingmenuline;