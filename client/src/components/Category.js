import React, { useState, useEffect, useContext } from "react";
import NavTab from "./NavTab";
import { Form, Input, Row, Col, Button, FormGroup, Label } from "reactstrap";
import { store } from "./Store";
import access from "../util/access";
import { useTranslation } from "react-i18next";

function Category(props) {
  const { t } = useTranslation();
  const shareContext = useContext(store);
  const restaurantId = shareContext.state.restaurant
    ? shareContext.state.restaurant.id
    : null;
  const setMessage = props.setMessage;
  if (!restaurantId) {
    let m = t("LoginFirst");
    setMessage({ status: 400, msg: m });
    props.history.push("/Login");
  }

  const [node, setNode] = useState({});
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    initializeCategory();
    const promise1 = access.fetchCategoryByRestaurantId(restaurantId, shareContext.state.locale);
    Promise.resolve(promise1)
      .then(res => {
        setCategoryList(res.data);
      })
      .catch((err) => {
        // let errorObject = JSON.parse(JSON.stringify(err));
        setMessage({ status: 404, msg: err.message });
      });
  }, []);

  const handleAddCategory = () => {
    if (node.id != "") {
      handleUpdateCategory();
      return;
    }
    let data = {
      category_name: node.category_name,
      locale: shareContext.state.restaurant.locale,
      entityId: access.Entity.category,
      category_description: node.category_description,
      restaurantId: node.restaurant_id
    };
    const promise1 = access.addCategory(data);
    Promise.resolve(promise1)
      .then(res => {
        let m = node.category_name + " is created Successfully !!!";
        setMessage({ status: 200, msg: m });
        getCategoryList();
        initializeCategory();
      }).catch((err) => {
        // let errorObject = JSON.parse(JSON.stringify(err));
        setMessage({ status: 404, msg: err.message });
      });
  };

  const handleUpdateCategory = () => {
    let data = {
      id: node.id,
      category_name: node.category_name,
      locale: shareContext.state.restaurant.locale,
      entityId: access.Entity.category,
      category_description: node.category_description,
      restaurantId: node.restaurant_id
    };

    const promise1 = access.updateCategory(data);
    Promise.resolve(promise1)
      .then(res => {
        let m = node.category_name + " is updated Successfully !!!";
        setMessage({ status: 200, msg: m });
        getCategoryList();
        initializeCategory();
      }).catch((err) => {
        // let errorObject = JSON.parse(JSON.stringify(err));
        setMessage({ status: 404, msg: err.message });
      });
  };

  const getCategoryList = () => {
    const promise1 = access.fetchCategoryByRestaurantId(restaurantId, shareContext.state.locale);
    Promise.resolve(promise1)
      .then(res => {
        console.log(res);
        setCategoryList(res.data);
      }).catch((err) => {
        // let errorObject = JSON.parse(JSON.stringify(err));
        setMessage({ status: 404, msg: err.message });
      });
  };

  const setEdit = obj => {
    debugger;
    setNode(obj);
  };

  const setDelete = obj => {
    const promise1 = access.deleteCategoryById(obj.id, restaurantId);
    Promise.resolve(promise1)
      .then(res => {
        let m = obj.category_name + " is deleted Successfully !!!";
        setMessage({ status: 200, msg: m });
        getCategoryList();
        initializeCategory();
      }).catch((err) => {
        // let errorObject = JSON.parse(JSON.stringify(err));
        setMessage({ status: 404, msg: err.message });
      });
  };

  const initializeCategory = () => {
    setNode({
      id: "",
      category_name: "",
      category_description: "",
      restaurant_id: restaurantId
    });
  };
  return (
    <div>
      <NavTab {...props} />
      <Form>
        <Row form>
          <Col md={1}>
            <FormGroup>
              <Label for="catagoryName">{t("Category")}</Label>
              <Input
                type="text"
                id="categoryName"
                value={node.category_name}
                onChange={e =>
                  setNode({ ...node, category_name: e.target.value })
                }
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={1}>
            <FormGroup>
              <Label for="categoryDescritpion">{t("CategoryDescription")}</Label>
              <Input
                type="text"
                id="categoryDescription"
                value={node.category_description}
                onChange={e =>
                  setNode({ ...node, category_description: e.target.value })
                }
              />
            </FormGroup>
          </Col>
        </Row>
        <Button id="saveButton" onClick={handleAddCategory}>
          {t("Save")}
        </Button>
      </Form>
      <hr></hr>
      <div>
        <h2>{t("CategoryList")}</h2>
        <ul>
          {categoryList &&
            categoryList.map((item, idx) => (
              <Row key={idx}>
                <Col sm={4}>{item.category_name}</Col>
                <Col sm={6}>{item.category_description}</Col>
                <Col sm={1}>
                  <Button onClick={() => setEdit(item)}>{t("Edit")}</Button>
                </Col>
                <Col sm={1}>
                  <Button onClick={() => setDelete(item)}>{t("Delete")}</Button>
                </Col>
              </Row>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Category;
