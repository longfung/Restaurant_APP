import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import {
    Row,
    Col,
    CardText,
    NavLink,
    NavbarBrand,
    Button,
    Jumbotron,
    InputGroup

  } from 'reactstrap';
  import {     MdShoppingCart} from 'react-icons/md';
  import { Link } from 'react-router-dom';
  import { store} from './Store';




function CategoryNav(props) {  
   debugger;
    const shareContext =  useContext(store);
    const restaurant = shareContext.state.restaurant;
    // const restaurant = props.restaurant;
    const restaurantId = restaurant.id;
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
        axios.get('/api/category', {params: {restaurant_id: restaurantId}})
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
                <Button onClick={() => fetchMenuList('')}>All Category</Button> 
                {categoryList && categoryList.map((item, index) => (
                  <Button key={item.id} onClick={() => fetchMenuList(item.id)}>{item.label}</Button>        
                  ))}
              </Col>
              <Col sm="2">
              <Link to='#!' onClick={() => setIsOrder(false)} className='font-weight-bold text-Dark'>
                <MdShoppingCart color='gold' size = '2.2rem' /> ${cartTotal.toFixed(2)}
                </Link>
              </Col>
            </Row>

        </Jumbotron>
     </div>
    )
}

export default CategoryNav; 

