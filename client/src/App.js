import React from 'react';


// import {
//   Container,
//   Navbar,
//   NavbarBrand,
//   Row,
//   Col,
//   Input,
//   InputGroup,
//   FormGroup,
//   InputGroupAddon,
//   Button,
//   Jumbotron
// } from 'reactstrap';

// import Weather from './Weather';
import Restaurant from './restaurant';
import Menu from './menu';

function App() {
  // constructor(props) {
  //   super(props);
  
  //   this.state = {
  //     weather: null,
  //     cityList: [],
  //     newCityName: '',
  //     restaurantList: [],
  //     newRestaurantName: ''
  //  };
  // }

  // getCityList = () => {
    // fetch('/api/cities')
    // .then(res => res.json())
    // .then(res => {
    //   var cityList = res.map(r => r.city_name);
    //   this.setState({ cityList });
    // });
  // };

  // getRestaurantList = () => {
  //   fetch('/api/restaurant')
  //   .then(res => res.json())
  //   .then(res => {
  //     var restaurantList = res.map(r => r.name);
  //     this.setState({ restaurantList });
  //   });
  // };


  // handleInputChange = (e) => {
  //   // this.setState({ newCityName: e.target.value });
  //   this.setState({ newRestaurantName: e.target.value });
  // };

  // handleAddCity = () => {
  //   fetch('/api/cities', {
  //     method: 'post',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ city: this.state.newCityName })
  //   })
  //   .then(res => res.json())
      
  //   .then(res => {
  //     this.getCityList();
  //     this.setState({ newCityName: '' });
  //   });
  // };
  
  // handleAddRestaurant = () => {
  //   fetch('/api/restaurant', {
  //     method: 'post',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ name: this.state.newRestaurantName })
  //   })
  //   .then(res => res.json())
      
  //   .then(res => {
  //     this.getRestaurantList();
  //     this.setState({ newRestaurantName: '' });
  //   });
  // };


  // getWeather = (city) => {
  //   fetch(`/api/weather/${city}`)
  //   .then(res => res.json())
  //   .then(weather => {
  //     console.log(weather);
  //     this.setState({ weather });
  //   });
  // }

  // handleChangeCity = (e) => {
  //   this.getWeather(e.target.value);
  // }

  // componentDidMount () {
  //   // this.getRestaurantList();
  //   // this.getCityList();
  // }

   
    return (
    //   <Container fluid className='centered'>
    //     <Navbar dark color="dark">
    //       <NavbarBrand href="/">MyWeather</NavbarBrand>
    //     </Navbar>
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
            <Menu />
            // <InputGroup>
    //           <Input   */}
    //             placeholder="New restaurant name..."
    //             value={this.state.newRestaurantName}
    //             onChange={this.handleInputChange}
    //           />
    //           {/* <Restaurant/> */}
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
    //   </Container>
    );
}

export default App;
