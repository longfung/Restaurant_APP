import React, { useState, useEffect } from 'react'
import { MdAddCircle, MdRemoveCircle, MdArrowBack } from 'react-icons/md';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Cart(props) {
    const { t } = useTranslation();
    const cartList = props.cartList;
    const isQuantity = props.isQuantity;
    const addToOrder = props.addToOrder;
    const removeFromOrder = props.removeFromOrder;
    const setIsOrder = props.setIsOrder;
    const cartTotal = props.cartTotal;
    const taxRate = props.taxRate;
    const toppingApplyOrder = props.toppingApplyOrder;
    const toppingMap = props.toppingMap;
    const toppingOrderResult = props.toppingOrderResult;
    const [resultCount, setResultCount] = useState(0);

    useEffect(() => {
        let cnt = 0;
        toppingOrderResult.map(elem => {
            if (elem != false)
                cnt++;
        })
        setResultCount(cnt - 1);
    }, [])

    return (
        <div>
            <Row>
                <Col sm="12" className="font-weight-bold">
                    <span>{t("Note")}:&nbsp;&nbsp;</span>
                    {toppingApplyOrder && toppingApplyOrder.map((elem, idx) => {
                        const g = (toppingMap[elem])[1];
                        const n = (toppingMap[elem])[0]
                        // if (idx == 0)
                        //     return <span>{t("Note")}:&nbsp;&nbsp;</span>
                        debugger;
                        if (g == 'G0') {
                            if (toppingOrderResult[idx] == true) {
                                if (idx < resultCount)
                                    return <span key={idx}>{n},&nbsp;&nbsp;</span>
                                else
                                    return <span key={idx}>{n}</span>
                            }
                        } else {
                            debugger;
                            const res = toppingMap[toppingOrderResult[idx]];
                            if (idx < resultCount)
                                return <span key={idx}>{res[0]},&nbsp;&nbsp;</span>
                            else
                                return <span key={idx}>{res[0]}</span>
                        }

                    })}
                </Col>
            </Row>
            {cartList && cartList.map((elem, idx) =>
                <div key={idx}>

                    <Row>
                        < Col sm="4">
                            <b>{elem.name}</b>
                            {elem.toppingResult && elem.toppingResult.length > 0 ?
                                <Col sm="12" >
                                    <span className="SmallFont">{t("Note")}:&nbsp;&nbsp;</span>
                                    {elem.toppingArray && elem.toppingArray.map((item, idx) => {
                                        const g = (toppingMap[item])[1];
                                        const n = (toppingMap[item])[0]
                                        // if (idx == 0)
                                        //     return <span>{t("Note")}:&nbsp;&nbsp;</span>
                                        debugger;
                                        if (g == 'G0') {
                                            if (elem.toppingResult[idx] == true) {
                                                if (idx != 0)
                                                    return <span className="SmallFont" key={idx}>,&nbsp;&nbsp;{n}</span>
                                                else
                                                    return <span className="SmallFont" key={idx}>{n}</span>
                                            }
                                        } else {
                                            const res = toppingMap[elem.toppingResult[idx]];
                                            if (idx != 0)
                                                return <span className="SmallFont" key={idx}>,&nbsp;&nbsp;{res[0]}</span>
                                            else
                                                return <span className="SmallFont" key={idx}>{res[0]}</span>
                                        }

                                    })}
                                </Col>
                                : null}
                        </Col>
                        <Col sm="2">
                            {elem.price}
                        &nbsp;

                        {elem.size == 1 && elem.isMultiple == true ? t("S") : null}
                            {elem.size == 2 && elem.isMultiple == true ? t("M") : null}
                            {elem.size == 3 && elem.isMultiple == true ? t("L") : null}
                            {elem.size == 4 && elem.isMultiple == true ? t("X") : null}

                        </Col>
                        <Col sm="2">
                            {elem.quantity}
                        </Col>
                        <Col sm="2">
                            {(elem.price * elem.quantity).toFixed(2)}
                        </Col>
                        <Col sm='2'>
                            <Link to='#!' onClick={e => addToOrder(e, elem, elem.price, elem.size)} className='flow-right'>
                                <MdAddCircle color='Primary' size='2rem' />
                            </Link>
                            {isQuantity(elem, elem.size) ?
                                <Link to='#!' onClick={e => removeFromOrder(e, elem, elem.size)} className=' flow-right'>
                                    <MdRemoveCircle color='Primary' size='2rem' />
                                </Link>
                                : null}
                        </Col>
                    </Row>

                </div>
            )}
            <hr />
            <Row>
                <Col sm='8'>
                    <b>{t("SubTotal")}:</b>
                </Col>
                <Col sm='4'>
                    {cartTotal.toFixed(2)}
                </Col>
            </Row>
            <Row>
                <Col sm='8'>
                    <b>{t("Tax")}:</b>
                </Col>
                <Col sm='4'>
                    {(cartTotal * taxRate / 100).toFixed(2)}
                </Col>
            </Row>
            <hr />
            <Row>
                <Col sm='8'>
                    <b>{t("Total")}:</b>
                </Col>
                <Col sm='4'>
                    {(cartTotal + (cartTotal * taxRate / 100)).toFixed(2)}
                </Col>
            </Row>


            <Row>
                <Col>
                    <Link to='#!' onClick={() => setIsOrder(true)} className=' flow-right'>
                        <MdArrowBack color='Black' size='3rem' />
                    </Link>
                </Col>
            </Row>
        </div>
    )
}
export default Cart
