import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
    Col,
} from "reactstrap";
import { MdAccountCircle } from "react-icons/md";
import { store } from "./Store";
import { useTranslation } from 'react-i18next';
import "../index.css"


function Language(props) {
    const shareContext = useContext(store);
    const { t } = useTranslation();
    const username = shareContext.state.username;
    const [supportLocale, setSupportLocale] = useState([]);
    const [rId, setRid] = useState(0);

    if (rId == 0 && shareContext.state.restaurant)
        setRid(shareContext.state.restaurant.id);

    useEffect(() => {
        // debugger;
        if (shareContext.state.restaurant && shareContext.state.restaurant.support_locale) {
            const arr = shareContext.state.restaurant.support_locale.split(',')
            setSupportLocale(arr);
        } else {
            setSupportLocale(['en', 'tw', 'zh'])
        }

    }, [rId])

    const setLanguage = (locale) => {
        shareContext.dispatch({ type: "setLocale", value: locale });
    };

    return (

        <Col sm={6} className="float-left">
            {supportLocale.map((elem, idx) => {
                return (<Link key={idx} to="#!"
                    onClick={
                        () => setLanguage(elem)
                    }
                    className={shareContext.state.locale == elem ? 'btn-primary text-white' : 'text-white'}>
                    {t(elem)}
                        &nbsp;
                </Link>
                )
            })}

            {/* {shareContext.state.userMode != 2 ?
                    null
                    :
                    <Link to="#!"
                        onClick={
                            () => props.history.push("/user")
                        }
                        className="font-weight-bold text-Dark">
                        <MdAccountCircle color="gold" size="2.2rem" /> {username} </Link>
                } */}


        </Col>

    );
}

export default Language;
