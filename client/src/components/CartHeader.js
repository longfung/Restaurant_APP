import React, { useState, useEffect } from 'react'
import { MdShoppingCart, MdAddCircle, MdRemoveCircle, MdArrowBack } from 'react-icons/md';
import {
    Row,
    Col,
    Button,
    Nav,
    NavItem,
    Navbar,
    Jumbotron

} from "reactstrap";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppBar } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { common } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    Arror: {
        fontSize: '48px',
        color: theme.palette.neutral.white,
    },
    SubmitContent: {
        fontSize: '24px',
        color: theme.palette.neutral.white,
        backgroundColor: theme.palette.neutral.black,
        marginTop: theme.spacing(1),

    },
    iconContent: {
        color: theme.palette.neutral.grey,
        fontStyle: 'oblique',
        fontSize: "40px",
        fontWeight: 500,
        verticalAlign: "middle",
        fontWeight: 'fontWeightBold',
    },
    iconTextContent: {
        fontSize: "20px",
        fontWeight: 500,
        align: 'justify',
        marginTop: theme.spacing(2),
        fontWeight: 'fontWeightBold',
        display: 'inline-block',
    },
}));
function CartHeader(props) {
    debugger;
    const classes = useStyles();
    const { t } = useTranslation();

    const setDetail = props.setDetail;
    const setIsOrder = props.setIsOrder;
    const submitOrder = props.submitOrder;
    const cartTotal = props.cartTotal;
    const taxRate = props.taxRate;



    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary">
                <Toolbar fullwidth>
                    <Grid container direction="row">
                        <Grid item xs={2} >
                            {setDetail == undefined
                                ?
                                <Link to='#!' onClick={() => setIsOrder(true)}
                                    className=' flow-right'>
                                    <ArrowBackIcon className={classes.Arror} />
                                </Link>
                                :
                                <Link to='#!' onClick={() => setDetail(
                                    {
                                        isDetail: false
                                    })}
                                    className=' flow-right'>
                                    <ArrowBackIcon className={classes.Arror} />
                                </Link>}
                        </Grid>
                        <Grid item xs={8} >
                            {submitOrder == undefined ?
                                null
                                :
                                <Button className={classes.SubmitContent} onClick={() => submitOrder()}>
                                    {t("SubmitOrder")}
                                </Button>
                            }
                        </Grid>
                        <Grid item xs={2} >

                            <ShoppingCartIcon className={classes.iconContent} />
                            <Typography variant="caption" className={classes.iconTextContent}>

                                ${(cartTotal + (cartTotal * taxRate / 100)).toFixed(2)}
                            </Typography>


                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar >
            <div class="padding05"> </div>
        </div>


        //         <Navbar color="light" light expand="md"></Navbar>
        //         <Jumbotron fluid className="my-0 py-1 bg-info w-100">
        //             <Row>
        //                 <Nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top mr-auto">
        //                     <React.Fragment>
        //                         <Col sm="2" xs="2" className="float-left">
        //                             <NavItem className="mt-0">
        //                                 <Link to='#!' onClick={() => setIsOrder(true)} className=' flow-right'>
        //                                     <MdArrowBack color='white' size='2rem' />
        //                                 </Link>

        //                             </NavItem>
        //                         </Col>
        //                         <Col sm={7} xs="7" className="text-white bg-dark text-bold float-right mx-0 px-0">
        //                             <NavItem>

        //                                 <Button onClick={() => submitOrder()}>
        //                                     {t("SubmitOrder")}
        //                                 </Button>
        //                             </NavItem>

        //                         </Col >


        //                         <Col sm={3} xs="3" className="text-white float-right mx-0 px-0">
        //                             <NavItem>

        //                                 <MdShoppingCart color="gold" size="2rem" />
        //                                 ${(cartTotal + (cartTotal * taxRate / 100)).toFixed(2)}

        //                             </NavItem>

        //                         </Col >
        //                     </React.Fragment>
        //                 </Nav>
        //             </Row>
        //         </Jumbotron>

    )
}
export default CartHeader
