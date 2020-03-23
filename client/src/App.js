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
import MessageBar from './components/MessageBar';
// import MyProvider from './components/MyProvider';
// import MyContext from './components/MyProvider';
// 2 Guest ordering mode, 1 Admin setup mode 


function App(props) {
  const [userMode, setUserMode] = useState(0);
  const [ownerId, setOwnerId] = useState(0);      
  const [pathId, setPathId] = useState('');
  const [restaurant, setRestaurant] = useState({});  // nessage has two items as message and status - 0 nothig, 1 info, 2 error
  const [message, setMessage] = useState({
        status: 0,
        msg: 'Error'
  });
  const getPath = (props) => {
    setPathId (props.match.params.id);
    return null;
  }

  const resetMessageBar = () => {
        setMessage({
              status: 0,
              msg: ''
        })
  }
  const mainBody = () => {
    return (
      <div>
      <Router> 
            {message.status != 0 ?
            <MessageBar message={message} resetMessageBar={resetMessageBar}/>
            : null}
            <Route path="/:id" component={getPath} />
          <Switch>
            <Route exact path='/' 
                  render={(props) => <Home {...props} setUserMode = {setUserMode} setOwnerId = {setOwnerId} />}
            />
            <Route path='/restaurant'
                  render={(props) => <Restaurant {...props} restaurant_id={45000} />}
            />
            <Route path='/menu' 
                  render={(props) => <Menu {...props} restaurant_id={45000} />}
            />
            <Route path='/category' 
                  render={(props) => <Category {...props} restaurant_id={45000} />} 
            />       
            <Route exact path='/order/:id'
                  render={(props) => <Order {...props} restaurant_id={restaurant.id} userMode={1} />} 
            />   
            <Route exact path='/order'
                  render={(props) => <Order {...props} restaurant_id={45000} userMode={2} />} 
            />   
            <Route path='/Login'
                  render={(props) => <Login {...props} setOwnerId={setOwnerId} setUserMode = {setUserMode} setRestaurant = {setRestaurant} setMessage={setMessage} />} 
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
