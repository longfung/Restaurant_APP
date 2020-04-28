import React, { useEffect, useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import {
    Nav,
    NavItem,
    Navbar,
    NavLink,
    NavbarBrand,
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
    debugger;
    const shareContext = useContext(store);
    const username = shareContext.state.username;
    const [localeClass, setLocaleClass] = useState({});
    const { t } = useTranslation();

    useEffect(() => {
        setLocaleUIClass(shareContext.state.locale);
    }, [shareContext.state.locale])

    const goComponent = (target) => {
        props.history.push(target);
    };

    const setLanguage = (locale) => {
        debugger;
        shareContext.dispatch({ type: "setLocale", value: locale });
        setLocaleUIClass(locale);
    };

    const setLocaleUIClass = (localeVal) => {
        switch (localeVal) {
            case "en":
                setLocaleClass({
                    ...localeClass,
                    en: "text-white",
                    tw: "text-secondary",
                    zh: "text-secondary"
                });
                break;
            case "tw":
                setLocaleClass({
                    ...localeClass,
                    en: "text-secondary",
                    tw: "text-white",
                    zh: "text-secondary"
                });
                break;
            case "zh":
                setLocaleClass({
                    ...localeClass,
                    en: "text-secondary",
                    tw: "text-secondary",
                    zh: "text-white"
                });
                break;
            default:
                setLocaleClass({
                    ...localeClass,
                    en: "text-primary",
                    tw: "text-primary",
                    zh: "text-primary"
                });
        }
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
                        <Col sm="1.5">
                            {username == 'demo' ?
                                <Language />
                                :
                                null
                            }
                        </Col>
                        <Col sm="1.5">
                            <Link to="#!"
                                onClick={
                                    () => props.history.push("/user")
                                }
                                className="font-weight-bold text-Dark">
                                <MdAccountCircle color="gold" size="2.2rem" /> {username} </Link>
                        </Col>
                    </Row>
                </Jumbotron>
            </Navbar>
        </div>
    );
}

export default NavTab;
