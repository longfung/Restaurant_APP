import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import NavTab from './NavTab';
import { Form, Input, Row, Col, Button, FormGroup, Label } from 'reactstrap';
// import {MyContext} from './MyContext';

// import {
//     Form,
//     Input, 
//     InputGroupAddon,
//     Button
// } from 'reactstrap';  
function Category(props) {
    // console.log("In Restaurant");
    const restaurantId = props.restaurant_id  
    // const restId = useContext(MyContext.restaurantId);
    // console.log(restaurantId + " : ");
    // debugger;
    const [node, setNode] = useState ({
        id: '',
        category_name: '', 
        category_description: '',
        restaurant_id: restaurantId
    })
    const [categoryList, setCategoryList] = useState([])
 
    // const showCategoryList = () => {
    //    const lst = cagegoryList.map((rest, idx) => <h2 key = {idx} >
    //        {rest.category_name}
           
    //        </h2>);
    //   //  console.log(node.restaurantList);
    //    setCategoryList(lst);
    // }
    useEffect(() => {
      // console.log("get List");
      // axios.get('https://jsonplaceholder.typicode.com/posts?userId=1')
     axios.get('/api/category', {params:{restaurant_id: restaurantId}})
      // .then(res => res.json()), 
      .then(res => {
        // const d = res.data;
        // debugger;
        setCategoryList(res.data)
        // console.log(restaurantList)
        // const d = res.data;
        // setRestaurantList(d.map(item => {restaurantList(...restaurantList, item)}));
        // setRestaurantList(res.data);
      })
      .catch( error => console.log(error));
    },[])

    const handleAddCategory = () => {
        if (node.id != '') {
          handleUpdateCategory();
          return;
        }
        let data = JSON.stringify({ 
            category_name: node.category_name, 
            category_description: node.category_description, 
            restaurant_id: node.restaurant_id }); 
          
        axios.post('/api/category', data, {
                headers: { 'Content-Type': 'application/json' }
            } )
        .then(res => {
          // console.log(res.data.json());
          getCategoryList();
          setNode({ ...node, id: '', category_name: '', category_description: '', restaurant_id: restaurantId});          
        });
    };

    const handleUpdateCategory = () => {
      let data = JSON.stringify({ 
          id: node.id,
          category_name: node.category_name, 
          category_description: node.category_description, 
          restaurant_id: node.restaurant_id }); 
        
      axios.put('/api/category', data, {
              headers: { 'Content-Type': 'application/json' }
          } )
      .then(res => {
        // console.log(res.data.json());
        getCategoryList();
        setNode({ ...node, id: '', category_name: '', category_description: '', restaurant_id: restaurantId });          
      });
  };

    const getCategoryList = () =>  {
      // debugger;
        // console.log("get List action");
        // axios.get('https://jsonplaceholder.typicode.com/posts?userId=1')
        axios.get('/api/category', {params:{restaurant_id: 45000}})
        // .then(res => {console.log(res)})
        .then(res => { 
          console.log(res)
          setCategoryList(res.data) 
          // console.log("ebd");
          // setRoot({...node, name: 'dd'});
          // setRoot({...node, restaurantList: [{name: 'c'}, {name: 'd'}] });
        })
        .catch( error => console.log("Error"))
    };

    const setEdit = (obj) => {
        debugger;
        setNode(obj);
    }

    const setDelete = (obj) => {
      axios.delete('/api/category', {params:{id: obj.id}})
      .then(res => {
          // console.log(res.data.json());
          getCategoryList();
          setNode({ ...node, category_name: '', category_description: '', restaurant_id: 45000 });          
        })
      .catch( err => console.log(err.error))        
    }

    return (
      <div>
          <NavTab />
          <Form>
            <Row form >
              <Col md={1}>
                <FormGroup>
                  <Label for="catagoryName"> Category Name</Label>
                  <Input 
                  type="text" 
                  id="categoryName"
                  value={node.category_name} 
                  onChange={e => setNode({...node, category_name: e.target.value})}/>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={1}>
                <FormGroup>
                  <Label for="categoryDescritpion">Category Description</Label>
                  <Input 
                    type="text" 
                    id="categoryDescription"
                    value={node.category_description} 
                    onChange={e => setNode({...node, category_description: e.target.value})}/>   
                </FormGroup>
              </Col>
             </Row>
            <Button id="saveButton" onClick={handleAddCategory}>Save</Button>
            

              
      </Form>    
      <hr></hr>
      <div>
          <h2>Category List</h2>
          <ul> 
            {categoryList.map((item, idx) => (
              <Row key={idx}> 
                <Col sm={4}>
                  {item.category_name}
                </Col>
                <Col sm={6}>
                  {item.category_description}
                </Col>
                <Col sm={1}>
                 <Button onClick={() => setEdit(item)}>Edit</Button>
                </Col>
                <Col sm={1}>
                <Button onClick={() => setDelete(item)}>Delete</Button>
                </Col>

              </Row>
            ))}
          </ul>
      </div>
      </div>       
    );
}

export default Category;