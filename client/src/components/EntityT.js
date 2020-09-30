import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import axios from "axios";
import NavTab from "./NavTab";
// import img1 from "../images/img7.jpg"
// import img1 from "../../../server/images/img3.jpg"
// import {
//     Form,
//     Input,
//     Row,
//     Col,
//     Button,
//     // FormGroup,
//     Label
// } from "reactstrap";
import { store } from "./Store";
import "../index.css";
import access from "../util/access";
import { useTranslation } from 'react-i18next';
import Editpan from "./Editpan";
import Displaypan from "./DisplayPan";
import ScrollShadow from 'react-scroll-shadow';
import { Card } from '../styleds';

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
import { FormControl } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
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

const useStyles = makeStyles(theme => ({
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
    buttonA: {
        backgroundColor: theme.palette.neutral.blue,
        color: theme.palette.neutral.white,
    },
    buttonD: {
        backgroundColor: theme.palette.neutral.grey,
        color: theme.palette.neutral.black,
    },
}));

function EntityT(props) {
    const shareContext = useContext(store);
    const { t } = useTranslation();
    // debugger;
    // const restaurantId = shareContext.state.restaurant != null ? shareContext.state.restaurant.id : null;
    const defaultLanguage = shareContext.state.restaurant
        ? shareContext.state.restaurant.locale
        : null;
    const support_locale = shareContext.state.restaurant
        ? shareContext.state.restaurant.support_locale.split(',')
        : null;

    // const defaultLanguage = shareContext.state.restaurant.locale;
    // const support_locale = shareContext.state.restaurant.support_locale.split(',');
    const setMessage = props.setMessage;
    const restaurantId = shareContext.state.restaurant
        ? shareContext.state.restaurant.id
        : null;
    if (!restaurantId) {
        let m = t("LoginFirst");
        setMessage({ status: 400, msg: m });
        props.history.push("/Login");
    }

    const [menuT, setMenuT] = useState({});
    const [menuTClone, setMenuTClone] = useState({});
    const [menuTList, setMenuTList] = useState([]);
    const [entity, setEntity] = useState(1);
    const [lang, setLang] = useState(null);
    const [bActive, setBActive] = useState(false);



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
        getMenuTList(lang, entity);
    }, []);

    const getMenuTList = (locale, entity) => {
        const promise1 = access.fetchEntityTByRestaurantId(restaurantId,
            locale, entity);
        Promise.resolve(promise1).then((res) => {
            setMenuTList(res.data);
        }).catch((err) => {
            // let errorObject = JSON.parse(JSON.stringify(err));
            setMessage({ status: 404, msg: err.message });
        });
    };

    const handleUpdateMenu = (node) => {
        postUpdateMenu(node);
        initialMenuT();
    };

    const postUpdateMenu = (node) => {
        debugger;
        const data = {
            id: node.id,
            namet: entity == 3 ? shareContext.state.menuDescription : node.namet,
            locale: lang,
            entityId: entity,
            restaurantId: restaurantId
        };
        const promise1 = access.updateEntityT(data);
        Promise.resolve(promise1).then((res) => {
            let m = menuT.name + " is updated Successfully !!!";
            setMessage({ status: 200, msg: m });
            getMenuTList(lang, entity);
        }).catch((err) => {
            // let errorObject = JSON.parse(JSON.stringify(err));
            setMessage({ status: 404, msg: err.message });
        });
    };

    const setEdit = (obj) => {
        setMenuT({
            id: obj.id,
            name: obj.name ? obj.name : null,
            description: obj.name == null ? '' : obj.name,
            namet: obj.namet == null ? '' : obj.namet,
            locale: obj.locale,
            entityId: entity,
            RrstaurantId: obj.restaurantId
        });
        setMenuTClone({
            id: obj.id,
            description: obj.description ? obj.description : null,
        });
        if (lang && obj.nameT !== null)
            setBActive(true);
    };

    const setDelete = (obj) => {
        const promise1 = access.deleteEntityTById(obj.id);
        Promise.resolve(promise1).then((res) => {
            let m = obj.name + " is deleted Successfully !!!";
            setMessage({ status: 200, msg: m });
            if (menuTList && menuTList.length == (rowsPerPage + 1) && page == 1)
                setPage(0);
            getMenuTList();
            // setMenu({ ...menu, name: '', price: 0, category_id: '', path: res.data.filepath });
            initialMenuT();
        }).catch((err) => {
            // let errorObject = JSON.parse(JSON.stringify(err));
            setMessage({ status: 404, msg: err.message });
        });
    };
    const initialMenuT = () => {
        setMenuT({
            ...menuT,
            id: "",
            name: "",
            description: "",
            namet: "",
            locale: "",
            entityId: "",
            restaurantId: ""
        });
        setMenuTClone({
            ...menuTClone,
            id: "",
            description: ""
        });
        setBActive(false);
    };

    const switchLanguage = (elem) => {
        setLang(elem);
        getMenuTList(elem, entity);
    }

    const switchEntity = (elem) => {
        setEntity(elem);
        getMenuTList(lang, elem);
    }


    return (
        <div>
            <NavTab {...props} />
            <Formik
                enableReinitialize={true}
                initialValues={{
                    id: menuT.id,
                    name: menuT.name === null ||
                        menuT.name === undefined
                        ? ""
                        : menuT.name,
                    namet: menuT.namet === null ||
                        menuT.namet === undefined
                        ? ""
                        : menuT.namet,
                    restaurant_id: restaurantId,
                }}
                validate={values => {
                    const errors = {};
                    if (!values.namet) {
                        errors.namet = t("E010");
                    }
                    if (lang === null ||
                        lang === undefined) {
                        errors.nameT = "Please choose locale language";
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setTimeout(() => {
                        setSubmitting(false);
                        handleUpdateMenu(values);
                        resetForm({});
                    }, 500);
                }}
            >
                {({ submitForm, isSubmitting }) => (
                    <Form>
                        <Grid container spacing={2} >
                            <Grid item xs={12} sm={6} padding={0}>
                                <Button
                                    variant="contained"
                                    // color={`${entity == 1 ? 'neutral' : 'default'}`}
                                    className={`${entity == 1 ? classes.buttonA : classes.buttonD}`}
                                    disabled={isSubmitting}
                                    onClick={() => switchEntity(1)}
                                >
                                    {t("MenuName")}
                                </Button>
                                <Button
                                    variant="contained"
                                    // className={classes.button}
                                    className={`${entity == 2 ? classes.buttonA : classes.buttonD}`}
                                    disabled={isSubmitting}
                                    onClick={() => switchEntity(2)}
                                >
                                    {t("Category")}
                                </Button>
                                <Button
                                    variant="contained"
                                    className={`${entity == 3 ? classes.buttonA : classes.buttonD}`}
                                    disabled={isSubmitting}
                                    onClick={() => switchEntity(3)}
                                >
                                    {t("MenuDesc")}
                                </Button>
                                <Button
                                    variant="contained"
                                    className={`${entity == 4 ? classes.buttonA : classes.buttonD}`}
                                    disabled={isSubmitting}
                                    onClick={() => switchEntity(4)}
                                >
                                    {t("TopppingDesc")}
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6} padding={0}>
                                {support_locale && support_locale.map(elem =>
                                    elem !== defaultLanguage ?
                                        <span>
                                            <Button
                                                variant="contained"
                                                className={`${lang == elem ? classes.buttonA : classes.buttonD}`}
                                                // color={`${lang == elem ? 'primary' : 'default'}`}
                                                onClick={
                                                    () => switchLanguage(elem)
                                                }>
                                                {t(elem)}</Button>
                                            &nbsp;
                                        </span>
                                        : null
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6} margin={0} padding={0}>
                                <Box margin={0} padding={0}>
                                    <Field disabled
                                        component={TextField}
                                        name="name"
                                        type="text"
                                        label={t("DefaultLocale")}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} margin={0} padding={0}>
                                <Box margin={0} padding={0}>
                                    <FormControl fullWidth variant="filled">
                                        <Field
                                            component={TextField}
                                            name="namet"
                                            type="text"
                                            label={t("TargetLocale")}
                                        />
                                    </FormControl>
                                </Box>
                            </Grid>
                            {isSubmitting && <LinearProgress />}
                            <Grid item xs={12} sm={6} >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting || !bActive}
                                    onClick={submitForm}
                                >
                                    Submit
            </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>

            {/* <Form>
                    <Row form>
                        <Col sm="6">
                            <Button className={`${entity == 1 ? 'btn-outline-primary active' : null}`} onClick={
                                () => switchEntity(1)
                            }>
                                {t("MenuName")}</Button>
                            &nbsp;
                        <Button className={`${entity == 2 ? 'btn-outline-primary active' : null}`} onClick={
                                () => switchEntity(2)
                            }>
                                {t("Category")}</Button>
                            &nbsp;
                        <Button className={`${entity == 3 ? 'btn-outline-primary active' : null}`} onClick={
                                () => switchEntity(3)
                            }>
                                {t("MenuDesc")}</Button>
                                &nbsp;
                        <Button className={`${entity == 4 ? 'btn-outline-primary active' : null}`} onClick={
                                () => switchEntity(4)
                            }>
                                {t("TopppingDesc")}</Button>
                        </Col>
                        <Col sm="6">
                            {support_locale && support_locale.map(elem =>
                                elem !== defaultLanguage ?
                                    <span>
                                        <Button className={`${lang == elem ? 'btn-outline-primary active' : null}`} onClick={
                                            () => switchLanguage(elem)
                                        }>
                                            {t(elem)}</Button>
                                &nbsp;
                                </span> : null

                            )}
                        </Col>
                    </Row>
                    {entity == 3 ?
                        <Row form>
                            <Col sm="6">
                                <Label>  {t("DefaultLocale")}&nbsp;({defaultLanguage})</Label>
                                <Displaypan setMenu={setMenuTClone} menu={menuTClone} />
                            </Col>
                            <Col sm="6">
                                <Label>  {t("TargetLocale")}
                            ({lang == null ? t("ChooseLanguage") : lang})
                            </Label>

                                <Editpan setMenu={setMenuT} menu={menuT} />
                            </Col>

                        </Row>
                        :


                        <Row form>
                            <Col sm="6">
                                <FormGroup className="float-left">
                                    <Label for="name">{t("DefaultLocale")}&nbsp;({defaultLanguage})</Label>
                                    <Input disabled type="text"
                                        value={
                                            menuT.name
                                        }
                                        id="name" />
                                </FormGroup>
                            </Col>
                            <Col sm="6">
                                <FormGroup className="float-left">
                                    <Label for="nameT">{t("TargetLocale")}
                                ({lang == null ? t("ChooseLanguage") : lang})
                                </Label>
                                    <Input type="text" id="nameT"
                                        value={
                                            menuT.namet
                                        }
                                        onChange={
                                            (e) => setMenuT({
                                                ...menuT,
                                                namet: e.target.value
                                            })
                                        } />
                                </FormGroup>
                            </Col>
                        </Row>
                    }
                    <Row form>
                        <Col xs="6" sm="6">
                            <Button onClick={handleUpdateMenu}>
                                {t("Save")}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div> */}


            <hr></hr>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table" size="small" aria-label="a dense table" >
                        <TableBody>
                            {menuTList && menuTList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, rId) => {
                                return (
                                    <TableRow key={rId} style={{ padding: '0px', margin: '0px', backgroundColor: "#eaeaea", }} >
                                        <TableCell style={{ width: '50%' }} align="left">
                                            <Typography variant="body1">
                                                {entity == 3 ?
                                                    item.description ? item.description.substring(0, 24) : null
                                                    :
                                                    (item.name)
                                                }
                                            </Typography>
                                        </TableCell>
                                        <TableCell style={{ width: '30%' }} align="left">
                                            {
                                                item.namet ? item.namet.substring(0, 24) : null
                                            }
                                        </TableCell>
                                        <TableCell style={{ width: '20%' }} align="left">
                                            <IconButton edge="end" aria-label="edit" onClick={() => setEdit(item)} >
                                                <Tooltip title={t("Edit")} arror>
                                                    <EditIcon />
                                                </Tooltip>
                                            </IconButton>
                                            {/* <IconButton edge="end" aria-label="delete" onClick={() => setDelete(item)} >
                                                <Tooltip title={t("Delete")} arror>
                                                    <DeleteIcon />
                                                </Tooltip>
                                            </IconButton> */}

                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                {menuTList && menuTList.length > rowsPerPage ?
                    <TablePagination
                        rowsPerPageOptions={[8, 25, 100]}
                        component="div"
                        count={menuTList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                    : null}
            </Paper>

            {/* <Row>
                <Col sm={12}>


                    <Card>
                        <ScrollShadow isShadow={true} scrollWidth={10} scrollPadding={5}>
                            <Row>
                                <Col sm="5">
                                    <h2>{t("TranslationList")}</h2>
                                </Col>

                            </Row>
                            <ul> {
                                menuTList && menuTList.map((item, idx) => (
                                    <Row key={idx}>
                                        <Col sm="5">
                                            {entity == 3 ?
                                                item.description ? item.description.substring(0, 24) : null
                                                :
                                                (item.name)
                                            }
                                        </Col>
                                        <Col sm={5}>
                                            {
                                                item.namet ? item.namet.substring(0, 24) : null
                                            }</Col>
                                        <Col sm={1}>
                                            <Button onClick={
                                                () => setEdit(item)
                                            }>{t("Edit")}</Button>
                                        </Col>
                                        <Col sm={1}>
                                            <Button onClick={
                                                () => setDelete(item)
                                            }>{t("Delete")}</Button>
                                        </Col>
                                    </Row>
                                ))
                            } </ul>
                        </ScrollShadow>
                    </Card>
                </Col>
            </Row> */}

        </div>
    );
}
export default EntityT;
