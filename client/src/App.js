import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "reactstrap";

// import Weather from './Weather';
import Home from "./components/Home";
import Restaurant from "./components/Restaurant";
import Menu from "./components/Menu";
import Category from "./components/Category";
import Topping from "./components/Topping";
import Order from "./components/Order";
import Queue from "./components/Queue";
import QueueA from "./components/QueueA";
import Customer from "./components/Customer";
import Login from "./components/Login";
import User from "./components/User";
import EntityT from "./components/EntityT";
import MessageBar from "./components/MessageBar";
import { StateProvider, store } from "./components/Store";
// import MyProvider from './components/MyProvider';
// import MyContext from './components/MyProvider';
// 2 Guest ordering mode, 1 Admin setup mode

export const ShareContext = React.createContext();

function App(props) {
  //   debugger;
  //   let lPath = process.cwd();
  //   lPath = __dirname + "dog.png";
  debugger;
  const shareContext = useContext(store);
  // const restaurantId =
  //   shareContext.state.restaurant !== null
  //     ? shareContext.state.restaurant.id
  //     : null;

  const [userMode, setUserMode] = useState(0);
  const [ownerId, setOwnerId] = useState(0);
  const [restaurantRoot, setRestaurantRoot] = useState({}); // nessage has two items as message and status - 0 nothig, 1 info, 2 error
  const [message, setMessage] = useState({
    status: 0,
    msg: "Error",
  });

  const resetMessageBar = () => {
    setMessage({
      status: 0,
      msg: "",
    });
  };
  const mainBody = () => {
    return (
      <div>
        <Router>
          {message.status != 0 ? (
            <MessageBar message={message} resetMessageBar={resetMessageBar} />
          ) : null}

          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Home
                  {...props}
                  setUserMode={setUserMode}
                  setOwnerId={setOwnerId}
                />
              )}
            />
            <Route
              path="/restaurant"
              render={(props) => (
                <Restaurant {...props} setMessage={setMessage} />
              )}
            />
            <Route
              path="/menu"
              render={(props) => <Menu {...props} setMessage={setMessage} />}
            />
            <Route
              path="/category"
              render={(props) => (
                <Category {...props} setMessage={setMessage} />
              )}
            />
            <Route
              path="/topping"
              render={(props) => (
                <Topping {...props} setMessage={setMessage} />
              )}
            />
            <Route
              exact
              path="/order/:id"
              render={(props) => <Order {...props} setMessage={setMessage} />}
            />
            <Route
              exact
              path="/order"
              render={(props) => <Order {...props} setMessage={setMessage} />}
            />
            <Route
              exact
              path="/queue"
              render={(props) => <Queue {...props} setMessage={setMessage} />}
            />
            <Route
              exact
              path="/queueA"
              render={(props) => <QueueA {...props} setMessage={setMessage} />}
            />
            <Route
              exact
              path="/customer"
              render={(props) => <Customer {...props} setMessage={setMessage} />}
            />            <Route
              path="/Login"
              render={(props) => <Login {...props} setMessage={setMessage} />}
            />
            <Route
              path="/User"
              render={(props) => <User {...props} setMessage={setMessage} />}
            />
            <Route
              path="/EntityT"
              render={(props) => <EntityT {...props} setMessage={setMessage} />}
            />
          </Switch>
        </Router>
      </div>
    );
  };

  return (
    // <div>
    //   <h1>Hello</h1>
    //   <p>THis is line test</p>
    // </div>

    <StateProvider>
      <Container className="themed-container" fluid={true}>
        {mainBody()}
      </Container>
    </StateProvider>
  );
}

export default App;
