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
import { useTranslation } from "react-i18next";
import { allowedLocale } from "../util/config.json";

function Restaurant(props) { // console.log("In Restaurant");
    debugger;
    console.log(allowedLocale);
    const { t } = useTranslation();
    const shareContext = useContext(store);
    const userId = shareContext.state.ownerId;
    const setMessage = props.setMessage;
    const [restaurant, setRestaurant] = useState({
        id: "",
        name: "",
        address: "",
        city: "",
        zipCode: "",
        state: "",
        taxRate: 0,
        locale: "",
        ownerId: userId,
    });

    const [localeValue, setLocaleValue] = useState({});
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
                ownerId: userId
            });
            setLocaleValue({ value: rest.locale, label: rest.locale });
            if (!shareContext.state.locale)
                shareContext.dispatch({ type: "setLocale", value: rest.locale });



        }).catch((error) => console.log(error));

    }, []);

    useEffect(() => {
        if (restaurant.id)
            shareContext.dispatch({ type: "setRestaurant", value: restaurant });



    }, [restaurant.id]);

    useEffect(() => {
        fetchLocaleList();
    }, [shareContext.state.locale])

    const fetchLocaleList = () => {
        setOptions([])
        const options = allowedLocale.map(v => ({
            label: t(`${v}`),
            value: v
        }));
        setOptions(options);
    }

    const handlePostRestaurant = () => {
        debugger;
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
        const data = {
            id: restaurant.id,
            name: restaurant.name,
            taxRate: restaurant.taxRate,
            address: restaurant.address,
            city: restaurant.city,
            zipCode: restaurant.zipCode,
            state: restaurant.state,
            locale: localeValue.value,
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
                            <Label for="locale">
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
