import React from 'react'
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

    return (
        <div>
            {cartList && cartList.map((elem, idx) =>
                <div key={idx}>
                    <Row>
                        < Col sm="4">
                            {elem.name}
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
                    <p>{t("SubTotal")}:</p>
                </Col>
                <Col sm='4'>
                    {cartTotal.toFixed(2)}
                </Col>
            </Row>
            <Row>
                <Col sm='8'>
                    <p>{t("Tax")}:</p>
                </Col>
                <Col sm='4'>
                    {(cartTotal * taxRate / 100).toFixed(2)}
                </Col>
            </Row>
            <hr />
            <Row>
                <Col sm='8'>
                    <p>{t("Total")}:</p>
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
