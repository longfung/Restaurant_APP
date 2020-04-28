import React, { useState, useEffect, useContext } from "react";
import Language from './Language';
import {
  Row,
  Col,
  Button,
  Jumbotron

} from "reactstrap";
import { MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { store } from "./Store";
import access from '../util/access';
import { useTranslation } from 'react-i18next';

function CategoryNav(props) {
  debugger;
  const shareContext = useContext(store);
  const { t } = useTranslation();
  const restaurant = shareContext.state.restaurant;
  const username = shareContext.state.username;
  const restaurantId = restaurant.id;
  const fetchMenuList = props.fetchMenuList;
  const cartTotal = props.cartTotal;
  const setIsOrder = props.setIsOrder;
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    console.log("in UseEffect");
    debugger;
    setCategoryList([]);
    const promise1 = access.fetchCategoryByRestaurantId(restaurantId, shareContext.state.locale);
    Promise.resolve(promise1)
      // axios
      //   .get("/api/category", { params: { restaurant_id: restaurantId } })
      .then(res => {
        debugger;
        res.data.map(item =>
          setCategoryList(prevState => [
            ...prevState,
            { id: item.id, label: item.namet == null ? item.category_name : item.namet }
          ])
        );
      })
      .catch(error => console.log(error));
  }, [shareContext.state.locale]);

  return (
    <div>
      <Jumbotron fluid className="my-0 py-1 bg-info w-100">
        <Row>
          <Col sm="9">
            <Button onClick={() => fetchMenuList("")}>{t("AllCategory")}</Button>
            {categoryList &&
              categoryList.map((item, index) => (
                <Button key={item.id} onClick={() => fetchMenuList(item.id)}>
                  {item.label}
                </Button>
              ))}
          </Col>
          <Col sm="1.5">
            {username == 'demo' ?
              <Language />
              :
              null
            }
          </Col>
          <Col sm="1.5">
            <Link
              to="#!"
              onClick={() => setIsOrder(false)}
              className="font-weight-bold text-Dark"
            >
              <MdShoppingCart color="gold" size="2.2rem" /> $
              {cartTotal.toFixed(2)}
            </Link>
          </Col>
        </Row>
      </Jumbotron>
    </div>
  );
}

export default CategoryNav;
