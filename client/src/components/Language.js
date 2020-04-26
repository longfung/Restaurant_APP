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

function Language(props) {
    const shareContext = useContext(store);
    const username = shareContext.state.username;
    const [localeClass, setLocaleClass] = useState({});

    const { t } = useTranslation();

    useEffect(() => {
        setLocaleUIClass(shareContext.state.locale);
    }, [shareContext.state.locale])

    const setLanguage = (locale) => {
        shareContext.dispatch({ type: "setLocale", value: locale });
        setLocaleUIClass(locale);

        // i18next.changeLanguage(locale);
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
            <Col >
                <Link to="#!"
                    onClick={
                        () => setLanguage("en")
                    }
                    className={
                        `font-weight-bold ${
                        localeClass.en
                        }`
                    }>
                    EN
                            </Link>
                            &nbsp;
                <Link to="#!"
                    onClick={
                        () => setLanguage("tw")
                    }
                    className={
                        `font-weight-bold ${
                        localeClass.tw
                        }`
                    }>
                    繁體
                            </Link>
                            &nbsp;
                <Link to="#!"
                    onClick={
                        () => setLanguage("zh")
                    }
                    className={
                        `font-weight-bold ${
                        localeClass.zh
                        }`
                    }>
                    简体
                            </Link>
                {username == 'demo' ?
                    null
                    :
                    <Link to="#!"
                        onClick={
                            () => props.history.push("/user")
                        }
                        className="font-weight-bold text-Dark">
                        <MdAccountCircle color="gold" size="2.2rem" /> {username} </Link>
                }


            </Col>
        </div>
    );
}

export default Language;
