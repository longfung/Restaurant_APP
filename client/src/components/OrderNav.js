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
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";

import {

  Box,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  iconContent: {
    color: theme.palette.neutral.gold,
    fontStyle: 'oblique',
    fontSize: "2.2rem",
    fontWeight: 500,
    verticalAlign: "middle",
    aligh: 'right',
    fontWeight: 'fontWeightBold',
  },
  textContent: {
    color: theme.palette.neutral.white,
    fontSize: "1.2rem",
    fontWeight: 500,
    textAlign: 'right',
    marginTop: theme.spacing(2.5),
    // fontWeight: 'fontWeightBold',
    display: 'inline-block',
  },
  nameContent: {
    color: theme.palette.neutral.white,
    fontSize: "1.2rem",
    fontWeight: 700,
    textAlign: 'right',
    marginTop: theme.spacing(2),
    // fontWeight: 'fontWeightBold',
    display: 'inline-block',
  },
  langContent: {
    color: theme.palette.neutral.white,
    fontSize: "1.2rem",
    fontWeight: 500,
    textAlign: 'right',
    marginTop: theme.spacing(0.7),
    // fontWeight: 'fontWeightBold',
    display: 'inline-block',
  },
  whiteColor: {
    color: theme.palette.neutral.white,
    backgroundColor: theme.palette.neutral.black,
  },
  Arror: {
    fontSize: '2rem',
    color: theme.palette.neutral.white,
    marginBottom: '0.5rem',
  },
  rightToolbar: {
    marginLeft: "auto",
    marginRight: -12
  },
  menuButton: {
    marginRight: 16,
    marginLeft: -12
  }

}));

function OrderNav(props) {
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
  debugger;
  // const fetchMenuList = props.fetchMenuList;
  // const cartTotal = props.cartTotal;
  // const setIsOrder = props.setIsOrder;
  // const category = props.category;
  // const setCategory = props.setcategory;
  const { fetchMenuList, cartTotal, setIsOrder, category, setCategory } = props;
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

          {category == null ?
            <div>
              <IconButton
                className={classes.menuButton}
                aria-label="Menu"
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h5" color="inherit" className={classes.nameContent}>
                {/* {shareContext.state.restaurant.name} */}
              </Typography>
            </div>

            :
            <Box>
              <Link to='#!'
                onClick={
                  () => setCategory(null)
                }>
                {
                  <ArrowBackIcon className={classes.Arror} />
                } </Link>
              <Typography variant="h5" color="inherit" className={classes.nameContent}>
                {category.label}
              </Typography>
            </Box>
          }

          <section className={classes.rightToolbar}>
            {shareContext.state.userMode == 2 || shareContext.state.userMode == 1 ?
              <FormControl variant="outlined" className={classes.langContent}>
                <Select
                  classes={{
                    root: classes.whiteColor,
                    icon: classes.whiteColor,
                  }}
                  // className={classes.formControlSmall}
                  value={langValue}
                  onChange={setLanguage}
                  inputProps={{ 'aria-label': 'Without label' }}
                // color="common.white"
                >
                  {/* <Field
                      component={Select}
                      type="text"
                      name="langValue"
                      onChange={setLanguage}
                      inputProps={{ name: 'langValue', id: 'langValue' }}
                    ></Field> */}


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

            <Link
              to="#!"
              onClick={() => setIsOrder(false)}
            // className="font-weight-bold text-white float-left text-sm-left"
            >
              <IconButton color="inherit" aria-label="basket">
                <ShoppingBasketIcon className={classes.iconContent} />
              </IconButton>
              <Typography variant="h5" className={classes.textContent}>

                ${cartTotal.toFixed(2)}
              </Typography>
            </Link>

          </section>



        </Toolbar>
      </AppBar >
      <div className="padding05"> </div>
    </div >
  );
}

export default OrderNav;
