import React, { useState, useEffect, useContext } from 'react'
import { MdShoppingCart, MdAddCircle, MdRemoveCircle, MdArrowBack } from 'react-icons/md';
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


function Queue(props) {
    const { t } = useTranslation();
    const toppingMap = props.location.state.toppingMap;
    const [orders, setOrders] = useState([]);
    const shareContext = useContext(store);
    const setMessage = props.setMessage;
    const restaurant = shareContext.state.restaurant;
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
        debugger;
        const dateId = new Date().toLocaleDateString().split('/').reverse().join('');
        const promise1 = access.fetchOrdersByActive(restaurantId, dateId, access.Status.submit);
        Promise.resolve(promise1)
            .then(res => {
                res.data.sort((a, b) => { return a.id - b.id; });
                setOrders(res.data);
            }).catch((err) => {
                // let errorObject = JSON.parse(JSON.stringify(err));
                setMessage({ status: 404, msg: err.message });
            });
    }, []);

    return (
        <div>
            <Row>
                <Nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top mr-auto">
                    <React.Fragment>
                        <Col sm="12" xs="12" className="float-left">
                            <NavItem className="float-left" >
                                <Link to="#!"
                                    onClick={
                                        () => props.history.push("/Order")
                                    }
                                    className=" bg-dark font-weight-bold text-white">
                                    <MdArrowBack color="white" size="2rem" />
                                </Link>
                            </NavItem>
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
                    return (
                        <div key={idx}>
                            <Row>
                                < Col sm="9" xs="9" className="text-wrap">
                                    <b>{oItem.id}</b>/<b>{oItem.name}</b>
                                </Col>
                            </Row>
                            {oItem.order_id == shareContext.state.customer.orderId && cart && cart.map((elem, idx) => {
                                return (
                                    <div>

                                        <Row>
                                            <Col sm="1" xs="1">
                                            </Col>
                                            <Col sm="1" xs="1" className="font-weight-bold">
                                                {idx + 1}
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
export default Queue
