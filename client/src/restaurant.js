import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import {
//     Form,
//     Input, 
//     InputGroupAddon,
//     Button
// } from 'reactstrap';  
function Restaurant(props) {
    // console.log("In Restaurant");
    const [node, setRoot] = useState ({
        name: '', 
        zipCode: '',
        state: ''
    })
    const [restaurantList, setRestaurantList] = useState([])
    const [bRestaurantList, setBRestaurantList] = useState(0)

    const showRestaurantList = () => {
       const lst = restaurantList.map((rest, idx) => <h2 key = {idx} >{rest.name}</h2>);
      //  console.log(node.restaurantList);
       setRestaurantList(lst);
    }
    useEffect(() => {
      // console.log("get List");
      // axios.get('https://jsonplaceholder.typicode.com/posts?userId=1')
      axios.get('/api/restaurant')
      // .then(res => res.json()), 
      .then(res => {
        // const d = res.data;
        debugger;
        setRestaurantList(res.data)
        console.log(restaurantList)
        // const d = res.data;
        // setRestaurantList(d.map(item => {restaurantList(...restaurantList, item)}));
        // setRestaurantList(res.data);
      })
      .catch( error => console.log(error));
    },[bRestaurantList])

    const handleAddRestaurant = () => {
        console.log("In handleAddRestaurant");
        fetch('/api/restaurant', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: node.name, zipCode: node.zipCode, state: node.state })
        })
        // .then(res => res.json())
          
        .then(res => {
          // console.log(res.data.json());
          invokeFetch();
          setRoot({ ...node, name: 'Enter Name', zipCode: '12345', state: 'CA' });
            
        });
    };

    const invokeFetch = () => {
      setBRestaurantList(~bRestaurantList)
    }
    const getRestaurantList = () =>  {
      debugger;
        console.log("get List action");
        // axios.get('https://jsonplaceholder.typicode.com/posts?userId=1')
        axios.get('/api/restaurant')
        // .then(res => {console.log(res)})
        .then(res => { 
          console.log(res)
          setRestaurantList(res.data)
          console.log(restaurantList)
          // console.log("ebd");
          // setRoot({...node, name: 'dd'});
          // setRoot({...node, restaurantList: [{name: 'c'}, {name: 'd'}] });
        })
        .catch( error => console.log("Error"))
      };
      

    return (
            <div>
                <form> 
                    <input 
                        type="text" 
                        value={node.name} 
                        onChange={e => setRoot({...node, name: e.target.value})}/>
                    <input type="text" value={node.zipCode} 
                        onChange={e => setRoot({...node, zipCode: e.target.value})}/>
                    <input type="text" value={node.state} 
                        onChange={e => setRoot({...node, state: e.target.value})}/>                  
                
                    <button type="button" onClick={handleAddRestaurant}>Add Restaurant</button>
                    <h2>root.name {JSON.stringify({ name: node.name, zipCode: node.zipCode, state: node.state })}</h2>
            </form>    
            <div>
                <h2>Restaurant List</h2>
                <ul>  
                  {restaurantList.map((item, idx) => (
                    <li key={idx}> {item.id} {item.name} 
                    </li>
                  ))}
                </ul>
            </div>
           </div>       
    );
}

export default Restaurant;