import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {
    Row,
    Col,
    CardText,
    NavLink,
    NavbarBrand,
    Button,
    Jumbotron

  } from 'reactstrap';
  import {     MdShoppingCart} from 'react-icons/md';
  import { Link } from 'react-router-dom';


function CategoryNav(props) {  
   debugger;
    const restaurantId = props.restaurantId;
    const fetchMenuList = props.fetchMenuList;
    const isQuantity = props.isQuantity;
    const cartTotal = props.cartTotal;
    const cartList = props.cartList;
    const setIsOrder = props.setIsOrder;
    const [categoryList, setCategoryList] = useState([

    ])
    useEffect( () => {
        // const restaurantId = 45000
        console.log("in UseEffect");
        debugger;
        axios.get('/api/category', {params: {restaurant_id: props.restaurantId}})
        .then (res =>{
            res.data.map(item => ( 
                setCategoryList(prevState => ([...prevState, {id: item.id, label: item.category_name}]))
            ))
        })
        .catch( error => console.log(error));
    }, []);

    const setCategory = () => {

    }
    return (
      <div>

          <Jumbotron fluid className='my-0 py-1 bg-info w-100'>
            <Row>
              <Col sm="10">
            {categoryList && categoryList.map((item, index) => (
            <Button key={item.id} onClick={() => fetchMenuList(item.id)}>{item.label}</Button>        
            ))}

              </Col>
              <Col sm="2">
              <Link onClick={() => setIsOrder(false)} className='font-weight-bold text-Dark'>
                <MdShoppingCart color='gold' size = '2.2rem' /> ${cartTotal.toFixed(2)}
                </Link>
              </Col>
            </Row>

        </Jumbotron>
     </div>
    )
}

export default CategoryNav; 

