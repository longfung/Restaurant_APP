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
import CartHeader from './CartHeader';
import ItemTopping from './ItemTopping';
import { Grid } from "@material-ui/core";
import { Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles((theme) => ({
    selectEmpty: {
        marginTop: theme.spacing(0),
    },
    iconStyle: {
        '&:before': {
            height: '2px',
            backgroundColor: theme.palette.neutral.white,
            color: theme.palette.neutral.white,
        }
    },
    iconContent: {
        color: theme.palette.neutral.gold,
        fontStyle: 'oblique',
        fontSize: "40px",
        fontWeight: 500,
        verticalAlign: "middle",
        fontWeight: 'fontWeightBold',
    },
    textNameContent: {
        fontSize: "16px",
        fontWeight: 700,
        align: 'justify',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(0),
        paddingTop: theme.spacing(0),
        paddingBottom: theme.spacing(0),
        fontWeight: 'fontWeightBold',
        // display: 'inline-block',
    },
    textDescContent: {
        fontSize: "10px",
        fontWeight: 300,
        // align: 'justify',
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(0),
        paddingTop: theme.spacing(0),
        paddingBottom: theme.spacing(0),
        display: 'inline-block',
    },
    textSubContent: {
        fontSize: "24px",
        fontWeight: 500,
        // align: 'justify',
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(0),
        paddingTop: theme.spacing(0),
        paddingBottom: theme.spacing(0),
        // display: 'inline-block',
    },
    icon: {
        fontSize: 'small',
        color: theme.palette.neutral.black,
        padding: theme.spacing(0),
        margin: theme.spacing(0),
    }


}));

function Cart(props) {
    debugger;
    const classes = useStyles();
    const { t } = useTranslation();
    const cartList = props.cartList;
    const isQuantity = props.isQuantity;
    const addToOrder = props.addToOrder;
    const removeFromOrder = props.removeFromOrder;
    const submitOrder = props.submitOrder;
    const setIsOrder = props.setIsOrder;
    const cartTotal = props.cartTotal;
    const taxRate = props.taxRate;
    let tSum = parseFloat(0);
    const toppingApplyOrder = props.toppingApplyOrder;
    const toppingMap = props.toppingMap;
    const toppingOrderResult = props.toppingOrderResult;
    const [resultCount, setResultCount] = useState(0);

    useEffect(() => {
        let cnt = 0;
        toppingOrderResult.map(elem => {
            if (elem !== false)
                cnt++;
        })
        setResultCount(cnt - 1);
    }, [])

    return (
        <div>
            <CartHeader
                taxRate={taxRate}
                cartTotal={cartTotal}
                setIsOrder={setIsOrder}
                submitOrder={submitOrder} />
            {/* <Navbar color="light" light expand="md"></Navbar>
            <Jumbotron fluid className="my-0 py-1 bg-info w-100">
                <Row>
                    <Nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top mr-auto">
                        <React.Fragment>
                            <Col sm="2" xs="2" className="float-left">
                                <NavItem className="mt-0">
                                    <Link to='#!' onClick={() => setIsOrder(true)} className=' flow-right'>
                                        <MdArrowBack color='white' size='2rem' />
                                    </Link>

                                </NavItem>
                            </Col>
                            <Col sm={7} xs="7" className="text-white bg-dark text-bold float-right mx-0 px-0">
                                <NavItem>

                                    <Button onClick={() => submitOrder()}>
                                        {t("SubmitOrder")}
                                    </Button>
                                </NavItem>

                            </Col >


                            <Col sm={3} xs="3" className="text-white float-right mx-0 px-0">
                                <NavItem>

                                    <MdShoppingCart color="gold" size="2rem" />
                                    ${(cartTotal + (cartTotal * taxRate / 100)).toFixed(2)}

                                </NavItem>
 
                            </Col >
                        </React.Fragment>
                    </Nav>
                </Row>
            </Jumbotron> */}
            {/* <div class="padding70"> </div> */}

            <Grid container spacing={0}>
                <Grid item xs={12}>
                    {toppingApplyOrder && toppingApplyOrder.length > 0 ?
                        <b>{t("Note")}:&nbsp;&nbsp;</b>
                        :
                        null
                    }

                    {toppingApplyOrder && toppingApplyOrder.map((elem, idx) => {
                        const g = (toppingMap[elem])[1];
                        const n = (toppingMap[elem])[0]
                        // if (idx == 0)
                        //     return <span>{t("Note")}:&nbsp;&nbsp;</span>
                        // debugger;
                        if (g == 'G0') {
                            if (toppingOrderResult[idx] == true) {
                                if (idx < resultCount)
                                    return <span key={idx}>{n},&nbsp;&nbsp;</span>
                                else
                                    return <span key={idx}>{n}</span>
                            }
                        } else {
                            // debugger;
                            const res = toppingMap[toppingOrderResult[idx]];
                            if (idx < resultCount)
                                return <span key={idx}>{res[0]},&nbsp;&nbsp;</span>
                            else
                                return <span key={idx}>{res[0]}</span>
                        }

                    })}
                </Grid>
            </Grid>
            {
                cartList && cartList.map((elem, idx) => {
                    tSum = 0;
                    return (
                        <div key={idx}>

                            <Grid container spacing={0}>
                                <Grid item xs={4} >
                                    <Typography className={classes.textNameContent}>{idx + 1}.&nbsp;&nbsp;{elem.name}</Typography>
                                    {/* <ItemTopping elem={elem} toppingMap={toppingMap} /> */}
                                    {elem.isTopping > 0 ?
                                        <Grid item xs={12} >
                                            <Typography className={classes.textDescContent} component="p">
                                                {t("Note")}:&nbsp;&nbsp;
                                            </Typography>
                                            {elem.toppingArray && elem.toppingArray.map((item, idx) => {
                                                const g = (toppingMap[item])[1];
                                                const n = (toppingMap[item])[0];
                                                const p = (toppingMap[item])[2];
                                                // if (idx == 0) tSum = 0;
                                                if (elem.toppingResult[idx] == true) {
                                                    tSum = p == 0 ? tSum : tSum + parseFloat(p);
                                                }
                                                // if (idx == 0)
                                                //     return <span>{t("Note")}:&nbsp;&nbsp;</span>
                                                // debugger;
                                                if (g == 'G0') {
                                                    if (elem.toppingResult[idx] == true) {
                                                        if (idx != 0)
                                                            return (
                                                                <Typography key={idx} className={classes.textDescContent} component="p">
                                                                    ,&nbsp;&nbsp;{n}{p > 0 ? '($' + p + ")" : null}
                                                                </Typography>)
                                                        else
                                                            return <Typography key={idx} className={classes.textDescContent} component="p">
                                                                {n}{p > 0 ? '($' + p + ")" : null}
                                                            </Typography>
                                                    }
                                                } else {
                                                    const res = toppingMap[elem.toppingResult[idx]];
                                                    if (idx != 0)
                                                        return <Typography key={idx} className={classes.textDescContent} component="p">
                                                            ,&nbsp;&nbsp;{res[0]}
                                                        </Typography>
                                                    else
                                                        return <Typography key={idx} className={classes.textDescContent} component="p">
                                                            {res[0]}
                                                        </Typography>
                                                }

                                            })}
                                        </Grid>
                                        : null}
                                </Grid>
                                <Grid item xs={2}>
                                    ${elem.price}
                        &nbsp;

                        {elem.size == 1 && elem.isMultiple == true ? t("S") : null}
                                    {elem.size == 2 && elem.isMultiple == true ? t("M") : null}
                                    {elem.size == 3 && elem.isMultiple == true ? t("L") : null}
                                    {elem.size == 4 && elem.isMultiple == true ? t("X") : null}

                                </Grid>
                                <Grid item xs={1}>
                                    {elem.quantity}
                                </Grid>
                                <Grid item xs={1}>
                                    ${(elem.price * elem.quantity).toFixed(2)}
                                    {tSum !== 0 ?
                                        <Grid xs="12" >
                                            <Typography className={classes.textDescContent} >
                                                ${(tSum * elem.quantity).toFixed(2)}
                                            </Typography>
                                        </Grid>
                                        : null}

                                </Grid>
                                {/* <Grid item xs={3}>
                                    <Link to='#!' onClick={e => addToOrder(e, elem, elem.price, elem.size)}>
                                        <AddCircleOutlineIcon className={classes.icon} />
                                    </Link>
                                    {isQuantity(elem, elem.size) ?
                                        <Link to='#!' onClick={e => removeFromOrder(e, elem, elem.size)}>
                                            <RemoveCircleOutlineIcon className={classes.icon} />
                                        </Link>
                                        : null}
                                </Grid> */}
                            </Grid>

                        </div>
                    )
                }
                )
            }
            <hr />
            <Grid container >
                <Grid item xs={7}>
                    <Typography className={classes.textSubContent} >
                        {t("SubTotal")}:
                    </Typography>
                </Grid>
                <Grid item xs={5}>
                    <Typography className={classes.textNameContent} >
                        ${cartTotal.toFixed(2)}
                    </Typography>
                </Grid>


                <Grid item xs={4}>
                    <Typography className={classes.textSubContent} >
                        {t("Tax")}:
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography className={classes.textNameContent} >
                        {taxRate.toFixed(2)}%
                    </Typography>
                </Grid>
                <Grid item xs={5}>
                    <Typography className={classes.textNameContent} >
                        ${(cartTotal * taxRate / 100).toFixed(2)}
                    </Typography>
                </Grid>


                <hr />

                <Grid item xs={7}>
                    <Typography className={classes.textSubContent} >
                        {t("Total")}:
                    </Typography>
                </Grid>
                <Grid item xs={5}>
                    <Typography className={classes.textNameContent} >

                        ${(cartTotal + (cartTotal * taxRate / 100)).toFixed(2)}
                    </Typography>
                </Grid>
            </Grid>

            {/* 
            <Row>
                <Col>
                    <Link to='#!' onClick={() => setIsOrder(true)} className=' flow-right'>
                        <MdArrowBack color='Black' size='3rem' />
                    </Link>
                </Col>
            </Row> */}
        </div >
    )
}
export default Cart
