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
    debugger;
    const itemId = props.item.id;
    const itemSeq = props.item.cloneSequence;
    const toppingApplyMenu = props.toppingApplyMenu;
    const toppingGroupMap = props.toppingGroupMap;
    const toppingMap = props.toppingMap;
    const toppingMenuResult = props.toppingMenuResult;
    const setMenuToppingBox = props.setMenuToppingBox;
    const setMenuToppingRadio = props.setMenuToppingRadio;

    return (
        <Row >
            <Col sm="12">
                {toppingApplyMenu && toppingApplyMenu.map((elem, idx) => {
                    // debugger;
                    const g = (toppingMap[elem])[1];
                    const p = (toppingMap[elem])[2];
                    if (g == 'G0') {
                        return (
                            <FormGroup className="float-left my-0 py-0 pl-0 ml-0" key={idx}>

                                <Input className="form-control margin-left" type="checkbox" id="applyOrder"
                                    checked={
                                        toppingMenuResult[idx]
                                    }
                                    onChange={e => setMenuToppingBox(e, idx, itemId, itemSeq, toppingMenuResult)}
                                />
                                <Label for="applyOrder" className="indented-checkbox-text">
                                    {(toppingMap[elem])[0]}{p !== 0 ? '$(' + p + ")" : null}
                                </Label>
                            </FormGroup>)
                    } else {
                        const g = (toppingMap[elem])[1];
                        const gItemArr = toppingGroupMap[g];
                        const gn = g + itemId + itemSeq;
                        debugger;
                        return <RadioGroup name={gn} key={g} className="radio-button-background" onChange={e => setMenuToppingRadio(e, idx, itemId, itemSeq, toppingMenuResult)}>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            {gItemArr.map((elem, gIdx) => {
                            return (
                                <span key={gIdx}>
                                    &nbsp;
                                    <Radio value={elem}
                                        className="radio-button"
                                        checked={toppingMenuResult[idx] == elem}
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