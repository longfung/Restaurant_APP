import React, { useState, useContext } from "react";
import { Link, } from "react-router-dom";
// import {
//     Nav,
//     NavItem,
//     Navbar,
//     NavLink,
//     Button,
//     Row,
//     Col,
//     Jumbotron
// } from "reactstrap";
import { MdAccountCircle } from "react-icons/md";
import { store } from "./Store";
import { useTranslation } from "react-i18next";
import Language from './Language';
import "../index.css";
import { AppBar } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import { Grid } from "@material-ui/core";
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    appbar: {
        // backgroundColor: 'primary',
        color: 'white',
        // fontStyle    : 'oblique',
        // fontSize: "30px",
        fontWeight: 700,
        textAlign: "right",
        // fontWeight: 'fontWeightBold',
    },
    title: {
        flexGrow: 1,
        fontSize: "h4",
    },
    navbarButtonStyle: {
        color: 'white',
        borderColor: 'white',
        fontWeight: 700,
        textAlign: "center",
        // fontStyle: "italic",
        // fontFamily: "Times New Roman",
        // letterSpacing: 1,
        // lineHeight: 2,
    },
});

function NavTab(props) {
    const shareContext = useContext(store);
    const username = shareContext.state.username;
    const { t } = useTranslation();


    const classes = useStyles();

    const goComponent = (target) => {
        props.history.push(target);
    };

    return (
        <AppBar position="static" color="primary">


            <Toolbar>
                <Grid container direction="row">
                    <Grid item xs={1} >

                        <Button fullWidth variant="text" className={classes.navbarButtonStyle}
                            onClick={() => goComponent("/")}>
                            {/* <Typography variant='subtitle1' className={classes.appbar}> */}
                            {t("Home")}

                        </Button>

                    </Grid>
                    <Grid item xs={1}>
                        <Button fullWidth variant="text" className={classes.navbarButtonStyle}
                            onClick={() => goComponent("/Restaurant")}>

                            {t("Restaurant")}


                        </Button>
                    </Grid>
                    <Grid item xs={1}>
                        <Button fullWidth variant="text" className={classes.navbarButtonStyle}
                            onClick={() => goComponent("/Menu")} >
                            {t("Menu")}
                        </Button>
                    </Grid>
                    <Grid item xs={1}>
                        <Button fullWidth variant="text" className={classes.navbarButtonStyle}
                            onClick={() => goComponent("/Category")} >
                            {t("Category")}
                        </Button>
                    </Grid>
                    <Grid item xs={1}>
                        <Button fullWidth variant="text" className={classes.navbarButtonStyle}
                            onClick={() => goComponent("/Topping")} >
                            {t("ToppingName")}
                        </Button>
                    </Grid>
                    <Grid item xs={1}>
                        <Button fullWidth variant="text" className={classes.navbarButtonStyle}
                            onClick={() => goComponent("/Order")} >
                            {t("Order")}
                        </Button>
                    </Grid>
                    <Grid item xs={1}>
                        <Button fullWidth variant="text" className={classes.navbarButtonStyle}
                            onClick={() => goComponent("/EntityT")} >
                            {t("Translator")}
                        </Button>
                    </Grid>
                    <Grid item xs={1}>
                        <Button fullWidth variant="text" className={classes.navbarButtonStyle}
                            onClick={() => goComponent("/QueueA")} >
                            {t("QueueA")}
                        </Button>
                    </Grid>
                    <Grid item xs={1}>
                        <Button fullWidth variant="text" className={classes.navbarButtonStyle}
                            onClick={() => goComponent("/QueueD")} >
                            {t("QueueD")}
                        </Button>
                    </Grid>
                    <Grid item xs={2} sm={2} className={classes.navbarButtonStyle}>
                        <Language />
                    </Grid>
                    <Grid item xs={1}>
                        <Button fullWidth variant="text" className={classes.navbarButtonStyle}
                            onClick={() => props.history.push("/user")} >
                            <MdAccountCircle color="white" size="2rem" /> {username}
                        </Button>
                    </Grid>
                </Grid>
            </Toolbar>


        </AppBar >
    )
}

