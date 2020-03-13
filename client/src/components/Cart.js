import React from 'react'
import { MdAddCircle, MdRemoveCircle, MdArrowBack } from 'react-icons/md';
import {Row, Col} from 'reactstrap';
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
    
    return (
        <div>
            {cartList && cartList.map(elem => 
            <div>
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
                    {elem.price * elem.quantity * 1.1}
                </Col>
                <Col sm='2'>
                    <Link onClick={() => addToOrder(elem)} className='flow-right'> 
                        <MdAddCircle color='Primary' size = '2rem' /> 
                    </Link>
                    {isQuantity(elem) ?
                    <Link onClick={() => removeFromOrder(elem)} className=' flow-right'>
                        <MdRemoveCircle color='Primary' size = '2rem' />
                    </Link>    
                    : null }
                </Col>           
                </Row>

                </div>
            )} 
                            <Row>

                    <Col>
                    <Link onClick={() => setIsOrder(true)} className=' flow-right'>
                        <MdArrowBack color='Black' size = '3rem' />
                    </Link>    
                  
                    </Col>
                </Row>
            </div>
    )
    
}

export default Cart
