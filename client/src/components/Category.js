import React, { useState, useEffect, useContext } from "react";
import NavTab from "./NavTab";
import { Col, Row } from "reactstrap";
import { store } from "./Store";
import access from "../util/access";
import { useTranslation } from "react-i18next";
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

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     maxWidth: 752,
//   },
//   demo: {
//     backgroundColor: theme.palette.background.paper,
//   },
//   title: {
//     margin: theme.spacing(4, 0, 2),
//   },
// }));
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




function Category(props) {
  const { t } = useTranslation();
  const shareContext = useContext(store);
  const restaurantId = shareContext.state.restaurant
    ? shareContext.state.restaurant.id
    : null;
  const setMessage = props.setMessage;
  if (!restaurantId) {
    let m = t("LoginFirst");
    setMessage({ status: 400, msg: m });
    props.history.push("/Login");
  }

  const [category, setCategory] = useState({});
  const [categoryList, setCategoryList] = useState([]);


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
    initializeCategory();
    let isMounted = true;
    const promise1 = access.fetchCategoryByRestaurantId(restaurantId, shareContext.state.locale);
    Promise.resolve(promise1)
      .then(res => {
        if (isMounted) {
          setCategoryList(res.data);
        }
      })
      .catch((err) => {
        // let errorObject = JSON.parse(JSON.stringify(err));
        setMessage({ status: 404, msg: err.message });
      });
    return () => isMounted = false;
  }, []);

  const handleAddCategory = (node) => {
    if (node.id != "") {
      handleUpdateCategory(node);
      return;
    }
    let data = {
      category_name: node.category_name,
      locale: shareContext.state.restaurant.locale,
      entityId: access.Entity.category,
      category_description: node.category_description,
      restaurantId: node.restaurant_id
    };
    const promise1 = access.addCategory(data);
    Promise.resolve(promise1)
      .then(res => {
        let m = node.category_name + " is created Successfully !!!";
        setMessage({ status: 200, msg: m });
        getCategoryList();
        initializeCategory();
      }).catch((err) => {
        // let errorObject = JSON.parse(JSON.stringify(err));
        setMessage({ status: 404, msg: err.message });
      });
  };

  const handleUpdateCategory = (node) => {
    let data = {
      id: node.id,
      category_name: node.category_name,
      locale: shareContext.state.restaurant.locale,
      entityId: access.Entity.category,
      category_description: node.category_description,
      restaurantId: node.restaurant_id
    };

    const promise1 = access.updateCategory(data);
    Promise.resolve(promise1)
      .then(res => {
        let m = node.category_name + " is updated Successfully !!!";
        setMessage({ status: 200, msg: m });
        getCategoryList();
        initializeCategory();
      }).catch((err) => {
        // let errorObject = JSON.parse(JSON.stringify(err));
        setMessage({ status: 404, msg: err.message });
      });
  };

  const getCategoryList = () => {
    const promise1 = access.fetchCategoryByRestaurantId(restaurantId, shareContext.state.locale);
    Promise.resolve(promise1)
      .then(res => {
        setCategoryList(res.data);
      }).catch((err) => {
        // let errorObject = JSON.parse(JSON.stringify(err));
        setMessage({ status: 404, msg: err.message });
      });
  };

  const setEdit = obj => {
    setCategory(obj);
  };

  const setDelete = obj => {
    const promise1 = access.deleteCategoryById(obj.id, restaurantId);
    Promise.resolve(promise1)
      .then(res => {
        let m = obj.category_name + " is deleted Successfully !!!";
        setMessage({ status: 200, msg: m });
        if (categoryList && categoryList.length == (rowsPerPage + 1) && page == 1)
          setPage(0);
        getCategoryList();
        initializeCategory();
        debugger;

      }).catch((err) => {
        // let errorObject = JSON.parse(JSON.stringify(err));
        setMessage({ status: 404, msg: err.message });
      });
  };

  const initializeCategory = () => {
    setCategory(prev => ({
      ...prev,
      id: "",
      category_name: null,
      category_description: "",
      restaurant_id: restaurantId
    })
    );
  };

  return (
    <div>
      <NavTab {...props} />
      <Formik
        enableReinitialize={true}
        initialValues={{
          id: category.id,
          category_name: category.category_name === null ||
            category.category_name === undefined
            ? ""
            : category.category_name,
          category_description: category.category_description === null ||
            category.category_description === undefined
            ? ""
            : category.category_description,
          restaurant_id: restaurantId,
        }}
        validate={values => {
          const errors = {};
          if (!values.category_name) {
            errors.category_name = t("E010");
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            setSubmitting(false);
            handleAddCategory(values);
            resetForm({});
          }, 500);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Grid container spacing={2} >
              <Grid item xs={12} sm={12} margin={0} padding={0}>
                <Box margin={0} padding={0}>
                  <Field
                    component={TextField}
                    name="category_name"
                    type="text"
                    label={t("Category")}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} margin={0} padding={0}>
                <Box margin={0} padding={0}>
                  <FormControl fullWidth variant="filled">
                    <Field
                      component={TextField}
                      name="category_description"
                      type="text"
                      label={t("CategoryDescription")}
                    />
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
              {categoryList && categoryList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, rId) => {
                return (
                  <TableRow key={rId} style={{ padding: '0px', margin: '0px', backgroundColor: "#eaeaea", }} >
                    <TableCell style={{ width: '20%' }} align="left">
                      <Typography variant="body1">
                        {item.category_name}
                      </Typography>
                    </TableCell>
                    <TableCell style={{ width: '60%' }} align="left">
                      {item.category_description}
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
        {categoryList && categoryList.length > rowsPerPage ?
          <TablePagination
            rowsPerPageOptions={[8, 25, 100]}
            component="div"
            count={categoryList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
          : null}
      </Paper>

      {/* <Typography variant="h5" className={classes.title}>
        {t("CategoryList")}
      </Typography>
      {categoryList &&
        categoryList.map((item, idx) => (
          <Grid container spacing={0} style={{ padding: 0 }}>
            <Grid item xs={3} >
              {item.category_name}
            </Grid>
            <Grid item xs={7} >
              {item.category_description}
            </Grid>
            <Grid item xs={2}>
              <IconButton edge="end" aria-label="edit" onClick={() => setEdit(item)} >
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => setDelete(item)} >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))} */}

    </div >

  );
}



export default Category;
