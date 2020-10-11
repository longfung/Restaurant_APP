import React, { useState, useEffect, useContext } from "react";
import Language from './Language';
// import {
//   Row,
//   Col,
//   Button,
//   Nav,
//   NavItem,
//   Navbar,
//   Jumbotron

// } from "reactstrap";
import { MdShoppingCart, MdDehaze, MdArrowBack, MdSignalCellularConnectedNoInternet1Bar, MdCenterFocusStrong } from "react-icons/md";
import { Link } from "react-router-dom";
import { store } from "./Store";
import access from '../util/access';
import { useTranslation } from 'react-i18next';
// import Select, { components } from "react-select";
import { isUndefined } from "axios/lib/utils";
import { AppBar } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import { Grid } from "@material-ui/core";
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import {

  Box,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.neutral.black,
    margin: 0,

    // flexGrow: 1,

  },
  appbar: {
    // backgroundColor: 'primary',
    color: 'white',
    // fontStyle    : 'oblique',
    // fontSize: "30px",
    fontWeight: 700,
    textAlign: "right",
    // fontWeight: 'fontWeightBold',
  },
  customizeToolbar: {
    minHeight: 64,
    height: 64,
    margin: 0,
    padding: 0,
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

  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 240,
    color: theme.palette.neutral.white,
    // borderColor: 'secondary',
    fontSize: "24px",
    fontWeight: 500,
    textAlign: "left",
    fontWeight: 'fontWeightBold',
  },
  FormatformControl: {
    margin: theme.spacing(0),
    minWidth: 120,
    color: theme.palette.neutral.white,
    // borderColor: 'secondary',
    fontSize: "24px",
    fontWeight: 500,
    textAlign: "left",
    fontWeight: 'fontWeightBold',
  },
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
  textContent: {
    fontSize: "20px",
    fontWeight: 500,
    align: 'justify',
    marginTop: theme.spacing(2),
    fontWeight: 'fontWeightBold',
    display: 'inline-block',
  },
  whiteColor: {
    color: theme.palette.neutral.white,
    backgroundColor: theme.palette.neutral.black,
  },
  Arror: {
    fontSize: '48px',
    color: theme.palette.neutral.white,
  }

}));

