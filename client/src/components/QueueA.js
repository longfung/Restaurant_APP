import React, { useState, useEffect, useContext, useRef } from 'react'
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


function QueueA(props) {
    const { t } = useTranslation();
    // const toppingMap = props.location.state.toppingMap;
    const [orders, setOrders] = useState([]);
    const [toppingMap, setToppingMap] = useState({});   // all toppings with [namet, toppingGroup]
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

    // useEffect(() => {
    //     debugger;
    //     getToppingList();
    // }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            getToppingList();
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const getToppingList = () => {
        const promise1 = access.fetchToppingByRestaurantId(restaurantId, shareContext.state.locale);
        Promise.resolve(promise1)
            // axios
            //   .get("/api/category", { params: { restaurant_id: restaurantId } })
            .then((res) => {
                getOrderList();
                setupToppingMap(res.data);
            })
            .catch((error) => console.log(error));
    }

    const getOrderList = () => {
        const dateId = new Date().toLocaleDateString().split('/').reverse().join('');
        const promise1 = access.fetchOrdersByActive(restaurantId, dateId);
        Promise.resolve(promise1)
            .then(res => {
                res.data.sort((a, b) => { return a.id - b.id; });
                setOrders(res.data);
            })
            .catch(error => console.log(error));
    }

    const setupToppingMap = oList => {
        let tMap = {};
        // debugger;
        oList.map((item, idx) => {
            let n = item.namet == null ? item.name : item.namet;
            if (!tMap.hasOwnProperty(item.id)) {
                const arr1 = [n, item.topping_group, item.price];
                tMap[item.id] = arr1;
            }
        });
        setToppingMap(tMap);
    }

    const completeOrder = (event, order) => {
        event.preventDefault();
        order.status = access.Status.orderComplete;
        const promise1 = access.updateOrders(order);
        Promise.resolve(promise1)
            // axios
            //   .get("/api/category", { params: { restaurant_id: restaurantId } })
            .then((res) => {
                getOrderList();
            })
            .catch((error) => console.log(error));
    }

    const completeItem = (event, order, idx) => {
        debugger;
        event.preventDefault();
        const cart = JSON.parse(order.cart);
        let isCompleted = true;
        cart.map((elem, i) => {
            if (idx == i) {
                elem.status = access.Status.itemComplete
            }
            if (elem.status != access.Status.itemComplete) {
                isCompleted = false;
            }
        })
        order.cart = JSON.stringify(cart);
        if (isCompleted)
            order.status = access.Status.itemComplete;
        const promise1 = access.updateOrders(order);
        Promise.resolve(promise1)
            // axios
            //   .get("/api/category", { params: { restaurant_id: restaurantId } })
            .then((res) => {
                getOrderList();
            })
            .catch((error) => console.log(error));
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
                            {t("QueueA")}
                        </Col>
                    </React.Fragment>
                </Nav>
            </Row>
            <div class="padding70"> </div>
            <Navbar color="light" light expand="md"></Navbar>
            {
                orders && orders.map((oItem, idx) => {
                    debugger;
                    const cart = JSON.parse(oItem.cart);
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
                                        <Link to='#!' onClick={e => completeOrder(e, oItem)} className='float-left'>
                                            <MdNotificationsActive color='red' size='2rem' />
                                        </Link>
                                    </Col>
                                    : null
                                }

                            </Row>
                            <Row>
                                <Col sm="12" xs="12" className="SmallFont font-weight-bold">
                                    {toppingApplyOrder && toppingApplyOrder.length > 0 ?
                                        <b>{t("Note")}:&nbsp;&nbsp;</b>
                                        :
                                        null
                                    }

                                    {toppingApplyOrder && toppingApplyOrder.map((elem, idx2) => {
                                        const g = (toppingMap[elem])[1];
                                        const n = (toppingMap[elem])[0]

                                        // if (idx == 0)
                                        //     return <span>{t("Note")}:&nbsp;&nbsp;</span>
                                        // debugger;
                                        if (g == 'G0') {
                                            if (toppingOrderResult[idx2] == true) {
                                                if (idx2 < resultCount)
                                                    return <span key={idx}>{n},&nbsp;&nbsp;</span>
                                                else
                                                    return <span key={idx}>{n}</span>
                                            }
                                        } else {
                                            // debugger;
                                            const res = toppingMap[toppingOrderResult[idx2]];
                                            if (idx2 < resultCount)
                                                return <span key={idx}>{res[0]},&nbsp;&nbsp;</span>
                                            else
                                                return <span key={idx}>{res[0]}</span>
                                        }

                                    })}
                                </Col>
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
                                            {elem.status !== access.Status.itemComplete ?
                                                <Col sm='1' xs="1">
                                                    <Link to='#!' onClick={e => completeItem(e, oItem, idx2)} className='float-left'>
                                                        <MdNotificationsActive color='red' size='2rem' />
                                                    </Link>

                                                </Col>
                                                :
                                                <Col sm='1' xs="1">

                                                    <MdCheck color='blue' size='2rem' />


                                                </Col>
                                            }
                                        </Row>
                                        {elem.isTopping > 0 ?
                                            <Row>
                                                <Col sm="2" xs="2">
                                                </Col>
                                                <Col sm="10" xs="10">
                                                    <span className="SmallFont font-weight-bold">{t("Note")}:&nbsp;&nbsp;</span>
                                                    {elem.toppingArray && elem.toppingArray.map((item, idx) => {
                                                        const g = (toppingMap[item])[1];
                                                        const n = (toppingMap[item])[0];
                                                        const p = (toppingMap[item])[2];
                                                        // if (idx == 0) tSum = 0;
                                                        // if (idx == 0)
                                                        //     return <span>{t("Note")}:&nbsp;&nbsp;</span>
                                                        debugger;
                                                        if (g == 'G0') {
                                                            if (elem.toppingResult[idx] == true) {
                                                                if (idx != 0)
                                                                    return <span className="SmallFont"
                                                                        key={idx}>,&nbsp;&nbsp;{n}{p > 0 ? '($' + p + ")" : null}</span>
                                                                else
                                                                    return <span className="SmallFont"
                                                                        key={idx}>{n}{p > 0 ? '($' + p + ")" : null}</span>
                                                            }
                                                        } else {
                                                            const res = toppingMap[elem.toppingResult[idx]];
                                                            if (idx != 0)
                                                                return <span className="SmallFont" key={idx}>,&nbsp;&nbsp;{res[0]}</span>
                                                            else
                                                                return <span className="SmallFont" key={idx}>{res[0]}</span>
                                                        }

                                                    })}
                                                </Col>



                                            </Row>
                                            : null}

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
export default QueueA
