import React, {useState, useEffect}  from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {
  Container
} from 'reactstrap';




// import Weather from './Weather';
import Restaurant from './components/Restaurant';
import Menu from './components/Menu';
import Category from './components/Category';
import NavTab from './components/NavTab';
import Order from './components/Order';
import Cart from './components/Cart';
// import MyProvider from './components/MyProvider';
// import MyContext from './components/MyProvider';

function App() {
    return (
      <Container className="themed-container" fluid={true} >      
        <Router>
        <NavTab />
            <Switch>

              <Route path='/restaurant' component={Restaurant} />
              <Route path='/menu' 
                    render={(props) => <Menu {...props} restaurant_id={45000} />}
              />
              <Route path='/category' 
                    render={(props) => <Category {...props} restaurant_id={45000} />} 
              />       
              <Route path='/order'
                    render={(props) => <Order {...props} restaurant_id={45000} />} 
              />   

              <Route path='/Cart'
                    render={(props) => <Cart {...props} restaurant_id={45000} />} 
              />            
     
            </Switch>       
      </Router>
    </Container>          
    )
}

export default App;
