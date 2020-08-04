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
    Label,
    Modal,
    ModalTitle,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap";
import { store } from "./Store";
import { useTranslation, setDefaults } from "react-i18next";
// import { allowedLocale } from "../util/config.json";
const config = require("../util/config.json");


function Customer(props) { // console.log("In Restaurant");

    const { t } = useTranslation();
    const shareContext = useContext(store);
    const setMessage = props.setMessage;
    const [customer, setCustomer] = useState({
        orderId: "",
        name: "",
    });
    const [open, setOpen] = useState(true);

    const submit = () => {
        if (!customer.orderId) {
            let m = t("LoginFirst");
            setMessage({ status: 400, msg: m });
            return;
        }
        if (!customer.name) {
            setCustomer(...ProgressEvent, { name: customer.orderId });
        }
        shareContext.dispatch({ type: "setCustomer", value: customer });
        setOpen(false);
        props.history.push("/order");
    }

    return (
        <div>
            <NavTab {...props} />

            <Modal isOpen={open} fade={open}>
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
            </Modal>

        </div>
    );
}

export default Customer; 
