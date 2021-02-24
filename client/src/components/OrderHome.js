import React, { useState, useEffect, useContext, useRef } from "react";
import Cart from "./Cart";
import Toppingline from "./Toppingline";
import Toppingmenuline from "./Toppingmenuline";
import Customer from "./Customer";
import Select from "react-select";
import { MdAddCircle, MdRemoveCircle, MdDone, MdEventNote, MdContentCopy, MdDelete, MdComment, MdCenterFocusStrong } from "react-icons/md";
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CheckIcon from '@material-ui/icons/Check';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import access from '../util/access';
// import img1 from "../images/img7.jpg"
// import img1 from "../../../server/images/img3.jpg"
import {
  Form,
  Input,
  Row,
  Col,

  ButtonGroup,
  FormGroup,
  Label,

  CardImg,
  CardBody,
  NavLink,
  CardText,
  CardImgOverlay,
  CardFooter,
  Modal,
  ModalTitle,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { Radio, RadioGroup } from 'react-radio-group'
import OrderCatNav from "./OrderCatNav";
import OrderNav from './OrderNav'
import OrderDetail from "./OrderDetail";
import UserRate from "./UserRate";
import { Link } from "react-router-dom";
import NavTab from "./NavTab";
import { store } from "./Store";
import "../index.css";
import { useTranslation } from 'react-i18next';
import { debug } from "request";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ButtonBase from '@material-ui/core/ButtonBase';
import Rating from '@material-ui/lab/Rating';
import DisplayDesc from './DisplayDesc';
import FiberNewIcon from '@material-ui/icons/FiberNew';

import {

  LinearProgress,
  Grid,
  Box,
} from '@material-ui/core';
import ItemTopping from './ItemTopping';
import { forEach } from "axios/lib/utils";
// import { IoTSecureTunneling } from "aws-sdk";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
  },
  Card: {
    width: "90%",
    height: 240,
    margin: 'auto'
  },
  media: {
    // height: 140,
    // maxWidth: 140,
    // maxWidth: 320,
    height: 100,
    // maxHeight: 240,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 0,
    paddingBottom: 0,
    align: "center",
  },
  content: {
    aligh: 'left',
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  textRight: {
    textAlign: 'right',
    paddingRight: '0',
    paddingTop: '0',
  },
  textLeft: {
    textAlign: 'left',
    paddingLeft: 0,
    paddingBottom: 0,
  },
  priceBox: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.neutral.white,
    width: '100%',
    margin: 0,
    padding: 0,
    align: 'center',
  },
  quantityBox: {
    color: theme.palette.neutral.blue,
    marginBottom: 0,
    paddingBottom: 0,
    marginTop: 0,
    paddingTop: 0,
  },
  categoryBox: {
    backgroundColor: theme.palette.neutral.grey,
    color: theme.palette.neutral.white,
    width: '100%',
    margin: 0,
    padding: 0,
    align: 'center',
  },
  nameContent: {
    // backgroundColor: 'primary',
    // color: 'theme.palette.red',
    // fontStyle: 'oblique',
    fontSize: props => 0.15 * props.wordSize + 'rem',
    fontWeight: 500,
    padding: 3,
    // textAlign: "left",
    // fontWeight: 'fontWeightBold',
  },
  priceContent: {
    // backgroundColor: 'primary',
    color: theme.palette.red.main,
    // fontStyle: 'oblique',
    fontSize: "1.0rem",
    fontWeight: 500,
    padding: 3,
    textAlign: 'right',
    // textAlign: "left",
    // fontWeight: 'fontWeightBold',
  },
  discountContent: {
    // backgroundColor: 'primary',
    color: theme.palette.neutral.black,
    // fontStyle: 'oblique',
    fontSize: "0.6rem",
    fontWeight: 500,
    padding: 3,
    textAlign: 'right',
    // textAlign: "left",
    // fontWeight: 'fontWeightBold',
  },
  sizeContent: {
    // backgroundColor: 'primary',
    color: theme.palette.black,
    // fontStyle: 'oblique',
    fontSize: "0.7rem",
    fontWeight: 500,
    padding: 1,
    // textAlign: 'right',
    // textAlign: "left",
    // fontWeight: 'fontWeightBold',
  },
  priceIcon: {
    verticalAlign: 'top',
    display: 'inline-flex',
    fontSize: '1.5rem'
  },
  catTitleContent: {
    color: theme.palette.neutral.white,
    fontSize: "1.4rem",
    fontWeight: 500,
    // verticalAlign: 'center',
    // textAlign: 'right',
    marginTop: theme.spacing(1),
    marginLeft: '1rem',
    // fontWeight: 'fontWeightBold',
    display: 'inline-block',
    // textTransform: 'none',
  },
  viewAllContent: {
    color: theme.palette.neutral.white,
    fontSize: "1.4rem",
    fontWeight: 500,
    // verticalAlign: 'center',
    // textAlign: 'right',
    // marginTop: theme.spacing(1),
    marginRight: '1rem',
    // fontWeight: 'fontWeightBold',
    display: 'inline-block',
    textTransform: 'none',
  },
  toppingContent: {
    color: theme.palette.neutral.black,
    // fontSize: "0.6rem",
    fontSize: props => 0.1 * props.wordSize + 'rem',
    fontWeight: 500,
    // verticalAlign: 'center',
    // textAlign: 'right',
    // marginTop: theme.spacing(1),
    // marginRight: '1rem',
    // fontWeight: 'fontWeightBold',
    display: 'inline-block',
    textTransform: 'none',
  },
  descContent: {
    color: theme.palette.neutral.black,
    fontSize: props => 0.1 * props.wordSize + 'rem',
    fontWeight: 300,
    // verticalAlign: 'center',
    // textAlign: 'right',
    // marginTop: theme.spacing(1),
    // marginRight: '1rem',
    // fontWeight: 'fontWeightBold',
    display: 'inline-block',
    textTransform: 'none',
  },
}));

function ShowDesc(props) {
  // debugger;
  const classes = useStyles(props);
  const item = props.item;
  return (
    <Typography component="p" className={classes.descContent} wrap="true" >
      {/* <DisplayNote menu={item} /> */}
      {item.note_t == null ? item.note : item.note_t}

    </Typography>
  );
}

