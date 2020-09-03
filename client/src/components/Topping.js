import React, { useState, useEffect, useContext } from "react";
import NavTab from "./NavTab";
import access from "../util/access";
import Select from "react-select";
import {
    Form,
    Input,
    FormGroup,
    Row,
    Col,
    Button,
    Label
} from "reactstrap";
import { store } from "./Store";
import { useTranslation, setDefaults } from "react-i18next";
import { MdCheckBox } from "react-icons/md";
const config = require("../util/config.json");

function Topping(props) { // console.log("In Restaurant");
    debugger;
    const { t } = useTranslation();
    const shareContext = useContext(store);
    const restaurantId =
        shareContext.state.restaurant != null
            ? shareContext.state.restaurant.id
            : null;
    const setMessage = props.setMessage;
    if (!restaurantId) {
        let m = t("LoginFirst");
        setMessage({ status: 400, msg: m });
        props.history.push("/Login");
    }
    const [toppingList, setToppingList] = useState([]);
    const [toppingGroup, setToppingGroup] = useState('');
    const [toppingGroupList, setToppingGroupList] = useState([]);
    const [topping, setTopping] = useState({
        id: "",
        name: "",
        topping_group: "",
        apply_order: false,
        apply_item: false,
        apply_default: false,
        price: 0,
        restaurant_id: restaurantId
    });

    useEffect(() => {
        getToppingList();
        buildToppingGroupList();
    }, []);

    const buildToppingGroupList = () => {
        debugger;

        const options = config.toppingGroup.map(v => ({
            value: v,
            label: v
        }));
        setToppingGroupList(options);
    }

    const handleTopingSave = () => {
        debugger;
        let data = {
            id: topping.id,
            name: topping.name,
            topping_group: toppingGroup.value,
            apply_order: topping.apply_order,
            apply_item: topping.apply_item,
            apply_default: topping.apply_default,
            price: topping.price,
            locale: shareContext.state.restaurant.locale,
            entityId: access.Entity.topping,
            restaurant_id: topping.restaurant_id
        };
        if (topping.id != "")
            updateTopping(data);
        else
            addTopping(data);
    }

    const addTopping = (data) => {
        // update the group from select       
        const promise1 = access.addTopping(data);
        Promise.resolve(promise1)
            .then(res => {
                let m = topping.name + " is created Successfully !!!";
                setMessage({ status: 200, msg: m });
                getToppingList();
                initializeTopping();
            }).catch((err) => {
                // let errorObject = JSON.parse(JSON.stringify(err));
                setMessage({ status: 404, msg: err.message });
            });
    };

    const updateTopping = (data) => {
        const promise1 = access.updateTopping(data);
        Promise.resolve(promise1)
            .then(res => {
                let m = topping.name + " is updated Successfully !!!";
                setMessage({ status: 200, msg: m });
                getToppingList();
                initializeTopping();
            }).catch((err) => {
                // let errorObject = JSON.parse(JSON.stringify(err));
                setMessage({ status: 404, msg: err.message });
            });
    };

    const getToppingList = () => {
        const promise1 = access.fetchToppingByRestaurantId(restaurantId, shareContext.state.locale);
        Promise.resolve(promise1)
            .then(res => {
                console.log(res);
                setToppingList(res.data);
            })
            .catch(error => console.log("Error"));
    };

    const setEdit = elem => {
        setTopping(elem);
        setToppingGroup({
            value: elem.topping_group,
            label: elem.topping_group
        })
    };

    const setDelete = elem => {
        const promise = access.deleteToppingById(elem.id, elem.restaurant_id);
        Promise.resolve(promise)
            .then(res => {
                let m = elem.name + " is deleted Successfully !!!";
                setMessage({ status: 200, msg: m });
                getToppingList();
                initializeTopping();
            })
            .catch(err => console.log(err.error));
    };

    const initializeTopping = () => {
        setToppingGroup('');
        setTopping({
            id: "",
            name: "",
            topping_group: "",
            apply_order: false,
            apply_item: false,
            apply_default: false,
            price: 0,
            restaurant_id: shareContext.state.restaurant.id
        });
    };

    return (
        <div>
            <NavTab {...props} />
            <Form>
                <Row form>
                    <Col sm="6">
                        <FormGroup className="float-left">
                            <Label for="name">
                                {
                                    t("ToppingName")
                                }</Label>
                            <Input type="Text" id="name"
                                value={
                                    topping.name || ''
                                }
                                onChange={
                                    (e) => setTopping({
                                        ...topping,
                                        name: e.target.value
                                    })
                                } />
                        </FormGroup>
                    </Col>
                    <Col sm="6">
                        <FormGroup className="float-left">
                            <Label for="group">
                                {
                                    t("ToppingGroup")
                                }</Label>
                            <Select id="group"
                                options={toppingGroupList}
                                onChange={setToppingGroup}
                                className="mb-3"
                                placeholder={t("SelectToppingGroup")}
                                value={toppingGroup} />

                        </FormGroup>
                    </Col>


                    <Col xs="6" sm="6">
                        <FormGroup className="float-left">

                            <Input className="form-control margin-left" type="checkbox" id="applyOrder"
                                // <MdAccountCircle color="gold" size="2rem" />
                                checked={
                                    topping.apply_order
                                }
                                onChange={
                                    (e) => setTopping({
                                        ...topping,
                                        apply_order: e.target.checked
                                    })
                                } />
                            <Label for="applyOrder" className="indented-checkbox-text">
                                {
                                    t("ApplyOrder")
                                }</Label>
                        </FormGroup>
                    </Col>
                    <Col xs="6" sm="6">
                        <FormGroup className="float-left">

                            <Input className="form-control" type="checkbox" id="applyItem"
                                checked={
                                    topping.apply_item
                                }
                                onChange={
                                    (e) => setTopping({
                                        ...topping,
                                        apply_item: e.target.checked
                                    })
                                } />
                            <Label for="applyItem" className="indented-checkbox-text" >
                                {
                                    t("ApplyItem")
                                }</Label>
                        </FormGroup>
                    </Col>
                    <Col sm="6">
                        <FormGroup className="float-left">

                            <Input className="form-control" type="checkbox" id="default"

                                checked={
                                    topping.apply_default
                                }
                                onChange={
                                    (e) => setTopping({
                                        ...topping,
                                        apply_default: e.target.checked
                                    })
                                } />
                            <Label for="default" className="indented-checkbox-text ">
                                {
                                    t("defaultTopping")
                                }</Label>
                        </FormGroup>
                    </Col>
                    <Col sm="6">
                        <FormGroup className="float-left">
                            <Label for="price">
                                {
                                    t("ToppingPrice")
                                }</Label>
                            <Input type="Text" id="price"
                                value={
                                    topping.price || 0
                                }
                                onChange={
                                    (e) => setTopping({
                                        ...topping,
                                        price: e.target.value
                                    })
                                } />
                        </FormGroup>
                    </Col>
                    <Col sm="6">
                        <Button type="button"
                            onClick={handleTopingSave}>
                            {
                                t("Save")
                            } </Button>
                    </Col>
                </Row>
            </Form>
            <hr></hr>
            <div>
                <h2>{t("ToppingList")}</h2>
                <ul>
                    {toppingList &&
                        toppingList.map((item, idx) => (
                            <Row key={idx}>
                                <Col sm={4}>{item.name}</Col>
                                <Col sm={6}>{item.topping_group}</Col>
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

export default Topping;