//     return (
//         <Navbar color="light" light expand="md">
//             <Jumbotron fluid className="my-0 py-1 bg-info w-100">
//                 <Row>

//                     <Nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top mr-auto px-1 bx-1 py-0 my-0" tabs pills>
//                         <React.Fragment>
//                             <Col sm="1">                            <NavItem className="mt-0 ">
//                                 <NavLink className="border-dark bg-dark font-weight-bold text-white" href="/">
//                                     {
//                                         t("Home")
//                                     } </NavLink>
//                             </NavItem>
//                             </Col>
//                             <Col sm="1">
//                                 <NavItem className="mt-0">
//                                     <Button className="border-dark bg-dark font-weight-bold text-white"
//                                         onClick={
//                                             () => goComponent("/Restaurant")
//                                         }>
//                                         {
//                                             t("Restaurant")
//                                         } </Button>
//                                 </NavItem>
//                             </Col>
//                             <Col sm="1">
//                                 <NavItem>
//                                     <Button className="border-dark bg-dark font-weight-bold text-white"
//                                         onClick={
//                                             () => goComponent("/Menu")
//                                         }>
//                                         {
//                                             t("Menu")
//                                         } </Button>
//                                 </NavItem>
//                             </Col>
//                             <Col sm="1">

//                                 <NavItem>
//                                     <Button className="border-dark bg-dark font-weight-bold text-white"
//                                         onClick={
//                                             () => goComponent("/Category")
//                                         }>
//                                         {
//                                             t("Category")
//                                         } </Button>
//                                 </NavItem>
//                             </Col>
//                             <Col sm="1">
//                                 <NavItem>
//                                     <Button className="border-dark bg-dark font-weight-bold text-white text-nowrap"
//                                         onClick={
//                                             () => goComponent("/Topping")
//                                         }>
//                                         {
//                                             t("ToppingName")
//                                         } </Button>
//                                 </NavItem>
//                             </Col>
//                             <Col sm="1">
//                                 <NavItem>
//                                     <Button className="border-dark bg-dark font-weight-bold text-white"
//                                         onClick={
//                                             () => goComponent("/Order")
//                                         }>
//                                         {
//                                             t("Order")
//                                         } </Button>
//                                 </NavItem>
//                             </Col>
//                             <Col sm="1">
//                                 <NavItem>
//                                     <Button className="border-dark bg-dark font-weight-bold text-white"
//                                         onClick={
//                                             () => goComponent("/EntityT")
//                                         }>
//                                         {
//                                             t("Translator")
//                                         } </Button>
//                                 </NavItem>
//                             </Col>
//                             <Col sm="1">
//                                 <NavItem className="mt-0 ">
//                                     <Button className="border-dark bg-dark font-weight-bold text-white"
//                                         onClick={
//                                             () => goComponent("/QueueA")
//                                         }>
//                                         {
//                                             t("QueueA")
//                                         } </Button>
//                                 </NavItem>
//                             </Col>
//                             <Col sm="1">
//                                 <NavItem>
//                                     <Button className="border-dark bg-dark font-weight-bold text-white"
//                                         onClick={
//                                             () => goComponent("/QueueD")
//                                         }>
//                                         {
//                                             t("QueueD")
//                                         } </Button>
//                                 </NavItem>
//                             </Col>
//                             <Col sm="2" className="border-dark bg-dark font-weight-bold text-white text-nowrap">

//                                 <Language />
//                             </Col>
//                             <Col sm="1" className="border-dark bg-dark font-weight-bold text-white text-nowrap">
//                                 <NavItem className="float-right" >
//                                     <Link to="#!"
//                                         onClick={
//                                             () => props.history.push("/user")
//                                         }
//                                         className=" bg-dark font-weight-bold text-white">
//                                         <MdAccountCircle color="white" size="2rem" /> {username}
//                                     </Link>
//                                 </NavItem>
//                             </Col>

//                         </React.Fragment>
//                     </Nav>

//                 </Row>
//             </Jumbotron>
//             <div class="padding70"> </div>
//         </Navbar>
//     );
// }

export default NavTab;
