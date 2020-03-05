import React, {useState, useEffect}  from 'react';


import {
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Row,
  Col,
  Input,
  InputGroup,
  FormGroup,
  InputGroupAddon,
  Button,
  Jumbotron,
  NavItem,
  NavLink
} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


// import Weather from './Weather';
import Restaurant from './components/Restaurant';
import Menu from './components/Menu';
import Category from './components/Category';
import NavTab from './components/NavTab';
// import MyProvider from './components/MyProvider';
// import MyContext from './components/MyProvider';

function App() {

    return (
      <Container fluid >      
      <Router>

    
        <Jumbotron>

            <NavTab />
            <Switch>
              <Route path='/restaurant' component={Restaurant} />
              <Route path='/menu' 
                    render={(props) => <Menu {...props} restaurant_id={45000} />}
              />
              <Route path='/category' 
                    render={(props) => <Category {...props} restaurant_id={45000} />} 
              />            
            </Switch>       

        </Jumbotron>

    </Router>
    </Container>          
    //     <Row>
    //       <Col>
    //        <Jumbotron>
    //           <h1 className="display-3">MyWeather</h1>
    //           <p className="lead">The current weather for your favorite cities!</p>
    //         <InputGroup>
    //           <Input  
    //             placeholder="New city name..."
    //             value={this.state.newCityName}
    //             onChange={this.handleInputChange}
    //           />
    //           <InputGroupAddon addonType="append">
    //             <Button color="primary" onClick={this.handleAddCity}>Add City</Button>
    //           </InputGroupAddon>

    //         </InputGroup>
    // 
            // <Restaurant/>
            // <Menu />
            // <InputGroup> 
    //           <Input>
    //             placeholder="New restaurant name..."
    //             value={this.state.newRestaurantName}
    //             onChange={this.handleInputChange}
    //           />
    //           <Restaurant/>
    //           <InputGroupAddon addonType="append">
    //             <Button color="primary" onClick={this.handleAddRestaurant}>Add restaurant</Button>
    //           </InputGroupAddon>

    //         </InputGroup>            

    //       </Jumbotron>
 
    //       </Col>
    //     </Row>
    //     <Row>
    //       <h1 className="display-5">Current Weather</h1>
    //       <FormGroup>
    //         <Input type="select" onChange={this.handleChangeCity}>
    //           { this.state.cityList.length === 0 && <option>No cities added yet.</option> }
    //           { this.state.cityList.length > 0 && <option>Select a city.</option> }
    //           { this.state.cityList.map((city, i) => <option key={i}>{city}</option>) }
    //         </Input>
    //       </FormGroup> 
    //     </Row>
    //     <Weather data={this.state.weather}/>
      // </Container>
    // ); */
    )
}

export default App;
