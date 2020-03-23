import React, {useState, useEffect} from 'react';
import Cart from './Cart'
import Select from 'react-select';
import axios from 'axios';
import { MdAddCircle, MdRemoveCircle, MdDone } from 'react-icons/md';

// import img1 from "../images/img7.jpg"
// import img1 from "../../../server/images/img3.jpg"
import {Form, Input, Row, Col, Button, Label, Card, CardImg, CardBody, NavLink, CardText, CardImgOverlay, CardFooter} from 'reactstrap';
import CategoryNav from './CatagoryNav';
import { Link } from 'react-router-dom';
import NavTab from './NavTab';
function Order(props) {

    const restaurantId = props.restaurant_id;
    const userMode = props.userMode;
 
    const urlParams = new URLSearchParams(props.location.search);
    const restId = props.match.params.id;
    const tableId = urlParams.get('tableId')
    const restaurantId2 = urlParams.get('restaurantId');
    debugger;
    


    const [categoryList, setCategoryList] = useState([]);
    const [menuList, setMenuList] = useState([]);
    const [cartList, setCartList] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [isOrder, setIsOrder] = useState(true);

    useEffect( () => {
        // const restaurantId = 45000
        console.log("in UseEffect");
        debugger;
        axios.get('/api/category', {params: {restaurant_id: restaurantId}})
        .then (res =>{
            res.data.map(item => ( 
                setCategoryList(prevState => ([...prevState, {id: item.id, label: item.category_name}]))
            ))
        })
        .catch( error => console.log(error));
    }, []);

    useEffect( () => {
        calculateCartTotal();
    },[cartList])

    const fetchMenuList = (categoryId) => {
        debugger;
        axios.get('/api/menu/category', {params: {restaurantId: restaurantId, categoryId: categoryId}})
        .then(res => {
            debugger;
            setMenuList(res.data);
        })
        .catch()
         
    };

    const addToOrder = (event, item) => {
        
        event.preventDefault();
        event.stopPropagation();

        let bRes = event.isDefaultPrevented();
        console.log("add to order " + bRes);
        let bFound = false;
        // search dish has been ordered yet
        const nCartList = cartList.filter(elem => {
            if (elem.id === item.id) {
                bFound = true;
                elem.quantity++;
                return elem;
            }
            return elem;
        });
        if (!bFound) {
            const tmpCart = {
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: 1
            }
            setCartList([...nCartList, tmpCart]);
        } else {
            setCartList([...nCartList]);
        }
        return false;
    }
 
    const isQuantity = item => {
        let bResult = false;
        for (let i = 0; i < cartList.length; i++) {
            if (cartList[i].id === item.id) {
                bResult = cartList[i].quantity > 0;
                break;
            };  
        }
        return bResult;
    }

    const calculateCartTotal = () => {
        let sum = 0;
        for (let i = 0; i < cartList.length; i++) {
            if (cartList[i].quantity !== 0) {
                sum += cartList[i].quantity * cartList[i].price;
            };  
        }
        sum += sum * 0.1
        setCartTotal(sum);
    }

    const getQuantity = item => {
        var q = 0;
        for (let i = 0; i < cartList.length; i++) {
            if (cartList[i].id === item.id) {
                q = cartList[i].quantity;
                break;
            };  
        };
        if (q != 0) {
            return (
                <CardText className='font-weight-bold text-primary'>
                <MdDone color='Primary' size = '2rem' /> {q}
                </CardText>
            )
        }
    }

    const removeFromOrder = (event, item) => {
        // search dish has been ordered yet
        event.preventDefault();
        
        const nCartList = cartList.filter(elem => {
            if (elem.id === item.id) {
                elem.quantity--;
                if (elem.quantity !== 0)
                    return elem;
                else
                    return null;
            }
            return elem;
        });
        setCartList([...nCartList]);
    }

    const dishCard = item => {
        return (
            <Col sm="4" key={item.id}>
                <Card> 
                    <CardImg top width="100%" className="h-100 d-inline-block" src={item.image_path} alt="Card image cap" />
                    <CardBody className='text-left py-0 by-0 pl-0 bl-0'>
                     <Row>
                        <Col sm='4'>
                       <CardText className='d-inline bg-dark font-weight-bold text-light'>
                            ${item.price}
                        </CardText>
                        </Col>
                        <Col>
                    <Link to='#!' onClick={ e => addToOrder(e, item)} className='flow-right'> 
                        <MdAddCircle color='Primary' size = '2rem' /> 
                    </Link>
                    {isQuantity(item) ?
                    <Link to='#!' onClick={ e => removeFromOrder(e, item)} className=' flow-right'>
                        <MdRemoveCircle color='Primary' size = '2rem' />
                    </Link>   
                    : null }
                    </Col> 
                    <Col>
                    <i>
                      {getQuantity(item)}
                     </i>   
                    </Col> 
                   </Row>
                   </CardBody>
                   <CardBody className='text-left pt-0 bt-0 pl-0 bl-0'>
                        <CardText className='font-weight-bold'>
                            {item.name}
                        </CardText>

                    </CardBody>
                </Card>         
            </Col>        
        ) 
    }

    return (
        <div>
            {userMode == 2 ?
             <NavTab />
            : null }
            { isOrder ?
            <div>
            <CategoryNav restaurantId = {restaurantId} fetchMenuList = {fetchMenuList} cartTotal = {cartTotal} setIsOrder={setIsOrder}/>  
            <Row>
                {menuList.map(item => 
                    dishCard(item)         
                )}
            </Row>
            </div>
            : <Cart addToOrder = {addToOrder} removeFromOrder = {removeFromOrder} cartTotal = {cartTotal} isQuantity = {isQuantity} cartList={cartList} setIsOrder = {setIsOrder}/>
            }

        </div>
    );
}

export default Order;