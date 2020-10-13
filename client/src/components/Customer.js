import React, { useState, useEffect, useContext } from "react";
import NavTab from "./NavTab";
import access from "../util/access";
import Select from "react-select";
// import {
//     Form,
//     Input,
//     FormGroup,
//     Row,
//     Col,
//     Button,
//     Label,
//     Modal,
//     ModalTitle,
//     ModalHeader,
//     ModalBody,
//     ModalFooter
// } from "reactstrap";
import { store } from "./Store";
import { useTranslation, setDefaults } from "react-i18next";
import { FormControl } from "@material-ui/core";
import { Formik, Form, Field } from 'formik';
import {
    Button,
    LinearProgress,
    Grid,
    Box,
} from '@material-ui/core';
import {
    TextField,
} from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

// import { allowedLocale } from "../util/config.json";
const config = require("../util/config.json");

// function rand() {
//     return Math.round(Math.random() * 20) - 10;
// }

// function getModalStyle() {
//     const top = 50 + rand();
//     const left = 50 + rand();

//     return {
//         top: `${top}%`,
//         left: `${left}%`,
//         transform: `translate(-${top}%, -${left}%)`,
//     };
// }

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        top: '200px',
        left: '600px',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


function Customer(props) { // console.log("In Restaurant");
    const classes = useStyles();
    const { t } = useTranslation();
    const shareContext = useContext(store);
    const setMessage = props.setMessage;
    // const [customer, setCustomer] = useState({
    //     orderId: "12",
    //     name: "Tom",
    // });
    // const [open, setOpen] = useState(shareContext.state.customer == undefined || shareContext.state.customer == null ? true : false);
    const [open, setOpen] = useState(true);
    // const [modalStyle] = React.useState(getModalStyle);

    const handleSubmit = (node) => {
        if (!node.orderId) {
            let m = t("LoginFirst");
            setMessage({ status: 400, msg: m });
            return;
        }
        shareContext.dispatch({
            type: "setCustomer",
            value: {
                orderId: node.orderId,
                name: node.name
            }
        });
        // handleClose();
        // setOpen(false);
        // props.history.push("/order");
        // return;
    }

    const handleClose = () => {

        setOpen(false);
    };

    const userModal = (
        <div className={classes.paper}>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    orderId: shareContext.state.customer === null ||
                        shareContext.state.customer === undefined
                        ? "Tom"
                        : shareContext.state.customer.orderId,
                    name: shareContext.state.customer === null ||
                        shareContext.state.customer === undefined
                        ? "12"
                        : shareContext.state.customer.name,
                }}
                validate={values => {
                    const errors = {};
                    if (!values.orderId) {
                        errors.orderId = t("E010");
                    }
                    if (!values.name) {
                        errors.name = t("E010");
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setTimeout(() => {
                        setSubmitting(false);
                        // handleClose();
                        handleSubmit(values);
                        resetForm({});

                    }, 500);
                }}
            >
                {({ submitForm, isSubmitting, values }) => (
                    <Form>
                        <Grid container spacing={2} >
                            <Grid item xs={12} sm={12} margin={0} padding={0}>
                                <Box margin={0} padding={0}>
                                    <Field
                                        component={TextField}
                                        name="name"
                                        type="text"
                                        label={t("CustomerName")}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} margin={0} padding={0}>
                                <Box margin={0} padding={0}>
                                    <FormControl fullWidth variant="filled">
                                        <Field
                                            component={TextField}
                                            name="orderId"
                                            type="text"
                                            label={t("orderId")}
                                        />
                                    </FormControl>
                                </Box>
                            </Grid>
                            {isSubmitting && <LinearProgress />}
                            <Grid container spacing={0} alignItems="center">
                                <Grid item xs={12} sm={6} >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={isSubmitting}
                                        onClick={submitForm}
                                    >
                                        Submit
                                </Button>
                                &nbsp;
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={isSubmitting}
                                        onClick={handleClose}
                                    >
                                        Close
                                </Button >

                                </Grid>
                            </Grid>
                        </Grid>
                    </Form>
                )
                }
            </Formik >
        </div >
    )

    return (
        <div>
            {/* <NavTab {...props} /> */}

            <Modal
                open={open}

                onClose={handleClose}

                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {userModal}
            </Modal>
            {/* <Modal isOpen={open} fade={open}>
                <ModalHeader>{t("CustomerInfo")}</ModalHeader>
                <ModalBody>
                    <Form>
                        <Row form>
                            <Col sm="12" xs="12">
                                <FormGroup>
                                    <Label for="name">
                                        {
                                            t("CustomerName")
                                        }</Label>
                                    <Input type="Text" id="name"
                                        value={
                                            customer.name || ''
                                        }
                                        onChange={
                                            (e) => setCustomer({
                                                ...customer,
                                                name: e.target.value
                                            })
                                        } />
                                </FormGroup>
                            </Col>
                            <Col sm="12" xs="12">
                                <FormGroup>
                                    <Label for="orderId">
                                        {
                                            t("orderId")
                                        }</Label>
                                    <Input type="Text" id="orderId"
                                        value={
                                            customer.orderId || ''
                                        }
                                        onChange={
                                            (e) => setCustomer({
                                                ...customer,
                                                orderId: e.target.value
                                            })
                                        } />
                                </FormGroup>
                            </Col>


                        </Row>

                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button type="button"
                        onClick={submit}>
                        {
                            t("Save")
                        } </Button>
                </ModalFooter>
            </Modal> */}

        </div>
    );
}

export default Customer; 
