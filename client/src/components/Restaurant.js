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
// import { allowedLocale } from "../util/config.json";
const config = require("../util/config.json");

function Restaurant(props) { // console.log("In Restaurant");
    debugger;

    const { t } = useTranslation();
    const shareContext = useContext(store);
    const userId = shareContext.state.ownerId;
    const setMessage = props.setMessage;
    if (!userId) {
        let m = t("LoginFirst");
        setMessage({ status: 400, msg: m });
        props.history.push("/Login");
    }
    const [restaurant, setRestaurant] = useState({
        id: "",
        name: "",
        address: "",
        city: "",
        zipCode: "",
        state: "",
        taxRate: 0,
        locale: "",
        supportLocale: "",
        ownerId: userId,
    });

    const [localeValue, setLocaleValue] = useState({});
    const [supportLocale, setSupportLocale] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const promise1 = access.fetchRestuarantByOwnerId(userId);
        Promise.resolve(promise1).then((res1) => {
            const rest = res1.data;
            setRestaurant({
                id: rest.id,
                name: rest.name,
                taxRate: rest.tax_rate,
                address: rest.address,
                city: rest.city,
                zipCode: rest.zip_code,
                state: rest.state,
                locale: rest.locale,
                supportLocale: rest.support_locale,
                ownerId: userId
            });
            debugger;
            // if (!shareContext.state.restaurant)
            shareContext.dispatch({ type: "setRestaurant", value: rest });
            buildLocaleList(rest);

            if (shareContext.state.locale == null)
                shareContext.dispatch({ type: "setLocale", value: rest.locale });

        }).catch((error) => console.log(error));

    }, []);

    // useEffect(() => {
    //     if (restaurant.id)
    //         shareContext.dispatch({ type: "setRestaurant", value: restaurant });
    // }, [restaurant.id]);

    useEffect(() => {
        fetchLocaleList();
        // setLocaleValue("");
        // setSupportLocale([]);
    }, [shareContext.state.locale])

    const buildLocaleList = (rest) => {
        debugger;
        const arr = rest.support_locale.split(',')
        const options = arr.map(v => ({
            value: v,
            label: t(`${v}`)
        }));
        setSupportLocale(options);
        setLocaleValue({ value: rest.locale, label: rest.locale });
    }

    const fetchLocaleList = () => {
        setOptions([])
        const options = config.allowedLocale.map(v => ({
            value: v,
            label: t(`${v}`)

        }));
        setOptions(options);
    }

    const handlePostRestaurant = () => {
        if (restaurant.id != "") {
            handleUpdateRestaurant();
        } else {
            handleAddRestaurant();
        }
    };

    const handleAddRestaurant = () => {

        const data = moveCorrespond();
        const promise1 = access.addRestaurant(data);
        Promise.resolve(promise1).then((res) => {
            shareContext.dispatch({ setRestaurant: restaurant });
            let m = restaurant.name + " is created Successfully !!!";
            setMessage({ status: 200, msg: m });
        }).catch((err) => {
            console.log(err);
        });
    };

    const handleUpdateRestaurant = () => {
        const data = moveCorrespond();
        const promise1 = access.updateRestaurant(data);
        Promise.resolve(promise1).then((res) => {
            shareContext.dispatch({ setRestaurant: restaurant });
            let m = restaurant.name + " is updated Successfully !!!";
            setMessage({ status: 200, msg: m });
        }).catch((err) => {
            console.log(err);
        });
    };

    const moveCorrespond = () => {
        debugger;
        let temp = '';
        supportLocale.map(elem => {
            temp == '' ? temp += elem.value : temp = temp + ',' + elem.value;
        });
        const data = {
            id: restaurant.id,
            name: restaurant.name,
            taxRate: restaurant.taxRate,
            address: restaurant.address,
            city: restaurant.city,
            zipCode: restaurant.zipCode,
            state: restaurant.state,
            locale: localeValue.value,
            supportLocale: temp,
            ownerId: userId
        };
        return data;
    };

    return (
        <div>
            <NavTab {...props} />
            <Form>
                <Row form>
                    <Col sm="6">
                        <FormGroup>
                            <Label for="name">
                                {
                                    t("RestaurantName")
                                }</Label>
                            <Input type="Text" id="name"
                                value={
                                    restaurant.name || ''
                                }
                                onChange={
                                    (e) => setRestaurant({
                                        ...restaurant,
                                        name: e.target.value
                                    })
                                } />
                        </FormGroup>
                    </Col>
                    <Col sm="6">
                        <FormGroup>
                            <Label for="taxRateId">
                                {
                                    t("TaxRate")
                                }</Label>
                            <Input type="Text" id="taxRateId"
                                value={
                                    restaurant.taxRate
                                }
                                onChange={
                                    (e) => setRestaurant({
                                        ...restaurant,
                                        taxRate: e.target.value
                                    })
                                } />
                        </FormGroup>
                    </Col>


                    <Col xs="6" sm="6">
                        <FormGroup>
                            <Label for="address">
                                {
                                    t("Address")
                                }</Label>
                            <Input type="text" id="address"
                                value={
                                    restaurant.address
                                }
                                onChange={
                                    (e) => setRestaurant({
                                        ...restaurant,
                                        address: e.target.value
                                    })
                                } />
                        </FormGroup>
                    </Col>
                    <Col xs="6" sm="6">
                        <FormGroup>
                            <Label for="city">
                                {
                                    t("City")
                                }</Label>
                            <Input type="text" id="city"
                                value={
                                    restaurant.city
                                }
                                onChange={
                                    (e) => setRestaurant({
                                        ...restaurant,
                                        city: e.target.value
                                    })
                                } />
                        </FormGroup>
                    </Col>
                    <Col sm="6">
                        <FormGroup>
                            <Label for="state">
                                {
                                    t("State")
                                }</Label>
                            <Input type="Text" id="state"
                                value={
                                    restaurant.state
                                }
                                onChange={
                                    (e) => setRestaurant({
                                        ...restaurant,
                                        state: e.target.value
                                    })
                                } />
                        </FormGroup>
                    </Col>
                    <Col sm="6">
                        <FormGroup>
                            <Label for="zipCode">
                                {
                                    t("ZipCode")
                                }</Label>
                            <Input type="Text" id="zipCode"
                                value={
                                    restaurant.zipCode || ''
                                }
                                onChange={
                                    (e) => setRestaurant({
                                        ...restaurant,
                                        zipCode: e.target.value
                                    })
                                } />
                        </FormGroup>
                    </Col>
                    <Col xs="6" sm="6">

                        <FormGroup>
                            <Label for="localeid">
                                {
                                    t("DefaultLanguage")
                                }</Label>
                            <Select id="localeid"
                                options={options}
                                onChange={setLocaleValue}
                                className="mb-3"
                                placeholder="Select a default language"
                                value={localeValue} />
                        </FormGroup>
                    </Col>

                    <Col xs="6" sm="6">

                        <FormGroup>
                            <Label for="localeSupp">
                                {
                                    t("SupportLanguage")
                                }</Label>
                            <Select id="localeSupp"
                                isMulti
                                options={options}
                                onChange={setSupportLocale}
                                className="mb-3"
                                placeholder="Select support language"
                                value={supportLocale} />
                        </FormGroup>
                    </Col>
                    <Button type="button"
                        onClick={handlePostRestaurant}>
                        {
                            t("Save")
                        } </Button>
                </Row>
            </Form>
        </div>
    );
}

export default Restaurant; 
