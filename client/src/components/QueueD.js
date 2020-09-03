import React, { useState, useEffect, useContext } from 'react'
import { MdShoppingCart, MdAddCircle, MdRemoveCircle, MdArrowBack, MdCheck, MdNotificationsActive } from 'react-icons/md';
import {
    Row,
    Col,
    Button,
    Nav,
    NavItem,
    Navbar,
    Jumbotron

} from "reactstrap";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import access from '../util/access';
import { store } from "./Store";
import "../index.css";


function QueueD(props) {
    const { t } = useTranslation();
    // const toppingMap = props.location.state.toppingMap;
    const [orders, setOrders] = useState([]);
    const [orderMap, setOrderMap] = useState([]);
    const shareContext = useContext(store);
    const setMessage = props.setMessage;
    const restaurantId =
        shareContext.state.restaurant != null
            ? shareContext.state.restaurant.id
            : null;
    if (!restaurantId) {
        let m = t("LoginFirst");
        setMessage({ status: 400, msg: m });
        props.history.push("/Login");
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getOrderList();
        }, 10000);
        return () => clearInterval(interval);
    }, [orderMap]);

    const getOrderList = () => {
        const dateId = new Date().toLocaleDateString().split('/').reverse().join('');
        const promise1 = access.fetchOrdersByActive(restaurantId, dateId);
        Promise.resolve(promise1)
            .then(res => {
                res.data.sort((a, b) => { return a.id - b.id; });
                setupOrderMap(res.data);
                setOrders(res.data);
            }).catch((err) => {
                // let errorObject = JSON.parse(JSON.stringify(err));
                setMessage({ status: 404, msg: err.message });
            });
    }

    const setupOrderMap = oList => {
        let curr = [];

        // debugger;
        let rList = oList.map((oItem, idx) => {
            let cartList = JSON.parse(oItem.cart);
            let cList = cartList.map((elem, idx2) => {
                const key = oItem.id + '_' + elem.id;
                if (orderMap && orderMap.indexOf(key) === -1)
                    elem["newItem"] = true;
                else
                    elem["newItem"] = false;
                if ((oItem.status === access.Status.submit || oItem.status === access.Status.itemComplete) && elem.status === access.Status.itemComplete)
                    curr.push(key);
                return elem;
            })
            oItem.cart = cList;
            return oItem;
        });
        // shareContext.dispatch({
        //     type: "setOrderMap",
        //     value: { "key": curr }
        // });
        setOrderMap(curr);
    }

    return (
        <div>
            <Row>
                <Nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top mr-auto">
                    <React.Fragment>
                        <Col sm="5" xs="5" className="float-left">
                            <NavItem className="float-left" >
                                <Link to="#!"
                                    onClick={
                                        () => props.history.push("/Restaurant")
                                    }
                                    className=" bg-dark font-weight-bold text-white">

                                    <MdArrowBack color="white" size="2rem" />
                                </Link>
                            </NavItem>
                        </Col>
                        <Col sm="7" xs="7" className=" bg-dark font-weight-bold text-white">
                            {t("QueueD")}
                        </Col>


                    </React.Fragment>
                </Nav>
            </Row>
            <div class="padding70"> </div>
            <Navbar color="light" light expand="md"></Navbar>
            {
                orders && orders.map((oItem, idx) => {
                    const cart = oItem.cart;
                    const toppingApplyOrder = JSON.parse(oItem.topping_apply_order);
                    const toppingOrderResult = JSON.parse(oItem.topping_order_result);
                    const resultCount = toppingOrderResult.length - 1;
                    return (
                        <div key={idx}>
                            <Row>
                                < Col sm="9" xs="9" className="text-wrap">
                                    <b>{oItem.id}</b>/<b>{oItem.name}</b>
                                </Col>
                                {oItem.status == access.Status.itemComplete ?
                                    <Col sm='2' xs="2">
                                        <MdCheck color='blue' size='2rem' />
                                    </Col>
                                    : null
                                }

                            </Row>
                            {cart && cart.map((elem, idx2) => {
                                return (
                                    <div key={idx2}>

                                        <Row>
                                            <Col sm="1" xs="1">
                                            </Col>
                                            <Col sm="1" xs="1" className="font-weight-bold">
                                                {idx2 + 1}
                                            </Col>
                                            < Col sm="4" xs="4" className="text-wrap">
                                                <b>{elem.name}</b>
                                            </Col>
                                            <Col sm="2" xs="2" className="float-left">
                                                ${elem.price}
                                            &nbsp;

                                            {elem.size == 1 && elem.isMultiple == true ? t("S") : null}
                                                {elem.size == 2 && elem.isMultiple == true ? t("M") : null}
                                                {elem.size == 3 && elem.isMultiple == true ? t("L") : null}
                                                {elem.size == 4 && elem.isMultiple == true ? t("X") : null}

                                            </Col>
                                            <Col sm="1" xs="1">
                                                {elem.quantity}
                                            </Col>
                                            {elem.status === access.Status.itemComplete ?
                                                <Col sm='1' xs="1">

                                                    {elem.newItem ?

                                                        <MdCheck className="blink" color='red' size='2rem' />
                                                        :
                                                        <MdCheck color='blue' size='2rem' />
                                                    }



                                                </Col>
                                                :
                                                null
                                            }
                                        </Row>

                                    </div>
                                )
                            })}
                        </div >
                    )
                })
            }

        </div >
    )
}
export default QueueD
