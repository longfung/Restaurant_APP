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

function NavTab(props) {
    const shareContext = useContext(store);
    const username = shareContext.state.username;
    const { t } = useTranslation();

    const goComponent = (target) => {
        props.history.push(target);
    };

    return (
        <div>
            <Navbar color="light" light expand="md">
                <Jumbotron fluid className="my-0 py-1 bg-info w-100">
                    <Row>
                        <Col sm="9">
                            <Nav className="mr-auto px-1 bx-1 py-0 my-0" tabs pills>
                                <NavItem className="mt-0 ">
                                    <NavLink className="border-info bg-light text-uppercase text-primary" href="/">
                                        {
                                            t("Home")
                                        } </NavLink>
                                </NavItem>
                                <NavItem className="mt-0">
                                    <Button className=" border-info bg-light text-dark text-uppercase"
                                        onClick={
                                            () => goComponent("/Restaurant")
                                        }>
                                        {
                                            t("Restaurant")
                                        } </Button>
                                </NavItem>
                                <NavItem>
                                    <Button className=" border-info mb-0 bg-light text-dark text-uppercase"
                                        onClick={
                                            () => goComponent("/Menu")
                                        }>
                                        {
                                            t("Menu")
                                        } </Button>
                                </NavItem>
                                <NavItem>
                                    <Button className="border-info mb-0 bg-light text-dark text-uppercase"
                                        onClick={
                                            () => goComponent("/Category")
                                        }>
                                        {
                                            t("Category")
                                        } </Button>
                                </NavItem>
                                <NavItem>
                                    <Button className="border-info mb-0 bg-light text-dark text-uppercase"
                                        onClick={
                                            () => goComponent("/Order")
                                        }>
                                        {
                                            t("Order")
                                        } </Button>
                                </NavItem>
                                <NavItem>
                                    <Button className="border-info mb-0 bg-light text-dark text-uppercase"
                                        onClick={
                                            () => goComponent("/EntityT")
                                        }>
                                        {
                                            t("Translator")
                                        } </Button>
                                </NavItem>
                                <NavItem className="mt-0 ">
                                    <NavLink className="border-info bg-light text-uppercase text-primary" href="/Login">
                                        {
                                            t("Login")
                                        } </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="border-info bg-light text-uppercase text-primary" href="/User">
                                        {
                                            t("CreateUser")
                                        } </NavLink>
                                </NavItem>
                            </Nav>
                        </Col>
                        <Col sm="3" >
                            <Language />

                            <Col sm="6" className="float-left text-left text-nowrap">
                                <Link to="#!"
                                    onClick={
                                        () => props.history.push("/user")
                                    }
                                    className="font-weight-bold text-Dark">
                                    <MdAccountCircle color="gold" size="2rem" /> {username}
                                </Link>
                            </Col>
                        </Col>
                    </Row>
                </Jumbotron>
            </Navbar>
        </div>
    );
}

export default NavTab;
