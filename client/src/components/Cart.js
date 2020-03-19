import React from 'react'
import { MdAddCircle, MdRemoveCircle, MdArrowBack } from 'react-icons/md';
import {Row, Col, NavLink} from 'reactstrap';
import { Link } from 'react-router-dom';
function Cart(props) {
    // debugger;
    // const newProps = props.location.cartProps;
    // console.log("Here" + JSON.stringify(newProps));
    const cartList = props.cartList;
    const isQuantity = props.isQuantity;
    const addToOrder = props.addToOrder;
    const removeFromOrder = props.removeFromOrder;
    const setIsOrder = props.setIsOrder;
    const cartTotal = props.cartTotal;
    
    return (
        <div>
            {cartList && cartList.map(elem => 
            <div key={elem.name}>
                <Row>
                           < Col sm="4">
                    {elem.name}
                </Col>
                <Col sm = "2">
                    {elem.price}
                </Col>
                <Col sm="2">
                    {elem.quantity}
                </Col>
                <Col sm="2">
                    {(elem.price * elem.quantity * 1.).toFixed(2)}
                </Col>
                <Col sm='2'>
                    <Link to='#!' onClick={ e => addToOrder(e, elem)} className='flow-right'> 
                        <MdAddCircle color='Primary' size = '2rem' /> 
                    </Link>
                    {isQuantity(elem) ?
                    <Link to='#!' onClick={ e => removeFromOrder(e, elem)} className=' flow-right'>
                        <MdRemoveCircle color='Primary' size = '2rem' />
                    </Link>    
                    : null }
                </Col>           
                </Row>

                </div>
            )} 
            <hr />
            <Row>
                <Col sm = '8'>
                    <p>Total:</p>
                </Col>
                <Col sm='4'>
                    {cartTotal.toFixed(2)}
                </Col>
            </Row>
            <Row>
                <Col>
                    <Link to='#!' onClick={() => setIsOrder(true)} className=' flow-right'>
                        <MdArrowBack color='Black' size = '3rem' />
                    </Link>                   
                </Col>
            </Row>
            </div>
    )    
}
export default Cart
