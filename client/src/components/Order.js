import React, { useState, useEffect, useContext } from "react";
import Cart from "./Cart";
import Select from "react-select";
import { MdAddCircle, MdRemoveCircle, MdDone } from "react-icons/md";
import access from '../util/access';

// import img1 from "../images/img7.jpg"
// import img1 from "../../../server/images/img3.jpg"
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  Label,
  Card,
  CardImg,
  CardBody,
  NavLink,
  CardText,
  CardImgOverlay,
  CardFooter,
} from "reactstrap";
import CategoryNav from "./CatagoryNav";
import { Link } from "react-router-dom";
import NavTab from "./NavTab";
import { store } from "./Store";
import "../index.css";

function Order(props) {
  const shareContext = useContext(store);
  debugger;
  const restaurant = shareContext.state.restaurant;
  const restaurantId = restaurant != null ? restaurant.id : null;
  if (!restaurantId) {
    props.history.push("/Login");
  }
  const userMode = shareContext.state.userMode;
  // const restaurant = shareContext.state.restaurant;
  //   const restaurantId = restaurant.id;
  //   const taxRate = restaurant.tax_rate;
  // const userMode = props.userMode;

  // const urlParams = new URLSearchParams(props.location.search);
  // const restId = props.match.params.id;
  // const tableId = urlParams.get('tableId')
  // const restaurantId2 = urlParams.get('restaurantId');
  // debugger;

  const [categoryList, setCategoryList] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [isOrder, setIsOrder] = useState(true);

  useEffect(() => {
    // const restaurantId = 45000
    console.log("in UseEffect");
    debugger;
    // axios
    //   .get("/api/category", { params: { restaurant_id: restaurantId } })
    const promise1 = access.fetchCategoryByRestaurantId(restaurantId);
    Promise.resolve(promise1)
      .then((res) => {
        res.data.map((item) =>
          setCategoryList((prevState) => [
            ...prevState,
            { id: item.id, label: item.category_name },
          ])
        );
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    calculateCartTotal();
  }, [cartList]);

  const fetchMenuList = (categoryId) => {
    debugger;
    let promise1 = '';
    if (categoryId)
      promise1 = access.fetchMenuByRestaurantCategoryId(restaurantId, categoryId, shareContext.state.locale);
    else
      promise1 = access.fetchMenuByRestaurantId(restaurantId, shareContext.state.locale)
    Promise.resolve(promise1)
      // axios
      //   .get("/api/menu/category", {
      //     params: { restaurantId: restaurantId, categoryId: categoryId },
      //   })
      .then((res) => {
        debugger;
        setMenuList(res.data);
      })
      .catch();
  };

  const addToOrder = (event, item) => {
    event.preventDefault();
    event.stopPropagation();

    let bRes = event.isDefaultPrevented();
    console.log("add to order " + bRes);
    let bFound = false;
    // search dish has been ordered yet
    const nCartList = cartList.filter((elem) => {
      if (elem.id === item.id) {
        bFound = true;
        elem.quantity++;
        return elem;
      }
      return elem;
    });
    if (!bFound) {
      const tmpCart = {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
      };
      setCartList([...nCartList, tmpCart]);
    } else {
      setCartList([...nCartList]);
    }
    return false;
  };

  const isQuantity = (item) => {
    let bResult = false;
    for (let i = 0; i < cartList.length; i++) {
      if (cartList[i].id === item.id) {
        bResult = cartList[i].quantity > 0;
        break;
      }
    }
    return bResult;
  };

  const calculateCartTotal = () => {
    let sum = 0;
    for (let i = 0; i < cartList.length; i++) {
      if (cartList[i].quantity !== 0) {
        sum += cartList[i].quantity * cartList[i].price;
      }
    }
    // sum += sum * taxRate / 100;
    setCartTotal(sum);
  };

  const getQuantity = (item) => {
    var q = 0;
    for (let i = 0; i < cartList.length; i++) {
      if (cartList[i].id === item.id) {
        q = cartList[i].quantity;
        break;
      }
    }
    if (q != 0) {
      return (
        <CardText className="font-weight-bold text-primary">
          <MdDone color="Primary" size="2rem" /> {q}
        </CardText>
      );
    }
  };

  const removeFromOrder = (event, item) => {
    // search dish has been ordered yet
    event.preventDefault();

    const nCartList = cartList.filter((elem) => {
      if (elem.id === item.id) {
        elem.quantity--;
        if (elem.quantity !== 0) return elem;
        else return null;
      }
      return elem;
    });
    setCartList([...nCartList]);
  };

  const dishCard = (item) => {
    return (
      <Col sm="4" key={item.id}>
        <Card>
          <div className="imgblock">
            <CardImg
              top
              width="100%"
              className="imgbox h-100 d-inline-block"
              src={item.image_path}
              alt="Card image cap"
            />
          </div>
          <CardBody className="text-left py-0 by-0 pl-0 bl-0">
            <Row>
              <Col sm="4">
                <CardText className="d-inline bg-dark font-weight-bold text-light">
                  ${item.price}
                </CardText>
              </Col>
              <Col>
                <Link
                  to="#!"
                  onClick={(e) => addToOrder(e, item)}
                  className="flow-right"
                >
                  <MdAddCircle color="Primary" size="2rem" />
                </Link>
                {isQuantity(item) ? (
                  <Link
                    to="#!"
                    onClick={(e) => removeFromOrder(e, item)}
                    className=" flow-right"
                  >
                    <MdRemoveCircle color="Primary" size="2rem" />
                  </Link>
                ) : null}
              </Col>
              <Col>
                <i>{getQuantity(item)}</i>
              </Col>
            </Row>
          </CardBody>
          <CardBody className="text-left pt-0 bt-0 pl-0 bl-0">
            <CardText className="font-weight-bold">{item.name}</CardText>
          </CardBody>
        </Card>
      </Col>
    );
  };

  return (
    <div>
      {userMode == 2 ? <NavTab {...props} /> : null}
      {isOrder ? (
        <div>
          <CategoryNav
            {...props}
            restaurant={restaurant}
            fetchMenuList={fetchMenuList}
            cartTotal={cartTotal}
            setIsOrder={setIsOrder}
          />
          <Row>{menuList && menuList.map((item) => dishCard(item))}</Row>
        </div>
      ) : (
          <Cart
            addToOrder={addToOrder}
            removeFromOrder={removeFromOrder}
            taxRate={restaurant.taxRate}
            cartTotal={cartTotal}
            isQuantity={isQuantity}
            cartList={cartList}
            setIsOrder={setIsOrder}
          />
        )}
    </div>
  );
}

export default Order;
