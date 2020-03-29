import React, {useState, useReducer}  from 'react';
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
import {StateProvider} from './components/Store';
// import MyProvider from './components/MyProvider';
// import MyContext from './components/MyProvider';
// 2 Guest ordering mode, 1 Admin setup mode 

export const ShareContext = React.createContext() 

function App(props) {
//   debugger;  
//   let lPath = process.cwd();
//   lPath = __dirname + "dog.png";

  const [userMode, setUserMode] = useState(0);
  const [ownerId, setOwnerId] = useState(0);      
  const [restaurantRoot, setRestaurantRoot] = useState({});  // nessage has two items as message and status - 0 nothig, 1 info, 2 error
  const [message, setMessage] = useState({
        status: 0,
        msg: 'Error'
  });

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

          <Switch>
            <Route exact path='/' 
                  render={(props) => <Home {...props} setUserMode = {setUserMode} setOwnerId = {setOwnerId} />}
            />
            <Route path='/restaurant'
                  render={(props) => <Restaurant {...props} setMessage={setMessage}/>}
            />
            <Route path='/menu' 
                  render={(props) => <Menu {...props} restaurant_id={restaurantRoot.id} />}
            />
            <Route path='/category' 
                  render={(props) => <Category {...props} restaurant_id={restaurantRoot.id} />} 
            />       
            <Route exact path='/order/:id'
                  render={(props) => <Order {...props} restaurant={restaurantRoot} userMode={1} />} 
            />   
            <Route exact path='/order'
                  render={(props) => <Order {...props} restaurant={restaurantRoot} userMode={2} />} 
            />   
            <Route path='/Login'
                  render={(props) => <Login {...props} setUserMode = {setUserMode} setMessage={setMessage} />} 
            />   
            <Route path='/User'
                  render={(props) => <User {...props} setUserMode = {setUserMode} setOwnerId={setOwnerId} /> }
            />
          </Switch>       
    </Router>
    </div>
    )
  } 

  return (
      <StateProvider>

            <Container className="themed-container" fluid={true} >    
                  {mainBody()}
            
            </Container>     
      </StateProvider>
    )
}

export default App;
