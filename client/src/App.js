import React, {useState, useEffect}  from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {
  Container
} from 'reactstrap';




// import Weather from './Weather';
import Home from './components/Home';
import Restaurant from './components/Restaurant';
import Menu from './components/Menu';
import Category from './components/Category';
import NavTab from './components/NavTab';
import Order from './components/Order';
import Login from './components/Login';
import User from './components/User';
// import MyProvider from './components/MyProvider';
// import MyContext from './components/MyProvider';
// 0 Guest ordering mode, 1 Admin setup mode 


function App(props) {
  const [userMode, setUserMode] = useState(0);
  const [userId, setUserId] = useState(0);      
  const [pathId, setPathId] = useState('')
  const getPath = (props) => {
    debugger;
    setPathId (props.match.params.id);
    return null;
  }

  const mainBody = () => {
    return (
      <div>
      <Router> 
          <Route path="/:id" component={getPath} />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/restaurant' component={Restaurant} />
            <Route path='/menu' 
                  render={(props) => <Menu {...props} restaurant_id={45000} />}
            />
            <Route path='/category' 
                  render={(props) => <Category {...props} restaurant_id={45000} />} 
            />       
            <Route exact path='/order/:id'
                  render={(props) => <Order {...props} restaurant_id={45000} userMode={1} />} 
            />   
            <Route exact path='/order'
                  render={(props) => <Order {...props} restaurant_id={45000} userMode={2} />} 
            />   
            <Route path='/Login'
                  render={(props) => <Login {...props} restaurant_id={45000} setUserMode = {setUserMode}/>} 
            />   
            <Route path='/User'
                  render={(props) => <User {...props} setUserMode = {setUserMode}/> }
            />
          </Switch>       
    </Router>
    </div>
    )
  }
  return (
      <Container className="themed-container" fluid={true} >    

      {mainBody()}
      
  
    </Container>          
    )
}

export default App;
