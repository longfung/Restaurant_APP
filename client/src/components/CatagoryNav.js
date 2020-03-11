import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {
    Nav,
    NavItem,
    Navbar,
    NavLink,
    NavbarBrand,
    Button,
    Jumbotron
  } from 'reactstrap';


function CategoryNav(props) {  
   debugger;
    const restaurantId = props.restaurantId;
    const fetchMenuList = props.fetchMenuList;
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
            {categoryList && categoryList.map((item, index) => (
            <Button key={item.id} onClick={() => fetchMenuList(item.id)}>{item.label}</Button>        
            ))};
        </Jumbotron>

   

      </div>
    )
}

export default CategoryNav; 

