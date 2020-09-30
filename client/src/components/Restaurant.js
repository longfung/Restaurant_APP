import React, { useState, useEffect, useContext } from "react";
import NavTab from "./NavTab";
import access from "../util/access";
// import Select from "react-select";
// import {
//     Form,
//     Input,
//     FormGroup,
//     Row,
//     Col,
//     Button,
//     Label
// } from "reactstrap";
import { store } from "./Store";
import { useTranslation, setDefaults } from "react-i18next";
import { Formik, Form, Field } from 'formik';
import {
    Button,
    LinearProgress,
    Grid,
    Box,
    MenuItem,
    FormControl,
    InputLabel,
    FormControlLabel,
} from '@material-ui/core';
import {
    TextField,
    Select,
} from 'formik-material-ui';


// import { allowedLocale } from "../util/config.json";
const config = require("../util/config.json");

function Restaurant(props) { // console.log("In Restaurant");
    // debugger;

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
        fetchRestuarantByOwnerId();
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
        // debugger;
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

    const fetchRestuarantByOwnerId = () => {
        debugger;
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
            shareContext.dispatch({ type: "setRestaurant", value: rest });
            buildLocaleList(rest);
            if (shareContext.state.locale == null)
                shareContext.dispatch({ type: "setLocale", value: rest.locale });
        }).catch((err) => {
            // let errorObject = JSON.parse(JSON.stringify(err));
            setMessage({ status: 404, msg: err.message });
        });
    }

    const handlePostRestaurant = (obj) => {
        debugger;
        if (restaurant.id != "") {
            handleUpdateRestaurant(obj);
        } else {
            handleAddRestaurant(obj);
        }
    };

    const handleAddRestaurant = (obj) => {

        const data = moveCorrespond(obj);
        const promise1 = access.addRestaurant(data);
        Promise.resolve(promise1).then((res) => {
            fetchRestuarantByOwnerId();
            shareContext.dispatch({ setRestaurant: restaurant });
            let m = restaurant.name + " is created Successfully !!!";
            setMessage({ status: 200, msg: m });
        }).catch((err) => {
            let m = restaurant.name + " is created failed !!!";
            let errorObject = JSON.parse(JSON.stringify(err));
            setMessage({ status: 404, msg: err.message });
        });
    };

    const handleUpdateRestaurant = (obj) => {
        const data = moveCorrespond(obj);
        const promise1 = access.updateRestaurant(data);
        Promise.resolve(promise1).then((res) => {
            shareContext.dispatch({ setRestaurant: restaurant });
            let m = restaurant.name + " is updated Successfully !!!";
            setMessage({ status: 200, msg: m });
        }).catch((err) => {
            // let errorObject = JSON.parse(JSON.stringify(err));
            setMessage({ status: 404, msg: err.message });
        });
    };

    const moveCorrespond = (obj) => {
        debugger;
        // let temp = '';
        // obj.supportLocale.map(elem => {
        //     temp == '' ? temp += elem.value : temp = temp + ',' + elem.value;
        // });
        const data = {
            id: obj.id,
            name: obj.name,
            taxRate: obj.taxRate,
            address: obj.address,
            city: obj.city,
            zipCode: obj.zipCode,
            state: obj.state,
            locale: obj.locale,
            supportLocale: obj.supportLocale.join(),
            ownerId: userId
        };
        return data;
    };

    return (
        <div>
            <NavTab {...props} />
            <Formik
                enableReinitialize={true}
                initialValues={{
                    id: restaurant.id,
                    name: restaurant.name === null ||
                        restaurant.name === undefined
                        ? ""
                        : restaurant.name,
                    taxRate: restaurant.taxRate === null ||
                        restaurant.taxRate === undefined
                        ? ""
                        : restaurant.taxRate,
                    address: restaurant.address === null ||
                        restaurant.address === undefined
                        ? ""
                        : restaurant.address,
                    city: restaurant.city === null ||
                        restaurant.city === undefined
                        ? ""
                        : restaurant.city,
                    zipCode: restaurant.zipCode === null ||
                        restaurant.zipCode === undefined
                        ? ""
                        : restaurant.zipCode,
                    state: restaurant.state === null ||
                        restaurant.state === undefined
                        ? ""
                        : restaurant.state,
                    locale: restaurant.locale === null ||
                        restaurant.locale === undefined
                        ? ""
                        : restaurant.locale,
                    supportLocale: restaurant.supportLocale === null ||
                        restaurant.supportLocale === undefined
                        ? []
                        : restaurant.supportLocale.split(','),
                }}
                validate={values => {
                    const errors = {};
                    if (!values.name) {
                        errors.name = t("E010");
                    }
                    if (!values.taxRate) {
                        errors.taxRate = t("E010");
                    } else if (isNaN(values.taxRate)) {
                        errors.taxRate = t("E011");
                    } else if (values.taxRate < 0 || values.taxRate > 20) {
                        errors.taxRate = t("E201");
                    }
                    if (!values.state) {
                        errors.state = t("E010");
                    } else if (values.state.length != 2) {
                        errors.state = t("E202");
                    }
                    if (!values.locale) {
                        errors.state = t("E010");
                    }
                    if (!Array.isArray(values.supportLocale)) {
                        errors.supportLocale = t("E010");
                    } else if (values.supportLocale.length == 0) {
                        errors.supportLocale = t("E010");
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    debugger;
                    setTimeout(() => {
                        setSubmitting(false);
                        handlePostRestaurant(values);
                    }, 500);
                }}
            >
                {({ submitForm, isSubmitting }) => (
                    <Form>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} >
                                <Box margin={1}>
                                    <Field
                                        component={TextField}
                                        name="name"
                                        type="text"
                                        label={t("RestaurantName")}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <Box margin={1}>
                                    <Field
                                        component={TextField}
                                        name="taxRate"
                                        type="text"
                                        label={t("TaxRate")}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <Box margin={1}>
                                    <FormControl fullWidth variant="filled">
                                        <Field
                                            component={TextField}
                                            name="address"
                                            type="text"
                                            label={t("Address")}
                                        />
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <Box margin={1}>
                                    <Field
                                        component={TextField}
                                        name="city"
                                        type="text"
                                        label={t("City")}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <Box margin={1}>
                                    <Field
                                        component={TextField}
                                        name="zipCode"
                                        type="text"
                                        label={t("ZipCode")}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <Box margin={1}>
                                    <Field
                                        component={TextField}
                                        name="state"
                                        type="text"
                                        label={t("State")}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <Box margin={1}>
                                    <FormControl>
                                        <InputLabel shrink={true} htmlFor="LocaleId">
                                            {t("Locale")}
                                        </InputLabel>
                                        <Field
                                            component={TextField}
                                            type="text"
                                            name="locale"
                                            select
                                            variant="standard"
                                            helperText="Please select main language"
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: false,
                                            }}
                                            inputProps={{ name: 'locale', id: 'localeId' }}
                                        >
                                            {options.map(option => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Field>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <Box margin={1}>
                                    <FormControl>
                                        <InputLabel shrink={true} htmlFor="supportLocaleId">
                                            {t("SupportLocale")}
                                        </InputLabel>
                                        <Field
                                            component={Select}
                                            type="text"
                                            name="supportLocale"
                                            multiple={true}
                                            inputProps={{ name: 'supportLocale', id: 'supportLocaleId' }}
                                        >
                                            {options.map(option => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Field>
                                    </FormControl>
                                </Box>
                            </Grid>

                            {isSubmitting && <LinearProgress />}
                            <Grid item xs={12} sm={6} >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                    onClick={submitForm}
                                >
                                    {t("Save")}
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </div >
    );
}
//     return (
//         <div>
//             <NavTab {...props} />
//             <Form>
//                 <Row form>
//                     <Col sm="6">
//                         <FormGroup>
//                             <Label for="name">
//                                 {
//                                     t("RestaurantName")
//                                 }</Label>
//                             <Input type="Text" id="name"
//                                 value={
//                                     restaurant.name || ''
//                                 }
//                                 onChange={
//                                     (e) => setRestaurant({
//                                         ...restaurant,
//                                         name: e.target.value
//                                     })
//                                 } />
//                         </FormGroup>
//                     </Col>
//                     <Col sm="6">
//                         <FormGroup>
//                             <Label for="taxRateId">
//                                 {
//                                     t("TaxRate")
//                                 }</Label>
//                             <Input type="Text" id="taxRateId"
//                                 value={
//                                     restaurant.taxRate
//                                 }
//                                 onChange={
//                                     (e) => setRestaurant({
//                                         ...restaurant,
//                                         taxRate: e.target.value
//                                     })
//                                 } />
//                         </FormGroup>
//                     </Col>


//                     <Col xs="6" sm="6">
//                         <FormGroup>
//                             <Label for="address">
//                                 {
//                                     t("Address")
//                                 }</Label>
//                             <Input type="text" id="address"
//                                 value={
//                                     restaurant.address
//                                 }
//                                 onChange={
//                                     (e) => setRestaurant({
//                                         ...restaurant,
//                                         address: e.target.value
//                                     })
//                                 } />
//                         </FormGroup>
//                     </Col>
//                     <Col xs="6" sm="6">
//                         <FormGroup>
//                             <Label for="city">
//                                 {
//                                     t("City")
//                                 }</Label>
//                             <Input type="text" id="city"
//                                 value={
//                                     restaurant.city
//                                 }
//                                 onChange={
//                                     (e) => setRestaurant({
//                                         ...restaurant,
//                                         city: e.target.value
//                                     })
//                                 } />
//                         </FormGroup>
//                     </Col>
//                     <Col sm="6">
//                         <FormGroup>
//                             <Label for="state">
//                                 {
//                                     t("State")
//                                 }</Label>
//                             <Input type="Text" id="state"
//                                 value={
//                                     restaurant.state
//                                 }
//                                 onChange={
//                                     (e) => setRestaurant({
//                                         ...restaurant,
//                                         state: e.target.value
//                                     })
//                                 } />
//                         </FormGroup>
//                     </Col>
//                     <Col sm="6">
//                         <FormGroup>
//                             <Label for="zipCode">
//                                 {
//                                     t("ZipCode")
//                                 }</Label>
//                             <Input type="Text" id="zipCode"
//                                 value={
//                                     restaurant.zipCode || ''
//                                 }
//                                 onChange={
//                                     (e) => setRestaurant({
//                                         ...restaurant,
//                                         zipCode: e.target.value
//                                     })
//                                 } />
//                         </FormGroup>
//                     </Col>
//                     <Col xs="6" sm="6">

//                         <FormGroup>
//                             <Label for="localeid">
//                                 {
//                                     t("DefaultLanguage")
//                                 }</Label>
//                             <Select id="localeid"
//                                 options={options}
//                                 onChange={setLocaleValue}
//                                 className="mb-3"
//                                 placeholder="Select a default language"
//                                 value={localeValue} />
//                         </FormGroup>
//                     </Col>

//                     <Col xs="6" sm="6">

//                         <FormGroup>
//                             <Label for="localeSupp">
//                                 {
//                                     t("SupportLanguage")
//                                 }</Label>
//                             <Select id="localeSupp"
//                                 isMulti
//                                 options={options}
//                                 onChange={setSupportLocale}
//                                 className="mb-3"
//                                 placeholder="Select support language"
//                                 value={supportLocale} />
//                         </FormGroup>
//                     </Col>
//                     <Button type="button"
//                         onClick={handlePostRestaurant}>
//                         {
//                             t("Save")
//                         } </Button>
//                 </Row>
//             </Form>
//         </div>
//     );
// }

export default Restaurant; 