function ShowName(props) {
  const classes = useStyles(props);
  return (
    <div>
      {
        props.is_new ?
          <Typography variant="h6" component="h2" className={classes.nameContent} noWrap>
            <FiberNewIcon fontSize="large" /> {props.name}
          </Typography>
          :
          <Typography variant="h6" component="h2" className={classes.nameContent} noWrap>
            {props.name}
          </Typography>
      }
    </div>
  );
}

function ShowTopping(props) {
  const classes = useStyles(props);
  return (
    <div>
      {
        <Typography variant="h6" component="h2" className={classes.toppingContent} noWrap>
          {props.fetchToppingNameList(props.name)}
        </Typography>
      }
    </div>
  );
}

function OrderHome(props) {
  const { t } = useTranslation();
  const shareContext = useContext(store);
  const setMessage = props.setMessage;
  const restaurant = shareContext.state.restaurant;
  const restaurantId =
    shareContext.state.restaurant != null
      ? shareContext.state.restaurant.id
      : null;
  if (!restaurantId) {
    let m = t("LoginFirst");
    setMessage({ status: 400, msg: m });
    props.history.push("/Login");
  }
  // debugger;
  // if (!shareContext.state.customer) {
  //   props.history.push("/Customer");
  // }
  const userMode = shareContext.state.userMode;
  // const restaurant = shareContext.state.restaurant;
  //   const restaurantId = restaurant.id;
  //   const taxRate = restaurant.tax_rate;
  // const userMode = props.userMode;

  // const urlParams = new URLSearchParams(props.location.search);
  // const restId = props.match.params.id;
  // const tableId = urlParams.get('tableId')
  // const restaurantId2 = urlParams.get('restaurantId');
  // debugger;

  const [categoryList, setCategoryList] = useState([]);
  const [topCategory, setTopCategory] = useState(0);
  const [topCategoryList, setTopCategoryList] = useState([]);
  const [toppingMap, setToppingMap] = useState({});   // all toppings with [namet, toppingGroup]
  const [toppingGroupMap, setToppingGroupMap] = useState({});  // all toppingGroup with [items...]
  const [toppingApplyOrder, setToppingApplyOrder] = useState([]); // list of order toppings [G1, item..., G2...]
  const [toppingOrderResult, setToppingOrderResult] = useState([])
  const [menuList, setMenuList] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [isOrder, setIsOrder] = useState(true);
  const [detail, setDetail] = useState({
    isDetail: false,
    menu: ''
  });
  const [toComment, setToComment] = useState({
    isComment: false,
    menu: ''
  });
  const [chosenToppingMap, setChosenToppingMap] = useState({});
  const toppingMapRef = useRef([]);
  const [category, setCategory] = useState(null);
  const [wordSize, setWordSize] = useState(10);

  let catId = 0;

  const classes = useStyles();

  useEffect(() => {
    // const restaurantId = 45000
    // debugger;
    // axios
    //   .get("/api/category", { params: { restaurant_id: restaurantId } })
    let isMounted = true;
    const promise1 = access.fetchCategoryByRestaurantId(restaurantId, shareContext.state.locale);
    Promise.resolve(promise1)
      .then((res) => {
        if (isMounted) {
          setCategoryList([]);
          const tmpCList = [];
          const tmpMList = [];
          res.data.forEach(item => {
            const tmpCat = { id: item.id, pid: item.pid, label: item.namet == null ? item.category_name : item.namet };
            if (item.is_top)
              tmpMList.push(tmpCat);
            else
              tmpCList.push(tmpCat);
            // update category label is exist
            if (category && category.id == tmpCat.id) {
              setCategory({ ...category, label: tmpCat.label });
            }
          })
          setCategoryList(tmpCList);
          setTopCategoryList(tmpMList);

          // debugger;
          // res.data.map((item) =>
          //   setCategoryList((prevState) => [
          //     ...prevState,
          //     { id: item.id, label: item.namet == null ? item.category_name : item.namet },
          //   ])
          // );
        }
      }).catch((err) => {
        // let errorObject = JSON.parse(JSON.stringify(err));
        setMessage({ status: 404, msg: err.message });
      }).finally(() => {
        isMounted = false;
      });
    // debugger;
    getToppingList();
    return () => isMounted = false;
  }, [shareContext.state.locale]);

  // useEffect(() => {
  //   debugger;
  //   const nMenuList = menuList.filter((elem) => {
  //     if (elem.topping) {
  //       elem['toppingArray'] = elem.topping.split();
  //       elem['toppingResult'] = setupToppingApplyMenu(elem);
  //       return elem;
  //     }
  //     return elem;
  //   });
  //   setMenuList([...nMenuList]);
  // }, [toppingApplyOrder])

  useEffect(() => {
    calculateCartTotal();
  }, [cartList]);

  const fetchMenuList = (categoryId) => {
    // debugger;
    let isMounted3 = true;
    let promise1 = '';
    // let catId = '';
    // if (categoryId == 0)
    //   catId = shareContext.state.categoryId == null || shareContext.state.categoryId == 0 ? '' : shareContext.state.categoryId;
    // else
    //   catId = categoryId;
    // if (catId)
    //   promise1 = access.fetchMenuByRestaurantCategoryId(restaurantId, catId, shareContext.state.locale);
    // else
    //   promise1 = access.fetchMenuByRestaurantId(restaurantId, shareContext.state.locale)
    if (categoryId === 0)
      promise1 = access.fetchMenuByRestaurantId(restaurantId, shareContext.state.locale)
    else
      promise1 = access.fetchMenuByRestaurantCategoryId(restaurantId, categoryId, shareContext.state.locale);
    Promise.resolve(promise1)
      // axios
      //   .get("/api/menu/category", {
      //     params: { restaurantId: restaurantId, categoryId: categoryId },
      //   })
      .then((res) => {
        // debugger;
        if (isMounted3) {
          setMenuList([]);
          const newMenuList = res.data.map(item => {
            if (item.name_t != null) item.name = item.name_t;
            if (item.description_t != null) item.description = item.description_t;
            let cnt = 0;
            if (item.price_s > 0) cnt++;
            if (item.price_m > 0) cnt++;
            if (item.price_l > 0) cnt++;
            if (item.price_x > 0) cnt++;
            item['isMultiple'] = cnt > 1 ? true : false;
            item['toppingArray'] = item.topping != null ? item.topping.split(',').map(e => parseInt(e)) : [];
            const tList = item.topping && item.topping.length ? setupToppingApplyMenu(item) : [];
            if (item.discount > 0) {
              item['final_price_s'] =
                item.discount_method === 2 ? item.price_s - (item.price_s * item.discount / 100) : item.price_s - item.discount;
              item['final_price_m'] =
                item.discount_method === 2 ? item.price_m - (item.price_m * item.discount / 100) : item.price_m - item.discount;
              item['final_price_l'] =
                item.discount_method === 2 ? item.price_s - (item.price_l * item.discount / 100) : item.price_l - item.discount;
              item['final_price_x'] =
                item.discount_method === 2 ? item.price_x - (item.price_x * item.discount / 100) : item.price_x - item.discount;
            }
            // debugger;
            item['hasTopping'] = tList && tList.length ? true : false;
            item['toppingResult'] = tList && tList.length ? tList[0] : null;
            item['defaultTopping'] = tList && tList.length ? tList[1] : null;
            // item['defaultTopping'] = tList != undefined && tList.length > 0 ? fetchToppingNameList(tList) : null;
            item['cloneSequence'] = 0;    // 0 - roiginal, others - cloned
            item['inCart'] = false;
            if (shareContext.state.username !== 'demo' && shareContext.state.username !== 'demo2')
              access.doDownload(restaurantId, item.image_path, shareContext, null, setMessage);
            // setMenuList(prevState => [...prevState, item])
            // update cart list if there is any
            cartList.forEach(elem => {
              // console.log("before" + elem.name);
              if (elem.id === item.id && elem.cloneSequence === 0) {
                elem.name = item.name;
                item.toppingResult = elem.toppingResult;
                item['inCart'] = true;
              }

              // console.log("after" + elem.name);
            })
            return item;
          })
          // if (categoryId === 0) {
          // newMenuList.sort((a, b) => {
          //   return a.category_id - b.category_id;
          // })
          // }
          // debugger;
          const completedMenu = mergeChoiceToppingToMenu(newMenuList);
          completedMenu.sort((a, b) => {
            return a.id - b.id;
          })
          setMenuList([...completedMenu]);
        }
      }).catch((err) => {
        // let errorObject = JSON.parse(JSON.stringify(err));
        setMessage({ status: 404, msg: err.message });
      }).finally(() => {
        isMounted3 = false;
      });
  };

  const getImage = (imageName) => {
    // debugger;
    let imageMap = shareContext.state.imageMap;
    if (imageMap && imageMap.has(imageName))
      return imageMap.get(imageName);
    else
      return null;
  }
  // const getImage = async (imageName) => {
  //   try {
  //     if (!imageName)
  //       return false;
  //     let imageMap = shareContext.state.imageMap;
  //     if (imageMap && imageMap.has(imageName)) {
  //       setImage2(imageMap.get(imageName))
  //       return true;
  //     }
  //     const promise1 = access.doDownload(restaurantId, imageName)
  //     Promise.resolve(promise1)
  //       .then((res) => {
  //         if (!imageMap)
  //           imageMap = new Map();
  //         imageMap.set(imageName, res.data);
  //         shareContext.dispatch({
  //           type: "setImageMap",
  //           value: imageMap
  //         });
  //         setImage2(res.data)
  //         return true;
  //       })
  //       .catch((error) => console.log("Error"));
  //   } catch (err) {
  //     console.log("error:" + err.error);
  //   }
  // };


  const getToppingList = () => {
    let isMounted2 = true;
    const promise1 = access.fetchToppingByRestaurantId(restaurantId, shareContext.state.locale);
    Promise.resolve(promise1)
      // axios
      //   .get("/api/category", { params: { restaurant_id: restaurantId } })
      .then((res) => {
        if (isMounted2) {
          setupToppingMap(res.data);
          const cId = shareContext.state.categoryId == null ? 0 : shareContext.state.categoryId;
          fetchMenuList(cId);
        }
      }).catch((err) => {
        // let errorObject = JSON.parse(JSON.stringify(err));
        setMessage({ status: 404, msg: err.message });
      }).finally(() => {
        isMounted2 = false;
      });;
  }

  const setupToppingMap = oList => {
    let tMap = {};
    let gMap = {};
    let tList = [];
    let rList = [];
    let cnt = 0;
    // debugger;
    oList.map((item, idx) => {
      let n = item.namet == null ? item.name : item.namet;
      if (!tMap.hasOwnProperty(item.id)) {
        const arr1 = [n, item.topping_group, item.price];
        tMap[item.id] = arr1;
      }
      if (gMap.hasOwnProperty(item.topping_group)) {
        let arr2 = gMap[item.topping_group];
        if (item.apply_default)
          arr2.unshift(item.id);
        else
          arr2.push(item.id);
      } else {
        let arr3 = [item.id];
        gMap[item.topping_group] = arr3;
      }
      if (item.apply_order) {
        if (item.topping_group == 'G0') {
          tList.push(item.id);
          rList[cnt] = false;
          cnt++;
        } else {
          if (item.apply_default) {
            tList.unshift(item.id);
            rList.unshift(item.id);
            cnt++;
          }
        }
      }
    });
    setToppingMap(tMap);
    toppingMapRef.current = tMap;
    setToppingGroupMap(gMap);
    setToppingApplyOrder(tList)
    setToppingOrderResult(rList);
  }

  const setupToppingApplyMenu = obj => {
    if (obj.topping == "")
      return;
    let rList = [];
    let nList = [];
    let cnt = 0;
    const tMap = toppingMapRef.current;
    // debugger;
    const toppingArray = obj.topping.split(',');
    toppingArray.forEach((elem, idx) => {
      const rId = parseInt(elem);
      const item = tMap[rId];
      if (item[1] == 'G0') {
        rList[cnt] = false;
        cnt++;
      } else {
        // rList.unshift(item[0]);
        rList.push(rId);
        nList.push(rId)
        cnt++;
      }

    });
    return [rList, nList];
    // const nMenuList = menuList.filter((elem) => {
    //   if (elem.id === obj.id) {
    //     elem.toppingResult = rList;
    //     elem.toppingArray = toppingArray;
    //     return elem;
    //   }
    //   return elem;
    // });
    // setMenuList([...nMenuList]);
  }

  const fetchToppingNameList = oList => {
    // debugger;
    let rList = [];
    oList && oList.map((item, idx) => {
      const n = (toppingMap[item])[0];
      rList.push(n);
    })
    return rList ? rList.join(', ') : null;
  }

  const addToOrder = (event, item, price, final_price, size) => {
    event.preventDefault();
    event.stopPropagation();

    let bRes = event.isDefaultPrevented();
    console.log("add to order " + bRes);
    let bFound = false;
    // search dish has been ordered yet
    const nCartList = cartList.filter((elem) => {
      if (elem.id === item.id && elem.cloneSequence == item.cloneSequence && elem.size == size) {
        bFound = true;
        elem.quantity++;
        return elem;
      }
      return elem;
    });
    if (!bFound) {
      const tmpCart = {
        id: item.id,
        cloneSequence: item.cloneSequence,
        name: item.name,
        toppingArray: item.topping ? item.topping.split(',') : null,
        toppingResult: item.toppingResult,
        isMultiple: item.isMultiple,
        price: price,
        final_price: final_price && final_price != 0 ? final_price : price,
        discount_method: item.discount_method,
        discount: item.discount,
        size: size,
        quantity: 1,
        status: 1,
        isTopping: false,
      };
      setCartList([...nCartList, tmpCart]);
    } else {
      setCartList([...nCartList]);
    }
    // item['inCart'] = true;
    setMenuList(menuList.map(elem => elem.id === item.id && elem.cloneSequence === item.cloneSequence ? { ...elem, inCart: true } : elem));
    return false;
  };

  const isQuantity = (item, size) => {
    let bResult = false;
    for (let i = 0; i < cartList.length; i++) {
      if (cartList[i].id === item.id && cartList[i].cloneSequence === item.cloneSequence && cartList[i].size == size) {
        bResult = cartList[i].quantity > 0;
        break;
      }
    }
    return bResult;
  };

  const calculateCartTotal = () => {
    // debugger;
    let sum = 0;
    for (let i = 0; i < cartList.length; i++) {
      if (cartList[i].quantity !== 0) {
        sum += cartList[i].quantity * cartList[i].final_price;
      }
      // calculate topping is added and priced
      const resultArr = cartList[i].toppingResult;
      const toppingArr = cartList[i].toppingArray;
      cartList[i].isTopping = false;
      if (resultArr) {
        resultArr.forEach((elem, idx) => {
          if (elem != true && elem != false)
            cartList[i].isTopping = true;
          if (elem == true) {
            const p = (toppingMap[toppingArr[idx]])[2];
            sum += p * cartList[i].quantity;
            cartList[i].isTopping = true;
          }
        })
      }
    }
    // sum += sum * taxRate / 100;
    setCartTotal(sum);
  };

  const getQuantity = (item, size) => {
    var q = 0;
    for (let i = 0; i < cartList.length; i++) {
      if (cartList[i].id === item.id && cartList[i].cloneSequence === item.cloneSequence && cartList[i].size == size) {
        q = cartList[i].quantity;
        break;
      }
    }
    if (q != 0) {
      return (
        // <CardText className="font-weight-bold text-primary">
        //   <MdDone color="Primary" size="2rem" /> {q}
        // </CardText>
        <span>
          {/* <CheckIcon />
        &nbsp;&nbsp; */}

          { q}
        </span>
      );
    }
  };

  const removeFromOrder = (event, item, size) => {
    // search dish has been ordered yet
    event.preventDefault();
    // debugger;
    const nCartList = cartList.filter((elem) => {
      if (elem.id === item.id && elem.cloneSequence == item.cloneSequence && elem.size === size) {
        elem.quantity--;
        if (elem.quantity !== 0) {

          return elem;
        }
        else {
          item['inCart'] = false;
          return null;
        }
      }
      return elem;
    });
    setCartList([...nCartList]);
  };

  const setOrderToppingRadio = (e, idx) => {
    // debugger;

    // toppingOrderResult[idx] = e;
    setToppingOrderResult(toppingOrderResult.map((elem, seq) => seq === idx ? e : elem))
  }

  const setOrderToppingBox = (e, idx) => {
    // debugger;

    // toppingOrderResult[idx] = e;
    setToppingOrderResult(toppingOrderResult.map((elem, seq) => seq === idx ? e.target.checked : elem))
    // setToppingOrderResult[idx] = e.target.checked; 
  }

  const setMenuToppingRadio = (e, idx, id, seq, result) => {
    // debugger;
    let nResult = result;
    nResult[idx] = e.target.value;
    setMenuList(menuList.map(elem => elem.id === id && elem.cloneSequence === seq ? { ...elem, toppingResult: nResult } : elem));

    // toppingOrderResult[idx] = e;
    // setToppingOrderResult(toppingOrderResult.map((elem, seq) => seq === idx ? e : elem))
  }

  const setMenuToppingBox = (e, idx, id, seq, result) => {
    // debugger;

    // toppingOrderResult[idx] = e;
    let nResult = result;
    nResult[idx] = e.target.checked;
    setMenuList(menuList.map(elem => elem.id === id && elem.cloneSequence === seq ? { ...elem, toppingResult: nResult } : elem));
    calculateCartTotal();
    // setDatas(datas.map(item => item.id === index ? {...item, someProp : "changed"} : item )))

    // setToppingOrderResult[idx] = e.target.checked; 
  }

  const cloneMenuItem = (item) => {
    // debugger;
    let cloneItem = { ...item }
    cloneItem['inCart'] = false;
    let isFound = false;
    let insertIdx = 0;
    let seq = 1;
    menuList.some((elem, idx) => {
      if (cloneItem.id == elem.id) {
        if (isFound) {
          insertIdx = idx;
          seq = elem.cloneSequence + 1;
        } else {
          isFound = true;
          insertIdx = idx;
        }
      } else {
        if (isFound)
          return true;
      }
    })
    cloneItem.cloneSequence = seq;
    cloneItem['toppingArray'] = item.topping != null ? item.topping.split(',').map(e => parseInt(e)) : [];
    cloneItem['toppingResult'] = item.topping != null ? (setupToppingApplyMenu(item))[0] : [];

    // cloneItem.toppingResult = [];
    insertIdx++;
    menuList.splice(insertIdx, 0, cloneItem);
    insertCloneItem(cloneItem);
    setMenuList([...menuList]);

  }

  const insertCloneItem = elem => {
    // debugger;
    if (chosenToppingMap && chosenToppingMap.hasOwnProperty(elem.id))
      chosenToppingMap[elem.id].push(elem.cloneSequence)
    else {
      chosenToppingMap[elem.id] = [elem.cloneSequence];

      setChosenToppingMap(chosenToppingMap)
    }


  }

  const removeCloneItem = elem => {
    // debugger;
    let chosenTopping;
    if (chosenToppingMap.hasOwnProperty(elem.id)) {
      chosenTopping = chosenToppingMap[elem.id].filter(seqId => {
        if (seqId == elem.cloneSequence)
          return null;
        else
          return seqId
      });
    }
    chosenToppingMap[elem.id] = chosenTopping;
    setChosenToppingMap(chosenToppingMap);
  }

  const mergeChoiceToppingToMenu = menuList => {
    // debugger;
    if (chosenToppingMap == "")
      return menuList;
    const completedMenu = menuList.reduce((acc, item) => {
      if (chosenToppingMap.hasOwnProperty(item.id)) {
        acc.push(item);
        const arr1 = chosenToppingMap[item.id];
        arr1.forEach(seqId => {
          let cloneItem = { ...item };
          cloneItem.cloneSequence = seqId;
          cloneItem['toppingArray'] = item.topping != null ? item.topping.split(',').map(e => parseInt(e)) : [];
          let lb_found = false;
          cartList.forEach(elem => {
            // console.log("before" + elem.name);
            if (elem.id === cloneItem.id && elem.cloneSequence === cloneItem.cloneSequence) {
              cloneItem['toppingResult'] = elem.toppingResult;
              lb_found = true;
            }
          })
          if (!lb_found)
            cloneItem['toppingResult'] = item.topping != null ? (setupToppingApplyMenu(item))[0] : [];

          // cloneItem['toppingResult'] = item.topping != null ? setupToppingApplyMenu(item) : [];
          acc.push(cloneItem);
        })
        return acc;
      } else
        acc.push(item);
      return acc;
    }, [])
    return completedMenu;
  }

  const removeCloneMenuItem = item => {
    //remove from chosen Topping List
    removeCloneItem(item);
    // remove ordered items from cart
    const nCartList = cartList.filter((elem) => {
      if (elem.id === item.id && elem.cloneSequence == item.cloneSequence) {
        elem.toppingArray = [];
        elem.toppingResult = [];
        return false;
      }
      else
        return true;
    });
    setCartList([...nCartList]);
    // remove item from menuList
    const nMenuList = menuList.reduce((acc, elem) => {
      if (elem.id === item.id && elem.cloneSequence == item.cloneSequence) {
        elem.toppingArray = [];
        elem.toppingResult = [];
        return acc;
      } else {
        acc.push(elem);
        return acc
      }
    }, []);
    setMenuList([...nMenuList]);
    // adjust cloneSequence in menuList
  }

  const submitOrder = () => {
    // let i = 0;
    // while (i < 1000) {
    //   let r = i * 63;
    //   if (r % 2 === 1 &&
    //     r % 4 === 1 &&
    //     r % 5 === 4 &&
    //     r % 6 === 3 &&
    //     r % 8 === 1) {
    //     console.log("number is " + r + " " + i);
    //   }
    //   i++;
    // }
    // if (node.id != "") {
    //   handleUpdateCategory();
    //   return;
    // }
    // debugger;
    let data = {
      status: access.Status.submit,
      cart: JSON.stringify(cartList),
      topping_order_result: JSON.stringify(toppingOrderResult),
      topping_apply_order: JSON.stringify(toppingApplyOrder),
      restaurant_id: restaurantId,
      date_id: new Date().toLocaleDateString().split('/').reverse().join(''),
      order_id: shareContext.state.customer.orderId,
      name: shareContext.state.customer.name
    };
    // props.history.push("/Queue", { toppingMap: toppingMap });
    let isMounted4 = true;
    const promise1 = access.addOrders(data);
    Promise.resolve(promise1)
      .then(res => {
        if (isMounted4) {
          let m = "Order id " + res.data[0].id + " is created Successfully !!!";
          setMessage({ status: 200, msg: m });
          props.history.push("/Queue", { toppingMap: toppingMap });
        }
      }).finally(() => {
        isMounted4 = false;
      });;
  }

  const dishPrice = (item, price, final_price, size, symbol) => {
    return (
      <Grid container spacing={0} >
        <Grid item xs={9} className={classes.textLeft}>
          {/* <Box className={classes.priceBox}> */}
          {item.discount && item.discount != 0 ?
            <div>
              <Typography display="inline" className={classes.priceContent} style={{ textDecorationLine: 'line-through' }}>
                ${price}
              </Typography>
              <Typography display="inline" className={classes.discountContent} >
                <b>[</b>&nbsp;{item.discount}{item.discount_method === 2 ? '% ' : null}off<b>&nbsp;]</b>
              </Typography>
              <Typography display="inline" className={classes.priceContent} >
                ${final_price.toFixed(2)}
              </Typography>
            </div>
            :
            <Typography display="inline" className={classes.priceContent}>
              ${price}
            </Typography>
          }
          {/* <Typography display="inline" className={classes.priceContent}>
            ${price}
          </Typography> */}
          {/* </Box> */}
          <Typography display="inline" className={classes.sizeContent}>

            {item.isMultiple == true ? t(symbol) : null}

          </Typography >
        </Grid>
        {/* &nbsp; */}
        <Grid item xs={3} className={classes.textLeft}>

          {/* </Grid> */}
          {/* <Grid item xs={3} sm={3}> */}
          <Link to='#!' onClick={(e) => addToOrder(e, item, price, final_price, size)} >
            <Box component='span' mt={-1}>
              <AddCircleOutlineIcon className={classes.priceIcon} />
            </Box>
          </Link>
          {/* &nbsp;&nbsp;&nbsp;&nbsp; */}

          {/* <IconButton aria-label="delete" onClick={(e) => addToOrder(e, item, price, size)} >
            <Tooltip title={t("Add")} arror>
              <AddCircleOutlineIcon />
            </Tooltip>
          </IconButton> */}
          <Typography className={classes.priceContent} display="inline">
            &nbsp;{getQuantity(item, size)}&nbsp;
          </Typography>

          {isQuantity(item, size) ? (
            // <Link
            //   to="#!"
            //   onClick={(e) => removeFromOrder(e, item, size)}
            //   className=" flow-right"
            // >
            //   <MdRemoveCircle color="Primary" size="2rem" />
            // </Link>
            // <IconButton edge="end" aria-label="delete" onClick={(e) => removeFromOrder(e, item, price, size)} >
            //   <Tooltip title={t("Subtract")} arror>
            //     <RemoveCircleOutlineIcon />
            //   </Tooltip>
            // </IconButton>

            <Link to='#!' onClick={(e) => removeFromOrder(e, item, size)} className={classes.priceIcon}>
              <RemoveCircleOutlineIcon className={classes.priceIcon} />
            </Link>
          ) : null}

          {/* </Grid> */}
          {/* <Grid item xs={3} sm={3}> */}
          {/* <Typography className={classes.quantityBox}>
            {getQuantity(item, size)} */}
          {/* <CheckIcon /> */}
          {/* </Typography> */}
        </Grid>
      </Grid >
    )
  };



  const dishCard = (item, idx, bDetail, isNotDone = true) => {
    // debugger;
    return (
      // <Grid container spacing={2}>
      //   <Grid item xs={12} sm={12}>


      <Card className={classes.root}>
        <Grid container spaceing={1} alignItems="flex-start">
          <Grid item xs={2}>
            <CardActionArea
              onClick={(e) => setDetail(
                {
                  isDetail: true,
                  menu: item,
                  // getImage: getImage,
                  // dishPrice: dishPrice,
                  // setMenuToppingBox: setMenuToppingBox,
                  // setMenuToppingRadio: setMenuToppingRadio,
                  // Toppingmenuline: Toppingmenuline,
                  // toppingGroupMap: toppingGroupMap,
                  // toppingMap: toppingMap


                })} >
              <CardMedia
                className={classes.media}
                image={shareContext.state.username == 'demo' || shareContext.state.username == 'demo2' ? item.image_path : getImage(item.image_path)}
                title={item.name}
              />
            </CardActionArea>
          </Grid>
          <Grid item xs={10}>
            <CardContent className={classes.content}>
              <Grid container spacing={0}>
                <Grid item xs={7}>
                  <Box component="fieldset" mb={0} borderColor="transparent" className={classes.textLeft}>
                    <ShowName wordSize={wordSize} name={item.name} is_new={item.is_new} />
                    {/* <Typography variant="h6" component="h2" className={classes.nameContent} noWrap>
                      {item.name}
                    </Typography> */}

                  </Box>
                </Grid>
                <Grid item xs={5} >
                  {
                    item.rating_size != 0 ?

                      <Box component="fieldset" mb={0} borderColor="transparent" className={classes.textRight}>
                        <Link to='#!' onClick={(e) => setToComment({ isComment: true, menu: item })} >
                          <Rating
                            readOnly
                            // name="simple-controlled"
                            value={item.rating_sum / item.rating_size}
                            size="small"
                            precision={0.5}
                          // onChange={(e) => setToComment({ isComment: true, menu: item })}
                          />({item.rating_size})
                  </Link>
                      </Box>
                      :


                      <Box component="fieldset" mb={0} borderColor="transparent" className={classes.textRight}>
                        <Link to='#!' onClick={(e) => setToComment({ isComment: true, menu: item })} >
                          <Tooltip title={t("FirstComment")} aria-label="Toppings">
                            <Typography variant="caption" component="h2" className={classes.content} noWrap>
                              {t("NoComment")}
                            </Typography>
                          </Tooltip>

                        </Link>
                      </Box>
                  }

                </Grid>
                <Grid item xs={10}>
                  <Box component="fieldset" mb={0} borderColor="transparent" className={classes.textLeft}>
                    {/* <Typography component="p" className={classes.descContent} wrap="true">
                      // This is a description of menu and length is limited to 128 chars.
                      // This is a description of menu and length is limited to 128 chars.
                    </Typography> */}

                    <ShowDesc wordSize={wordSize} item={item} />
                    {item.inCart ?
                      // <ItemTopping elem={cartList[0]} toppingMap={toppingMap} />
                      cartList.map((elem, idx) => {
                        if (isNotDone && item.id === elem.id && item.cloneSequence == elem.cloneSequence) {
                          isNotDone = false;
                          return (

                            <ItemTopping key={idx} elem={elem} toppingMap={toppingMap} />

                          )
                        }
                      })
                      :
                      <Typography variant="h6" className={classes.toppingContent}>
                        {item.defaultTopping && item.defaultTopping.length ?
                          // fetchToppingNameList(item.defaultTopping)
                          <ShowTopping wordSize={wordSize} name={item.defaultTopping} fetchToppingNameList={fetchToppingNameList} />
                          :
                          null}


                      </Typography>
                    }
                  </Box>


                </Grid>
                <Grid item xs={10}>
                  {!category ?
                    <Typography variant="body2" color="textSecondary" component="p" >
                      {item.price_s > 0 ? dishPrice(item, item.price_s, item.final_price_s, 1, 'S') : null}
                    </Typography>
                    :


                    <Typography variant="body2" color="textSecondary" component="div" >
                      {item.price_s > 0 ? dishPrice(item, item.price_s, item.final_price_s, 1, 'S') : null}
                      {item.price_m > 0 ? dishPrice(item, item.price_m, item.final_price_m, 2, 'M') : null}
                      {item.price_l > 0 ? dishPrice(item, item.price_l, item.final_price_l, 3, 'L') : null}
                      {item.price_x > 0 ? dishPrice(item, item.price_x, item.final_price_x, 4, 'X') : null}
                    </Typography>
                  }

                  {bDetail ?
                    detail.menu && detail.menu.id === item.id == true ?
                      <Box component="fieldset" mb={0} borderColor="transparent" className={classes.textRight}>
                        <Link
                          to='#!'
                          onClick={
                            (e) => setDetail({
                              ...detail,
                              isDetail: false,
                              menu: null
                            })
                          } >
                          <Tooltip title="see more about menu ..." aria-label="Toppings">
                            <Typography variant="body2" color="textSecondary" component="p" className={classes.textRight}>
                              <ExpandLessIcon />
                            </Typography>
                          </Tooltip>

                        </Link>
                      </Box>
                      :
                      <Box component="fieldset" mb={0} borderColor="transparent" className={classes.textRight}>
                        <Link
                          to='#!'
                          onClick={
                            (e) => setDetail(
                              {
                                ...detail,
                                isDetail: true,
                                menu: item
                              })
                          } >
                          <Tooltip title="see more about menu ..." aria-label="Toppings">
                            <Typography variant="body2" color="textSecondary" component="p" className={classes.textRight}>
                              <ExpandMoreIcon />
                            </Typography>
                          </Tooltip>

                        </Link>
                      </Box>
                    : null}


                </Grid>
              </Grid>






              {/* <Typography variant="body2" color="textSecondary" component="p">
                    {item.price_s > 0 ? dishPrice(item, item.price_s, 1, 'S') : null}
                    {item.price_m > 0 ? dishPrice(item, item.price_m, 2, 'M') : null}
                    {item.price_l > 0 ? dishPrice(item, item.price_l, 3, 'L') : null}
                    {item.price_x > 0 ? dishPrice(item, item.price_x, 4, 'X') : null}
                  </Typography> */}

              {/* <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
          </Typography> */}
            </CardContent>
          </Grid>

          {/* {
            item.hasTopping ?
              <CardActions>
                {item.cloneSequence === 0 ?
                  <Link to='#!' onClick={(e) => cloneMenuItem(item)} >
                    <Tooltip title="For order with other toppings" aria-label="Toppings">
                      <FileCopyIcon />
                    </Tooltip>
                  </Link>
                  :
                  <Link
                    to='#!'
                    onClick={(e) => removeCloneMenuItem(item)}
                  >
                    <Tooltip title="For removing addition menu item" aria-label="Toppings">
                      < DeleteOutlineIcon />
                    </Tooltip>
                  </Link>
                }
                {item.inCart ?
                  // <ItemTopping elem={cartList[0]} toppingMap={toppingMap} />
                  cartList.map((elem, idx) => {
                    if (isNotDone && item.id === elem.id && item.cloneSequence == elem.cloneSequence) {
                      isNotDone = false;
                      return (
                        <ItemTopping key={idx} elem={elem} toppingMap={toppingMap} />
                      )
                    }
                  })
                  :
                  <Typography variant="caption">
                    {item.defaultTopping && item.defaultTopping.length ?
                      fetchToppingNameList(item.defaultTopping)
                      :
                      t("ChooseTopping")}
                  </Typography>
                }
              </CardActions>
              :
              // <Typography variant="caption">
              //   <Tooltip title={t("NoTopping")}y aria-label="Toppings">
              //     <FileCopyIcon readOnly />
              //   </Tooltip>
              //   {t("NoTopping")}
              // </Typography>
              null
          } */}

        </Grid>
        {detail.isDetail && item.id == detail.menu.id && item.cloneSequence == detail.menu.cloneSequence ?

          <Grid item xs={12}>

            <OrderDetail {...props}
              menu={detail.menu}
              setDetail={setDetail}
              taxRate={restaurant.tax_rate}
              cartTotal={cartTotal}
              getImage={getImage}
              dishPrice={dishPrice}
              setMenuToppingBox={setMenuToppingBox}
              setMenuToppingRadio={setMenuToppingRadio}
              Toppingmenuline={Toppingmenuline}
              toppingGroupMap={toppingGroupMap}
              toppingMap={toppingMap}
              cloneMenuItem={cloneMenuItem}
              removeCloneMenuItem={removeCloneMenuItem}
              wordSize={wordSize}
            />

          </Grid>

          :
          null
        }
      </Card >
    );
  };

  const fetchCategoryName = (id) => {
    // debugger;
    if (id !== catId) {
      catId = id;
      let catName;
      categoryList.forEach(cate => {
        if (cate.id == id) {
          catName = cate.label;
          return true;
        }
      })
      return (
        <Col sm="12" key={id} >
          <Card>
            <CardBody className="text-left my-0 py-0 pl-0 ml-0 bg-dark w-100 text-white">
              <b>{catName}</b>
            </CardBody>

          </Card>
        </Col>)
    }
  }

  const dishList = (item, idx) => {
    // debugger;
    return (
      <>


        {fetchCategoryName(item.category_id)}



        <Col sm="6" key={idx} >
          <Card className="border-0">
            <CardBody className="text-left my-0 py-0 pl-0 ml-0">
              <Link
                to="#!"
                onClick={(e) => setDetail({
                  isDetail: true,
                  menu: item
                })}
                className=" flow-left"
              >
                <MdEventNote color="Primary" size="2rem" />
              </Link>
            &nbsp;
            <b>{item.name}</b>
              {item.toppingResult && item.toppingResult.length > 0 ?
                <Toppingmenuline
                  item={item}
                  toppingApplyMenu={item.toppingArray}
                  toppingGroupMap={toppingGroupMap}
                  toppingMap={toppingMap}
                  toppingMenuResult={item.toppingResult}
                  setMenuToppingBox={setMenuToppingBox}
                  setMenuToppingRadio={setMenuToppingRadio}
                  wordSize={wordSize}
                />
                :
                null
              }
            </CardBody>
            <CardBody className="text-left my-0 py-0 pl-0 ml-0">
              {item.price_s > 0 ? dishPrice(item, item.price_s, 1, 'S') : null}
              {item.price_m > 0 ? dishPrice(item, item.price_m, 2, 'M') : null}
              {item.price_l > 0 ? dishPrice(item, item.price_l, 3, 'L') : null}
              {item.price_x > 0 ? dishPrice(item, item.price_x, 4, 'X') : null}
            </CardBody>

          </Card>
        </Col>
      </ >
    );
  };

  const orderMain = () => {
    return (
      <Grid container spacing={0}>
        {categoryList && categoryList.map((cItem, idx) => {
          // debugger;
          if (topCategory != 0 && topCategory != cItem.pid)
            return null;
          let prev = cItem;
          let cnt = 0;
          let result = [];
          result[0] = (
            <Grid container spacing={0} className={classes.categoryBox} key={idx}>
              <Grid item xs={6} sm={6}>
                {/* <Box component="fieldset" mb={0} borderColor="transparent" className={classes.textLeft}> */}
                <Typography variant="caption" className={classes.catTitleContent}>
                  {cItem.label}
                </Typography>
                {/* </Box> */}
              </Grid>
              <Grid item xs={6} sm={6}>
                <Box component="fieldset" mb={0} borderColor="transparent" className={classes.textRight}>
                  <Button
                    onClick={(e) => setCategory(cItem)}
                    variant="text"
                  >


                    <Typography className={classes.viewAllContent}>
                      View All
                </Typography>
                  </Button>
                </Box>
              </Grid>
            </Grid>)
          for (let i = 0; cnt < 2 && i < menuList.length; i++) {
            if (menuList[i].category_id == cItem.id) {
              const k = idx * 1000 + cnt + 100;
              cnt++;
              result[cnt] = (
                <Grid item xs={12} sm={6} key={k}>
                  {dishCard(menuList[i], k, false)}
                </Grid>
              )
            }
          }
          return (
            <Grid container spacing={1} className={classes.categoryBox} key={idx}>
              {result}
            </Grid>
          )
        })}
      </Grid>
    )
  }

  const orderCategory = (cId) => {
    let cnt = 0;
    let result = [];

    for (let i = 0; i < menuList.length; i++) {
      if (menuList[i].category_id == cId) {
        result[cnt] = (
          // <Grid container key={cnt}>
          <Grid item xs={12} sm={6} key={cnt}>
            {dishCard(menuList[i], cnt, true)}
          </Grid>
          // </Grid>
        )
        // if (detail.isDetail && menuList[i].id == detail.menu.id) {
        //   cnt++;
        //   result[cnt] =
        //     <Grid item xs={12} sm={6} key={cnt}>
        //       <OrderDetail {...props}
        //         menu={detail.menu}
        //         setDetail={setDetail}
        //         taxRate={restaurant.tax_rate}
        //         cartTotal={cartTotal}
        //         getImage={getImage}
        //         dishPrice={dishPrice}
        //         setMenuToppingBox={setMenuToppingBox}
        //         setMenuToppingRadio={setMenuToppingRadio}
        //         Toppingmenuline={Toppingmenuline}
        //         toppingGroupMap={toppingGroupMap}
        //         toppingMap={toppingMap}
        //       />
        //     </Grid>
        // }
        cnt++;
      }
    }
    return (
      <Grid container spacing={2} className={classes.categoryBox}>
        { result}
      </Grid>
    )
  }

  const resetCategory = () => {
    setCategory(null);
  }

  const reduceWordSize = () => {
    if (wordSize > 5) {
      let nSize = wordSize - 1;
      setWordSize(nSize);
    }
  }

  const increaseWordSize = () => {
    if (wordSize < 15) {
      let nSize = wordSize + 1;
      setWordSize(nSize);
    }

  }

  return (


    < div >
      {shareContext.state.customer == undefined || shareContext.state.customer == null
        ? <Customer {...props} setMessage={setMessage} />
        : null
      }

      {/* {shareContext.state.userMode == 1 ? <NavTab {...props} /> : null} */}
      {
        isOrder ? (
          toComment.isComment ?
            <div>
              <UserRate {...props} menu={toComment.menu} setToComment={setToComment} />
            </div>

            : (
              <div>
                <OrderNav
                  {...props}
                  restaurant={restaurant}
                  fetchMenuList={fetchMenuList}
                  cartTotal={cartTotal}
                  setIsOrder={setIsOrder}
                  category={category}
                  setCategory={setCategory}
                  reduceWordSize={reduceWordSize}
                  increaseWordSize={increaseWordSize}
                />
                {topCategoryList && topCategoryList.length > 1 && category == null && shareContext.state.menuFormat != 2 ?
                  <OrderCatNav
                    {...props}
                    setTopCategory={setTopCategory}
                    topCategory={topCategory}
                    topCategoryList={topCategoryList}
                  />
                  :
                  null
                }


                {/* {toppingOrderResult && toppingOrderResult.length > 0 ?
                    <Toppingline
                      toppingApplyOrder={toppingApplyOrder}
                      toppingGroupMap={toppingGroupMap}
                      toppingMap={toppingMap}
                      toppingOrderResult={toppingOrderResult}
                      setOrderToppingBox={setOrderToppingBox}
                      setOrderToppingRadio={setOrderToppingRadio}
                    />
                    : null} */}
                {shareContext.state.menuFormat != 2 ?
                  category == null ?
                    orderMain()
                    :
                    orderCategory(category.id)



                  :
                  <Row>{menuList && menuList.map((item, idx) => dishList(item, idx))}</Row>
                }
              </div>
            )
        ) : (
            <Cart
              addToOrder={addToOrder}
              removeFromOrder={removeFromOrder}
              submitOrder={submitOrder}
              taxRate={restaurant.tax_rate}
              cartTotal={cartTotal}
              isQuantity={isQuantity}
              cartList={cartList}
              setIsOrder={setIsOrder}
              toppingApplyOrder={toppingApplyOrder}
              toppingMap={toppingMap}
              toppingOrderResult={toppingOrderResult}
            />
          )
      }
    </div >
  );
}

export default OrderHome;
