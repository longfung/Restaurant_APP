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
//     Label
// } from "reactstrap";
import { store } from "./Store";
import { useTranslation, setDefaults } from "react-i18next";
import { MdCheckBox } from "react-icons/md";

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
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const config = require("../util/config.json");

const useStyles = makeStyles({
    root: {
        width: '100%',
        padding: '1px 1px',
        margin: '1px 1px',
    },
    container: {
        maxHeight: 500,
        margin: '1px 1px',
        padding: '0px 0px'
    },
    content: {
        // backgroundColor: 'primary',
        // color: 'white',
        fontStyle: 'oblique',
        fontSize: "30px",
        fontWeight: 500,
        textAlign: "left",
        fontWeight: 'fontWeightBold',
    },
});

function Topping(props) { // console.log("In Restaurant");
    // debugger;
    const { t } = useTranslation();
    const shareContext = useContext(store);
    const restaurantId =
        shareContext.state.restaurant != null
            ? shareContext.state.restaurant.id
            : null;
    const setMessage = props.setMessage;
    if (!restaurantId) {
        let m = t("LoginFirst");
        setMessage({ status: 400, msg: m });
        props.history.push("/Login");
    }
    const [toppingList, setToppingList] = useState([]);
    const [toppingGroup, setToppingGroup] = useState('');
    const [toppingGroupList, setToppingGroupList] = useState([]);
    const [topping, setTopping] = useState({
        id: "",
        name: "",
        topping_group: "",
        apply_order: false,
        apply_item: false,
        apply_default: false,
        price: 0,
        restaurant_id: restaurantId
    });
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(8);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    useEffect(() => {
        getToppingList();
        buildToppingGroupList();
    }, []);

    const buildToppingGroupList = () => {
        // debugger;

        const options = config.toppingGroup.map(v => ({
            value: v,
            label: v
        }));
        setToppingGroupList(options);
    }

    const handleTopingSave = (node) => {
        debugger;
        let data = {
            id: node.id,
            name: node.name,
            topping_group: node.topping_group,
            apply_order: node.apply_order,
            apply_item: node.apply_item,
            apply_default: node.apply_default,
            price: node.price,
            locale: shareContext.state.restaurant.locale,
            entityId: access.Entity.topping,
            restaurant_id: node.restaurant_id
        };
        if (node.id != "")
            updateTopping(data);
        else
            addTopping(data);
    }

    const addTopping = (data) => {
        // update the group from select       
        const promise1 = access.addTopping(data);
        Promise.resolve(promise1)
            .then(res => {
                let m = topping.name + " is created Successfully !!!";
                setMessage({ status: 200, msg: m });
                getToppingList();
                initializeTopping();
            }).catch((err) => {
                // let errorObject = JSON.parse(JSON.stringify(err));
                setMessage({ status: 404, msg: err.message });
            });
    };

    const updateTopping = (data) => {
        const promise1 = access.updateTopping(data);
        Promise.resolve(promise1)
            .then(res => {
                let m = topping.name + " is updated Successfully !!!";
                setMessage({ status: 200, msg: m });
                getToppingList();
                initializeTopping();
            }).catch((err) => {
                // let errorObject = JSON.parse(JSON.stringify(err));
                setMessage({ status: 404, msg: err.message });
            });
    };

    const getToppingList = () => {
        let isMounted = true;
        const promise1 = access.fetchToppingByRestaurantId(restaurantId, shareContext.state.locale);
        Promise.resolve(promise1)
            .then(res => {
                // console.log(res);
                if (isMounted) {
                    setToppingList(res.data);
                }

            }).catch((err) => {
                // let errorObject = JSON.parse(JSON.stringify(err));
                setMessage({ status: 404, msg: err.message });
            }).finally(() => {
                isMounted = false;
            })

    };

    const setEdit = elem => {
        setTopping(elem);
        setToppingGroup({
            value: elem.topping_group,
            label: elem.topping_group
        })
    };

    const setDelete = elem => {
        const promise = access.deleteToppingById(elem.id, elem.restaurant_id);
        Promise.resolve(promise)
            .then(res => {
                let m = elem.name + " is deleted Successfully !!!";
                setMessage({ status: 200, msg: m });
                if (toppingList && toppingList.length == (rowsPerPage + 1) && page == 1)
                    setPage(0);
                getToppingList();
                initializeTopping();
            }).catch((err) => {
                // let errorObject = JSON.parse(JSON.stringify(err));
                setMessage({ status: 404, msg: err.message });
            });
    };

    const initializeTopping = () => {
        setToppingGroup('');
        setTopping({
            id: "",
            name: "",
            topping_group: "",
            apply_order: false,
            apply_item: false,
            apply_default: false,
            price: 0,
            restaurant_id: shareContext.state.restaurant.id
        });
    };

    return (
        <div>
            <NavTab {...props} />
            <Formik
                enableReinitialize={true}
                initialValues={{
                    id: topping.id,
                    name: topping.name === null ||
                        topping.name === undefined
                        ? ""
                        : topping.name,
                    topping_group: topping.toppin_group === null ||
                        topping.topping_group === undefined
                        ? ""
                        : topping.topping_group,
                    apply_order: topping.apply_order === null ||
                        topping.apply_order === undefined
                        ? false
                        : topping.apply_order,
                    apply_item: topping.apply_item === null ||
                        topping.apply_item === undefined
                        ? false
                        : topping.apply_item,
                    apply_default: topping.apply_default === null ||
                        topping.apply_default === undefined
                        ? false
                        : topping.apply_default,
                    price: topping.price === null ||
                        topping.price === undefined
                        ? 0
                        : topping.price,
                    restaurant_id: restaurantId,
                }}
                validate={values => {
                    const errors = {};
                    // if (!values.name) {
                    //     errors.name = t("E010");
                    // }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setTimeout(() => {
                        setSubmitting(false);
                        handleTopingSave(values);
                        resetForm({});
                    }, 500);
                }}
            >
                {({ submitForm, isSubmitting, values, setFieldValue }) => (
                    <Form>
                        <Grid container spacing={0} >
                            <Grid item xs={12} sm={4} margin={0} padding={0}>
                                <Box margin={0} padding={0}>
                                    <Field
                                        component={TextField}
                                        name={"name"}
                                        type="text"
                                        label={t("ToppingName")}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={4} margin={0} padding={0}>
                                <Box margin={1}>
                                    <FormControl>
                                        <InputLabel shrink={true} htmlFor="LocaleId">
                                            {t("ToppingGroup")}
                                        </InputLabel>
                                        <Field
                                            component={TextField}
                                            type="text"
                                            name="topping_group"
                                            select
                                            variant="standard"
                                            helperText="Please select a topping group"
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: false,
                                            }}
                                            inputProps={{ name: 'topping_group', id: 'localeId' }}
                                        >
                                            {toppingGroupList.map(option => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Field>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={4} margin={0} padding={0}>
                                <Box margin={0} padding={0}>
                                    <Field
                                        component={TextField}
                                        name="price"
                                        type="number"
                                        label={t("ToppingPrice")}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={4} margin={0} padding={0}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={values.apply_order}
                                            onChange={() => setFieldValue("apply_order", !values.apply_order)}
                                            name="apply_order"
                                            color="primary"
                                        />
                                    }
                                    label={t("ApplyOrder")}
                                />

                            </Grid>
                            <Grid item xs={12} sm={4} margin={0} padding={0}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={values.apply_item}
                                            onChange={() => setFieldValue("apply_item", !values.apply_item)}
                                            name="apply_item"
                                            color="primary"
                                        />
                                    }
                                    label={t("ApplyItem")}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} margin={0} padding={0}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={values.apply_default}
                                            onChange={() => setFieldValue("apply_default", !values.apply_default)}
                                            name="apply_default"
                                            color="primary"
                                        />
                                    }
                                    label={t("defaultTopping")}
                                />
                            </Grid>
                            {isSubmitting && <LinearProgress />}
                            <Grid item xs={12} sm={6} >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                    onClick={submitForm}
                                >
                                    Submit
              </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
            <hr></hr>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table" size="small" aria-label="a dense table" >
                        <TableBody>
                            {toppingList && toppingList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, rId) => {
                                return (
                                    <TableRow key={rId} style={{ padding: '0px', margin: '0px', backgroundColor: "#eaeaea", }} >
                                        <TableCell style={{ width: '50%' }} align="left">
                                            <Typography variant="body1">
                                                {item.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell style={{ width: '30%' }} align="left">
                                            {item.topping_group}
                                        </TableCell>
                                        <TableCell style={{ width: '20%' }} align="left">
                                            <IconButton edge="end" aria-label="edit" onClick={() => setEdit(item)} >
                                                <Tooltip title={t("Edit")}>
                                                    <EditIcon />
                                                </Tooltip>
                                            </IconButton>
                                            <IconButton edge="end" aria-label="delete" onClick={() => setDelete(item)} >
                                                <Tooltip title={t("Delete")}>
                                                    <DeleteIcon />
                                                </Tooltip>
                                            </IconButton>

                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                {toppingList && toppingList.length > rowsPerPage ?
                    <TablePagination
                        rowsPerPageOptions={[8, 25, 100]}
                        component="div"
                        count={toppingList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                    : null}
            </Paper>
        </div >
    );
}

//         <div>
//             <NavTab {...props} />
//             <Form>
//                 <Row form>
//                     <Col sm="6">
//                         <FormGroup className="float-left">
//                             <Label for="name">
//                                 {
//                                     t("ToppingName")
//                                 }</Label>
//                             <Input type="Text" id="name"
//                                 value={
//                                     topping.name || ''
//                                 }
//                                 onChange={
//                                     (e) => setTopping({
//                                         ...topping,
//                                         name: e.target.value
//                                     })
//                                 } />
//                         </FormGroup>
//                     </Col>
//                     <Col sm="6">
//                         <FormGroup className="float-left">
//                             <Label for="group">
//                                 {
//                                     t("ToppingGroup")
//                                 }</Label>
//                             <Select id="group"
//                                 options={toppingGroupList}
//                                 onChange={setToppingGroup}
//                                 className="mb-3"
//                                 placeholder={t("SelectToppingGroup")}
//                                 value={toppingGroup} />

//                         </FormGroup>
//                     </Col>


//                     <Col xs="6" sm="6">
//                         <FormGroup className="float-left">

//                             <Input className="form-control margin-left" type="checkbox" id="applyOrder"
//                                 // <MdAccountCircle color="gold" size="2rem" />
//                                 checked={
//                                     topping.apply_order
//                                 }
//                                 onChange={
//                                     (e) => setTopping({
//                                         ...topping,
//                                         apply_order: e.target.checked
//                                     })
//                                 } />
//                             <Label for="applyOrder" className="indented-checkbox-text">
//                                 {
//                                     t("ApplyOrder")
//                                 }</Label>
//                         </FormGroup>
//                     </Col>
//                     <Col xs="6" sm="6">
//                         <FormGroup className="float-left">

//                             <Input className="form-control" type="checkbox" id="applyItem"
//                                 checked={
//                                     topping.apply_item
//                                 }
//                                 onChange={
//                                     (e) => setTopping({
//                                         ...topping,
//                                         apply_item: e.target.checked
//                                     })
//                                 } />
//                             <Label for="applyItem" className="indented-checkbox-text" >
//                                 {
//                                     t("ApplyItem")
//                                 }</Label>
//                         </FormGroup>
//                     </Col>
//                     <Col sm="6">
//                         <FormGroup className="float-left">

//                             <Input className="form-control" type="checkbox" id="default"

//                                 checked={
//                                     topping.apply_default
//                                 }
//                                 onChange={
//                                     (e) => setTopping({
//                                         ...topping,
//                                         apply_default: e.target.checked
//                                     })
//                                 } />
//                             <Label for="default" className="indented-checkbox-text ">
//                                 {
//                                     t("defaultTopping")
//                                 }</Label>
//                         </FormGroup>
//                     </Col>
//                     <Col sm="6">
//                         <FormGroup className="float-left">
//                             <Label for="price">
//                                 {
//                                     t("ToppingPrice")
//                                 }</Label>
//                             <Input type="Text" id="price"
//                                 value={
//                                     topping.price || 0
//                                 }
//                                 onChange={
//                                     (e) => setTopping({
//                                         ...topping,
//                                         price: e.target.value
//                                     })
//                                 } />
//                         </FormGroup>
//                     </Col>
//                     <Col sm="6">
//                         <Button type="button"
//                             onClick={handleTopingSave}>
//                             {
//                                 t("Save")
//                             } </Button>
//                     </Col>
//                 </Row>
//             </Form>
//             <hr></hr>
//             <div>
//                 <h2>{t("ToppingList")}</h2>
//                 <ul>
//                     {toppingList &&
//                         toppingList.map((item, idx) => (
//                             <Row key={idx}>
//                                 <Col sm={4}>{item.name}</Col>
//                                 <Col sm={6}>{item.topping_group}</Col>
//                                 <Col sm={1}>
//                                     <Button onClick={() => setEdit(item)}>{t("Edit")}</Button>
//                                 </Col>
//                                 <Col sm={1}>
//                                     <Button onClick={() => setDelete(item)}>{t("Delete")}</Button>
//                                 </Col>
//                             </Row>
//                         ))}
//                 </ul>
//             </div>
//         </div>
//     );
// }

export default Topping;
