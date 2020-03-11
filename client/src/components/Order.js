import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import axios from 'axios';
import { MdAddCircle, MdRemoveCircle, MdDone } from 'react-icons/md';

// import img1 from "../images/img7.jpg"
// import img1 from "../../../server/images/img3.jpg"
import {Form, Input, Row, Col, Button, FormGroup, Label, Card, CardImg, CardBody, CardLink, CardText, CardImgOverlay, CardFooter} from 'reactstrap';
import CategoryNav from './CatagoryNav';
import { Link } from 'react-router-dom';
function Order(props) {
    debugger;
    const restaurantId = props.restaurant_id;
    const [categoryList, setCategoryList] = useState([]);
    const [menuList, setMenuList] = useState([]);

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

    const fetchMenuList = (categoryId) => {
        debugger;
        axios.get('/api/menu/category', {params: {restaurantId: restaurantId, categoryId: categoryId}})
        .then(res => {
            debugger;
            setMenuList(res.data);
        })
        .catch()
         
    };

    const addToOrder = item => {
        console.log("add to order" + item.name);
    }

    const removeFromOrder = item => {
        console.log("remove from order" + item.name);
    }

    const dishCard = item => {
        return (
            <Col sm="4" key={item.id}>
                <Card> 
                    <CardImg top width="100%" src={item.image_path} alt="Card image cap" />
                    <CardBody className='text-left py-0 by-0 pl-0 bl-0'>
                     <Row>
                        <Col sm='4'>
                       <CardText className='d-inline bg-dark font-weight-bold text-light'>
                            ${item.price}
                        </CardText>
                        </Col>
                        <Col>
                    <Link onClick={() => addToOrder(item)} className='flow-right'> 
                        <MdAddCircle color='Primary' size = '2rem' /> 
                    </Link>

                    <Link onClick={() => removeFromOrder(item)} className=' flow-right'>
                        <MdRemoveCircle color='Primary' size = '2rem' />
                    </Link>   
                    </Col> 
                    <Col>
                    <i>
                        
                        <CardText className='font-weight-bold text-primary'>
                        <MdDone color='Primary' size = '2rem' /> 1
                        </CardText>

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
            <CategoryNav restaurantId = {restaurantId} fetchMenuList = {fetchMenuList}/>  
            <Row>
                {menuList.map(item => 
                    dishCard(item)         
                )}
            </Row>


        </div>
    );
}

export default Order;