function CategoryNav(props) {
  const classes = useStyles();
  const shareContext = useContext(store);
  const { t } = useTranslation();
  const restaurant = shareContext.state.restaurant;
  const username = shareContext.state.username;
  const restaurantId = shareContext.state.restaurant
    ? shareContext.state.restaurant.id
    : null;
  const setMessage = props.setMessage;
  if (!restaurantId) {
    let m = t("LoginFirst");
    setMessage({ status: 400, msg: m });
    props.history.push("/Login");
  }
  const fetchMenuList = props.fetchMenuList;
  const cartTotal = props.cartTotal;
  const setIsOrder = props.setIsOrder;
  const [categoryList, setCategoryList] = useState([]);
  const [catOptions, setCatOptions] = useState([]);
  const [catValue, setCatValue] = useState(0);
  const [formatOptions, setFormatOptions] = useState([]);
  const [formatValue, setFormatValue] = useState(1);
  const [langOptions, setLangOptions] = useState([]);
  const [langValue, setLangValue] = useState('');
  const [menuFormat, setMenuFormat] = useState(1);  // 1 with photo, 2 without format list format

  useEffect(() => {
    let isMounted = true;
    setCategoryList([]);
    const promise1 = access.fetchCategoryByRestaurantId(restaurantId, shareContext.state.locale);
    Promise.resolve(promise1)
      // axios
      //   .get("/api/category", { params: { restaurant_id: restaurantId } })
      .then(res => {
        if (isMounted) {
          res.data.map(item =>
            setCategoryList(prevState => [
              ...prevState,
              { id: item.id, label: item.namet == null ? item.category_name : item.namet }
            ])
          );
          // debugger;
          setCatOptions([])
          let catOpt = res.data.map(item => ({
            value: item.id,
            label: item.namet == null ? item.category_name : item.namet
          }));
          const temp = t("AllCategory");
          const tempObj = { value: 0, label: temp };
          catOpt.unshift(tempObj);
          // setCatValue(catOptions);
          if (catValue == null || catValue == 0) {
            setCatValue(0);
          } else {
            catOpt.forEach((elem) => {
              if (elem.value == catValue.value) {
                catValue.label = elem.label;
              }
            })
          }
          setCatOptions(catOpt);
          // format options
          let formatOpt = [];
          setFormatOptions([])
          const temp1 = t("CardFormat");
          const temp1Obj = { value: 1, label: temp1 };
          formatOpt.push(temp1Obj);
          const temp2 = t("ListFormat");
          const temp2Obj = { value: 2, label: temp2 };
          formatOpt.push(temp2Obj);
          // setCatValue(catOptions);
          // if (formatValue == 1) {
          //   setFormatValue(1);
          // } else {
          //   setFormatValue(2);
          // }
          setFormatOptions(formatOpt);
          // Language switch
          if (shareContext.state.restaurant && shareContext.state.restaurant.support_locale) {
            const arr = shareContext.state.restaurant.support_locale.split(',')
            let formatOpt = [];
            setLangOptions([])
            let langOpt = arr.map(lang => ({
              value: lang,
              label: t(lang)
            }));
            // setCatValue(catOptions);
            const temp3 = t(shareContext.state.locale);
            const temp3Obj = { value: shareContext.state.locale, label: temp3 };
            setLangValue(shareContext.state.locale);
            setLangOptions(langOpt);
          }
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        isMounted = false;
      });
    return () => isMounted = false;
  }, [shareContext.state.locale]);

  useEffect(() => {
    // fetchMenuList(catValue);
    // setLocaleValue("");
    // setSupportLocale([]);
  }, [catValue])

  const goComponent = (target) => {
    props.history.push(target);
  };
  const handleSelected = id => {
    debugger;
    shareContext.dispatch({
      type: 'setCategoryId',
      value: id === 0 ? 0 : id
    })
    fetchMenuList(id);
  }

  const handleCatOption = e => {
    debugger;
    const id = e.target.value;
    setCatValue(id);
    shareContext.dispatch({
      type: 'setCategoryId',
      value: id === 0 ? 0 : id
    })
    fetchMenuList(id);
  }

  const switchMenuFormat = id => {
    shareContext.dispatch({
      type: 'setMenuFormat',
      value: id
    })
  }

  const switchMenuFormat2 = e => {
    const id = e.target.value;
    setFormatValue(id);
    shareContext.dispatch({
      type: 'setMenuFormat',
      value: id
    })
  }

  const customStyles = {
    container: (base, state) => ({
      ...base,
      border: state.isFocused ? null : null,
      width: "120px",
      transition:
        "border-color 0.2s ease, box-shadow 0.2s ease, padding 0.2s ease",
      "&:hover": {
        boxShadow: "0 2px 4px 0 rgba(41, 56, 78, 0.1)"
      }
    }),
    control: base => ({
      ...base,
      background: "#152033"
    }),
    singleValue: base => ({
      ...base,
      color: "#fff"
    }),
    input: base => ({
      ...base,
      color: "#fff"
    })
  };

  const customFormatStyles = {
    container: (base, state) => ({
      ...base,
      border: state.isFocused ? null : null,
      width: "90px",
      transition:
        "border-color 0.2s ease, box-shadow 0.2s ease, padding 0.2s ease",
      "&:hover": {
        boxShadow: "0 2px 4px 0 rgba(41, 56, 78, 0.1)"
      }
    }),
    control: base => ({
      ...base,
      background: "#152033"
    }),
    singleValue: base => ({
      ...base,
      color: "#fff"
    }),
    input: base => ({
      ...base,
      color: "#fff"
    })
  };
  const customLangStyles = {
    container: (base, state) => ({
      ...base,
      border: state.isFocused ? null : null,
      width: "75px",
      transition:
        "border-color 0.2s ease, box-shadow 0.2s ease, padding 0.2s ease",
      "&:hover": {
        boxShadow: "0 2px 4px 0 rgba(41, 56, 78, 0.1)"
      }
    }),
    control: base => ({
      ...base,
      background: "#152033"
    }),
    singleValue: base => ({
      ...base,
      color: "#fff"
    }),
    input: base => ({
      ...base,
      color: "#fff"
    })
  };


  const customTheme = theme => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: 'orange',
        primary: 'green',
      },
    }
  }

  const CaretDownIcon = () => {
    return <MdDehaze color="Primary" size="1rem" />;
  };

  // const DropdownIndicator = props => {
  //   return (
  //     <components.DropdownIndicator {...props}>
  //       <CaretDownIcon />
  //     </components.DropdownIndicator>
  //   );
  // };

  const setLanguage = (e) => {
    shareContext.dispatch({ type: "setLocale", value: e.target.value });
  };

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar >
          <Grid container direction="row">

            {shareContext.state.userMode == 1 ?
              <Grid item xs={1}>

                <Link to='#!'
                  onClick={
                    () => goComponent("/Restaurant")
                  }>
                  {
                    <ArrowBackIcon className={classes.Arror} />
                  } </Link>
              </Grid>
              :
              null
            }


            <Grid item xs={3} >
              <FormControl variant="outlined" className={classes.root}>
                <Select
                  classes={{
                    root: classes.whiteColor,
                    icon: classes.whiteColor,
                  }}
                  className={classes.formControl}
                  value={catValue}
                  onChange={handleCatOption}
                  // MenuProps={catOptions}
                  // className={classes.selectEmpty}
                  inputProps={{ 'aria-label': 'Without label' }}
                // color="common.white"
                // input={
                //   <Input
                //     classes={{
                //       inkbar: classes.inkbar,
                //       underline: classes.underline,
                //     }}
                //   />
                // }
                >
                  {catOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>

                      {option.label}

                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={2} >
              <FormControl variant="outlined" className={classes.root}>
                <Select
                  classes={{
                    root: classes.whiteColor,
                    icon: classes.whiteColor,
                  }}
                  className={classes.FormatformControl}
                  value={formatValue}
                  onChange={switchMenuFormat2}
                  inputProps={{ 'aria-label': 'Without label' }}
                // color="common.white"
                >
                  {formatOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>

                      {option.label}

                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>



            <Grid item xs={3} >
              {shareContext.state.userMode == 2 || shareContext.state.userMode == 1 ?
                <FormControl variant="outlined" className={classes.root}>
                  <Select
                    classes={{
                      root: classes.whiteColor,
                      icon: classes.whiteColor,
                    }}
                    className={classes.formControl}
                    value={langValue}
                    onChange={setLanguage}
                    inputProps={{ 'aria-label': 'Without label' }}
                  // color="common.white"
                  >
                    {langOptions.map(option => (
                      <MenuItem key={option.value} value={option.value}>

                        {option.label}

                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                :
                null
              }


            </Grid>
            <Grid item xs={3}>

              <Link
                to="#!"
                onClick={() => setIsOrder(false)}
                className="font-weight-bold text-white float-left text-sm-left"
              >
                <ShoppingCartIcon className={classes.iconContent} />
                <Typography variant="caption" className={classes.textContent}>

                  ${cartTotal.toFixed(2)}
                </Typography>
              </Link>



            </Grid>

          </Grid>
        </Toolbar>
      </AppBar >
      <div className="padding05"> </div>
    </div>

    // <div>
    //   <Navbar color="light" light expand="md"></Navbar>
    //   <Jumbotron fluid className="my-0 py-1 bg-info w-100">
    //     <Row>
    //       <Nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top mr-auto">
    //         {window.innerWidth > 500 ?
    //           <React.Fragment>
    // <Col sm="1" xs="1">
    //   {shareContext.state.userMode == 1 ?

    //     <NavItem className="mt-0">
    //       <Button className="border-dark bg-dark font-weight-bold text-white"
    //         onClick={
    //           () => goComponent("/Restaurant")
    //         }>
    //         {
    //           <MdArrowBack color='white' size='2rem' />
    //         } </Button>
    //     </NavItem>
    //     :
    //     null
    //   }
    // </Col>
    //             <Col sm={6}>
    //               <Button onClick={() => handleSelected(0)}
    //                 className={shareContext.state.categoryId == null || shareContext.state.categoryId == 0 ? 'btn btn-danger active' : 'btn btn-secondary'}>
    //                 {t("AllCategory")}</Button>
    //               {categoryList &&
    //                 categoryList.map((item, index) => (
    //                   <Button key={item.id} onClick={() => handleSelected(item.id)}
    //                     className={shareContext.state.categoryId == item.id ? 'btn btn-danger active' : 'btn btn-secondary'}>
    //                     {item.label}
    //                   </Button>
    //                 ))}

    //             </Col>
    //             <Col sm="1">
    //               <Link to="#!" onClick={() => switchMenuFormat(1)}
    //                 className={shareContext.state.menuFormat == null || shareContext.state.menuFormat == 1 ? 'btn-outline-danger active' : 'text-white'}>
    //                 <span className="LargeFont">{t("CardFormat")}</span></Link>
    //           &nbsp;
    //         <Link to="#!" onClick={() => switchMenuFormat(2)}
    //                 className={shareContext.state.menuFormat == 2 ? 'btn-outline-danger active' : 'text-white'}>
    //                 <span className="LargeFont">{t("ListFormat")}</span></Link>

    //             </Col>
    //             <Col sm={4} >
    //               {shareContext.state.userMode == 2 || shareContext.state.userMode == 1 ?
    //                 <span className="LargeFont"><Language /></span>
    //                 :
    //                 null
    //               }

    //               <Col sm={6} className="float-left">
    //                 <Link
    //                   to="#!"
    //                   onClick={() => setIsOrder(false)}
    //                   className="font-weight-bold text-white"
    //                 >
    //                   <MdShoppingCart color="gold" size="2rem" /> $
    //           {cartTotal.toFixed(2)}
    //                 </Link>
    //               </Col>
    //             </Col >
    //           </React.Fragment>
    //           :

    //           <React.Fragment>
    //             <Col sm="3" xs="3" className="float-left mx-0 px-0">

    //               <Select id="localeid"
    //                 // className="abc"
    //                 components={{ DropdownIndicator }}
    //                 theme={customTheme}
    //                 styles={customStyles}
    //                 // className='react-select-container'
    //                 options={catOptions}
    //                 onChange={handleCatOption}
    //                 // className="mb-3"
    //                 value={catValue} />
    //             </Col>
    //             <Col sm="3" xs="3" className="float-left mx-0 px-0">
    //               <Select id="formatid"
    //                 // className="abc"
    //                 components={{ DropdownIndicator }}
    //                 theme={customTheme}
    //                 styles={customFormatStyles}
    //                 // className='react-select-container'
    //                 options={formatOptions}
    //                 onChange={switchMenuFormat2}
    //                 // className="mb-3"
    //                 value={formatValue} />
    //             </Col>

    // {shareContext.state.userMode == 2 ?
    //   <Col sm="3" xs="3" className="float-left mx-0 px-0">
    //     <Select id="languageid"
    //       // className="abc"
    //       components={{ DropdownIndicator }}
    //       theme={customTheme}
    //       styles={customLangStyles}
    //       // className='react-select-container'
    //       options={langOptions}
    //       onChange={setLanguage}
    //       // className="mb-3"
    //       value={langValue} />
    //   </Col> :
    //   null
    // }

    // <Col sm={3} xs="3" className="float-left mx-0 px-0">
    //   <Link
    //     to="#!"
    //     onClick={() => setIsOrder(false)}
    //     className="font-weight-bold text-white float-left text-sm-left"
    //   >
    //     <MdShoppingCart color="gold" size="2rem" />${cartTotal.toFixed(2)}
    //   </Link>

    // </Col >

    //           </React.Fragment>
    //         }



    //       </Nav>
    //     </Row>
    //   </Jumbotron>
    //   <div class="padding70"> </div>
    // </div>
  );
}

export default CategoryNav;
