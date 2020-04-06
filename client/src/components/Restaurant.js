import React, { useState, useEffect, useContext } from "react";
import NavTab from "./NavTab";
import axios from "axios";
import access from "../util/access";
import { Form, Input, FormGroup, Row, Col, Button, Label } from "reactstrap";
import { store } from "./Store";

function Restaurant(props) {
  // console.log("In Restaurant");
  debugger;
  const shareContext = useContext(store);
  const userId = shareContext.state.ownerId;

  // const setRestaurantRoot = props.setRestaurantRoot;
  // const userId = props.location.state.ownerId;
  // const userId = props.ownerId.ownerId;
  const setMessage = props.setMessage;
  const [restaurant, setRestaurant] = useState({
    id: "",
    name: "",
    address: "",
    city: "",
    zipCode: "",
    state: "",
    taxRate: 9.25,
    ownerId: userId
  });

  useEffect(() => {
    // console.log("get List");
    // axios.get('https://jsonplaceholder.typicode.com/posts?userId=1')
    if (shareContext.state.restaurant) {
      setRestaurant(shareContext.state.restaurant);
      return;
    }

    const promise1 = access.fetchRestuarantByOwnerId(userId);
    Promise.resolve(promise1)
      .then(res1 => {
        const rest = res1.data;
        setRestaurant({
          id: rest.id,
          name: rest.name,
          taxRate: rest.tax_rate,
          address: rest.address,
          city: rest.city,
          zipCode: rest.zip_code,
          state: rest.state,
          ownerId: userId
        });
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    shareContext.dispatch({ type: "setRestaurant", value: restaurant });
  }, [restaurant]);

  const handlePostRestaurant = () => {
    if (restaurant.id != "") {
      handleUpdateRestaurant();
    } else {
      handleAddRestaurant();
    }
  };

  const handleAddRestaurant = () => {
    debugger;
    const promise1 = access.addRestaurant(restaurant);
    Promise.resolve(promise1)
      .then(res => {
        // console.log("add!!");
        // setRestaurantRoot(restaurant);
        shareContext.dispatch({ setRestaurant: restaurant });
        let m = restaurant.name + " is created Successfully !!!";
        setMessage({
          status: 200,
          msg: m
        });
      })
      .catch(err => {
        console.log(err);
      });
    // console.log("In handleAddRestaurant");
    // fetch('/api/restaurant', {
    //   method: 'post',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name: node.name, zipCode: node.zipCode, state: node.state })
    // })
    // // .then(res => res.json())

    // .then(res => {
    //   // console.log(res.data.json());
    //   invokeFetch();
    //   setRoot({ ...node, name: 'Enter Name', zipCode: '12345', state: 'CA' });

    // });
  };

  const handleUpdateRestaurant = () => {
    const promise1 = access.updateRestaurant(restaurant);
    Promise.resolve(promise1)
      .then(res => {
        // console.log("update!!");
        // setRestaurantRoot(restaurant);
        shareContext.dispatch({ setRestaurant: restaurant });
        let m = restaurant.name + " is updated Successfully !!!";
        setMessage({
          status: 200,
          msg: m
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <NavTab {...props} />
      <Form>
        <Row form>
          <Col sm="6">
            <FormGroup>
              <Label for="name">Restaurant Name</Label>
              <Input
                type="Text"
                id="name"
                value={restaurant.name}
                onChange={e =>
                  setRestaurant({ ...restaurant, name: e.target.value })
                }
              />
            </FormGroup>
          </Col>
          <Col sm="6">
            <FormGroup>
              <Label for="taxRate">Tax Rates</Label>
              <Input
                type="Text"
                id="taxRate"
                value={restaurant.taxRate}
                onChange={e =>
                  setRestaurant({ ...restaurant, taxRate: e.target.value })
                }
              />
            </FormGroup>
          </Col>
          <Col xs="6" sm="6">
            <FormGroup>
              <Label for="address">Address</Label>
              <Input
                type="text"
                id="address"
                value={restaurant.address}
                onChange={e =>
                  setRestaurant({ ...restaurant, address: e.target.value })
                }
              />
            </FormGroup>
          </Col>
          <Col xs="6" sm="6">
            <FormGroup>
              <Label for="city">City</Label>
              <Input
                type="text"
                id="city"
                value={restaurant.city}
                onChange={e =>
                  setRestaurant({ ...restaurant, city: e.target.value })
                }
              />
            </FormGroup>
          </Col>
          <Col sm="6">
            <FormGroup>
              <Label for="state">State</Label>
              <Input
                type="Text"
                id="state"
                value={restaurant.state}
                onChange={e =>
                  setRestaurant({ ...restaurant, state: e.target.value })
                }
              />
            </FormGroup>
          </Col>
          <Col sm="6">
            <FormGroup>
              <Label for="zipCode">Zip Code</Label>
              <Input
                type="Text"
                id="zipCode"
                value={restaurant.zipCode}
                onChange={e =>
                  setRestaurant({ ...restaurant, zipCode: e.target.value })
                }
              />
            </FormGroup>
          </Col>
          <Button type="button" onClick={handlePostRestaurant}>
            Save
          </Button>
        </Row>
      </Form>
    </div>
  );
}

export default Restaurant;
