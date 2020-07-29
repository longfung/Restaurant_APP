import React, { useState, useContext } from "react";
import { Link, } from "react-router-dom";
import {
    Nav,
    NavItem,
    Navbar,
    NavLink,
    Button,
    Row,
    Col,
    Jumbotron
} from "reactstrap";
import { MdAccountCircle } from "react-icons/md";
import { store } from "./Store";
import { useTranslation } from "react-i18next";
import Language from './Language';
import "../index.css";

function NavTab(props) {
    const shareContext = useContext(store);
    const username = shareContext.state.username;
    const { t } = useTranslation();

    const goComponent = (target) => {
        props.history.push(target);
    };

    return (
        <Navbar color="light" light expand="md">
            <Jumbotron fluid className="my-0 py-1 bg-info w-100">
                <Row>

                    <Nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top mr-auto px-1 bx-1 py-0 my-0" tabs pills>
                        <React.Fragment>
                            <Col sm="1">                            <NavItem className="mt-0 ">
                                <NavLink className="border-dark bg-dark font-weight-bold text-white" href="/">
                                    {
                                        t("Home")
                                    } </NavLink>
                            </NavItem>
                            </Col>
                            <Col sm="1">
                                <NavItem className="mt-0">
                                    <Button className="border-dark bg-dark font-weight-bold text-white"
                                        onClick={
                                            () => goComponent("/Restaurant")
                                        }>
                                        {
                                            t("Restaurant")
                                        } </Button>
                                </NavItem>
                            </Col>
                            <Col sm="1">
                                <NavItem>
                                    <Button className="border-dark bg-dark font-weight-bold text-white"
                                        onClick={
                                            () => goComponent("/Menu")
                                        }>
                                        {
                                            t("Menu")
                                        } </Button>
                                </NavItem>
                            </Col>
                            <Col sm="1">

                                <NavItem>
                                    <Button className="border-dark bg-dark font-weight-bold text-white"
                                        onClick={
                                            () => goComponent("/Category")
                                        }>
                                        {
                                            t("Category")
                                        } </Button>
                                </NavItem>
                            </Col>
                            <Col sm="1">
                                <NavItem>
                                    <Button className="border-dark bg-dark font-weight-bold text-white text-nowrap"
                                        onClick={
                                            () => goComponent("/Topping")
                                        }>
                                        {
                                            t("ToppingName")
                                        } </Button>
                                </NavItem>
                            </Col>
                            <Col sm="1">
                                <NavItem>
                                    <Button className="border-dark bg-dark font-weight-bold text-white"
                                        onClick={
                                            () => goComponent("/Order")
                                        }>
                                        {
                                            t("Order")
                                        } </Button>
                                </NavItem>
                            </Col>
                            <Col sm="1">
                                <NavItem>
                                    <Button className="border-dark bg-dark font-weight-bold text-white"
                                        onClick={
                                            () => goComponent("/EntityT")
                                        }>
                                        {
                                            t("Translator")
                                        } </Button>
                                </NavItem>
                            </Col>
                            <Col sm="1">
                                <NavItem className="mt-0 ">
                                    <NavLink className="border-dark bg-dark font-weight-bold text-white" href="/Login">
                                        {
                                            t("Login")
                                        } </NavLink>
                                </NavItem>
                            </Col>
                            <Col sm="1">
                                <NavItem>
                                    <NavLink className="border-dark bg-dark font-weight-bold text-white text-nowrap" href="/User">
                                        {
                                            t("CreateUser")
                                        } </NavLink>
                                </NavItem>
                            </Col>
                            <Col sm="1" className="border-dark bg-dark font-weight-bold text-white text-nowrap">

                                <Language />
                            </Col>
                            <Col sm="1" className="border-dark bg-dark font-weight-bold text-white text-nowrap">
                                <NavItem className="float-right" >
                                    <Link to="#!"
                                        onClick={
                                            () => props.history.push("/user")
                                        }
                                        className=" bg-dark font-weight-bold text-white">
                                        <MdAccountCircle color="white" size="2rem" /> {username}
                                    </Link>
                                </NavItem>
                            </Col>
                            <Col sm="1">
                                <NavItem>
                                    <Button className="border-dark bg-dark font-weight-bold text-white"
                                        onClick={
                                            () => goComponent("/QueueA")
                                        }>
                                        {
                                            t("QueueA")
                                        } </Button>
                                </NavItem>
                            </Col>
                        </React.Fragment>
                    </Nav>

                </Row>
            </Jumbotron>
            <div class="padding70"> </div>
        </Navbar>
    );
}

export default NavTab;
