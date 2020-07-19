import React, { useState, useEffect, useContext, useRef } from "react";
import Cart from "./Cart";
import Toppingline from "./Toppingline";
import Toppingmenuline from "./Toppingmenuline";
import Select from "react-select";
import { MdAddCircle, MdRemoveCircle, MdDone, MdEventNote, MdContentCopy, MdDelete } from "react-icons/md";
import access from '../util/access';
// import img1 from "../images/img7.jpg"
// import img1 from "../../../server/images/img3.jpg"
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  ButtonGroup,
  FormGroup,
  Label,
  Card,
  CardImg,
  CardBody,
  NavLink,
  CardText,
  CardImgOverlay,
  CardFooter,
} from "reactstrap";
import { Radio, RadioGroup } from 'react-radio-group'
import CategoryNav from "./CatagoryNav";
import Detail from "./Detail";
import { Link } from "react-router-dom";
import NavTab from "./NavTab";
import { store } from "./Store";
import "../index.css";
import { useTranslation } from 'react-i18next';

function Order(props) {
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
  const [chosenToppingMap, setChosenToppingMap] = useState({});
  const toppingMapRef = useRef([]);
  let catId = 0;

  useEffect(() => {
    // const restaurantId = 45000
    debugger;
    // axios
    //   .get("/api/category", { params: { restaurant_id: restaurantId } })
    const promise1 = access.fetchCategoryByRestaurantId(restaurantId);
    Promise.resolve(promise1)
      .then((res) => {
        setCategoryList([]);
        res.data.map((item) =>
          setCategoryList((prevState) => [
            ...prevState,
            { id: item.id, label: item.namet == null ? item.category_name : item.namet },
          ])
        );
      })
      .catch((error) => console.log(error));
    getToppingList();
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
    debugger;
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
        debugger;
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
          item['toppingResult'] = item.topping != null ? setupToppingApplyMenu(item) : [];
          item['cloneSequence'] = 0;    // 0 - roiginal, others - cloned
          // debugger;
          // setMenuList(prevState => [...prevState, item])
          // update cart list if there is any
          cartList.forEach(elem => {
            // console.log("before" + elem.name);
            if (elem.id == item.id)
              elem.name = item.name;
            // console.log("after" + elem.name);
          })
          return item;
        })
        // if (categoryId === 0) {
        // newMenuList.sort((a, b) => {
        //   return a.category_id - b.category_id;
        // })
        // }
        const completedMenu = mergeChoiceToppingToMenu(newMenuList);
        completedMenu.sort((a, b) => {
          return a.id - b.id;
        })
        setMenuList([...completedMenu]);
      })
      .catch();
  };

  const getToppingList = () => {
    const promise1 = access.fetchToppingByRestaurantId(restaurantId, shareContext.state.locale);
    Promise.resolve(promise1)
      // axios
      //   .get("/api/category", { params: { restaurant_id: restaurantId } })
      .then((res) => {
        setupToppingMap(res.data);
        const cId = shareContext.state.categoryId == null ? 0 : shareContext.state.categoryId;
        fetchMenuList(cId);
      })
      .catch((error) => console.log(error));
  }

  const setupToppingMap = oList => {
    let tMap = {};
    let gMap = {};
    let tList = [];
    let rList = [];
    let cnt = 0;
    debugger;
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
    let cnt = 0;
    const tMap = toppingMapRef.current;
    debugger;
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
        cnt++;
      }

    });
    return rList;
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

  const addToOrder = (event, item, price, size) => {
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
        size: size,
        quantity: 1,
        status: 1,
        isTopping: false,
      };
      setCartList([...nCartList, tmpCart]);
    } else {
      setCartList([...nCartList]);
    }
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
    debugger;
    let sum = 0;
    for (let i = 0; i < cartList.length; i++) {
      if (cartList[i].quantity !== 0) {
        sum += cartList[i].quantity * cartList[i].price;
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
        <CardText className="font-weight-bold text-primary">
          <MdDone color="Primary" size="2rem" /> {q}
        </CardText>
      );
    }
  };

  const removeFromOrder = (event, item, size) => {
    // search dish has been ordered yet
    event.preventDefault();
    debugger;
    const nCartList = cartList.filter((elem) => {
      if (elem.id === item.id && elem.cloneSequence == item.cloneSequence && elem.size === size) {
        elem.quantity--;
        if (elem.quantity !== 0) return elem;
        else return null;
      }
      return elem;
    });
    setCartList([...nCartList]);
  };

  const setOrderToppingRadio = (e, idx) => {
    debugger;

    // toppingOrderResult[idx] = e;
    setToppingOrderResult(toppingOrderResult.map((elem, seq) => seq === idx ? e : elem))
  }

  const setOrderToppingBox = (e, idx) => {
    debugger;

    // toppingOrderResult[idx] = e;
    setToppingOrderResult(toppingOrderResult.map((elem, seq) => seq === idx ? e.target.checked : elem))
    // setToppingOrderResult[idx] = e.target.checked; 
  }

  const setMenuToppingRadio = (e, idx, id, seq, result) => {
    debugger;
    let nResult = result;
    nResult[idx] = e;
    setMenuList(menuList.map(elem => elem.id === id && elem.cloneSequence === seq ? { ...elem, toppingResult: nResult } : elem));

    // toppingOrderResult[idx] = e;
    // setToppingOrderResult(toppingOrderResult.map((elem, seq) => seq === idx ? e : elem))
  }

  const setMenuToppingBox = (e, idx, id, seq, result) => {
    debugger;

    // toppingOrderResult[idx] = e;
    let nResult = result;
    nResult[idx] = e.target.checked;
    setMenuList(menuList.map(elem => elem.id === id && elem.cloneSequence === seq ? { ...elem, toppingResult: nResult } : elem));
    calculateCartTotal();
    // setDatas(datas.map(item => item.id === index ? {...item, someProp : "changed"} : item )))

    // setToppingOrderResult[idx] = e.target.checked; 
  }

  const cloneMenuItem = (item) => {
    debugger;
    let cloneItem = { ...item }
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
    cloneItem['toppingResult'] = item.topping != null ? setupToppingApplyMenu(item) : [];

    // cloneItem.toppingResult = [];
    insertIdx++;
    menuList.splice(insertIdx, 0, cloneItem);
    insertCloneItem(cloneItem);
    setMenuList([...menuList]);

  }

  const insertCloneItem = elem => {
    debugger;
    if (chosenToppingMap && chosenToppingMap.hasOwnProperty(elem.id))
      chosenToppingMap[elem.id].push(elem.cloneSequence)
    else {
      chosenToppingMap[elem.id] = [elem.cloneSequence];

      setChosenToppingMap(chosenToppingMap)
    }


  }

  const removeCloneItem = elem => {
    debugger;
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
    debugger;
    if (chosenToppingMap == null)
      return menuList;
    const completedMenu = menuList.reduce((acc, item) => {
      if (chosenToppingMap.hasOwnProperty(item.id)) {
        acc.push(item);
        const arr1 = chosenToppingMap[item.id];
        arr1.forEach(seqId => {
          let cloneItem = { ...item };
          cloneItem.cloneSequence = seqId;
          cloneItem['toppingArray'] = item.topping != null ? item.topping.split(',').map(e => parseInt(e)) : [];
          cloneItem['toppingResult'] = item.topping != null ? setupToppingApplyMenu(item) : [];
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
  }

  const dishPrice = (item, price, size, symbol) => {
    return (
      <Row className="text-left my-0 py-0 pl-0 ml-0 ">
        <Col sm="4" xs="4">
          <CardText className="d-inline bg-dark font-weight-bold text-light">
            ${price}
          </CardText>
          &nbsp;
          {item.isMultiple == true ? t(symbol) : null}
        </Col>
        <Col sm="4" xs="4">
          <Link
            to="#!"
            onClick={(e) => addToOrder(e, item, price, size)}
            className="flow-right"
          >
            <MdAddCircle color="Primary" size="2rem" />
          </Link>
          &nbsp;
          {isQuantity(item, size) ? (
            <Link
              to="#!"
              onClick={(e) => removeFromOrder(e, item, size)}
              className=" flow-right"
            >
              <MdRemoveCircle color="Primary" size="2rem" />
            </Link>
          ) : null}
        </Col>
        <Col sm="4" xs="4">
          <i>{getQuantity(item, size)}</i>
        </Col>
      </Row>
    )
  };

  const dishCard = (item, idx) => {
    // debugger;
    return (
      <Col sm="4" key={idx}>
        <Card className="border-0">
          <div className="imgblock">
            <CardImg
              top
              width="100%"
              className="imgbox h-100 d-inline-block"
              src={item.image_path}
              alt="Card image cap"
            />
          </div>

          <CardBody className="text-left py-0 by-0 pl-0 bl-0">
            {item.price_s > 0 ? dishPrice(item, item.price_s, 1, 'S') : null}
            {item.price_m > 0 ? dishPrice(item, item.price_m, 2, 'M') : null}
            {item.price_l > 0 ? dishPrice(item, item.price_l, 3, 'L') : null}
            {item.price_x > 0 ? dishPrice(item, item.price_x, 4, 'X') : null}
          </CardBody>
          <CardBody className="text-left pt-0 bt-0 pl-0 bl-0">
            {item.cloneSequence === 0 ?
              <Link
                to="#!"
                onClick={(e) => cloneMenuItem(item)}
                className=" flow-left"
              >
                <MdContentCopy color="Primary" size="2rem" />
              </Link>
              :
              <Link
                to="#!"
                onClick={(e) => removeCloneMenuItem(item)}
                className=" flow-left"
              >
                <MdDelete color="Primary" size="2rem" />
              </Link>
            }

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
            {item.name}
            {item.toppingResult && item.toppingResult.length > 0 ?
              <Toppingmenuline
                item={item}
                toppingApplyMenu={item.toppingArray}
                toppingGroupMap={toppingGroupMap}
                toppingMap={toppingMap}
                toppingMenuResult={item.toppingResult}
                setMenuToppingBox={setMenuToppingBox}
                setMenuToppingRadio={setMenuToppingRadio}
              />
              :
              null
            }

          </CardBody>
        </Card>
      </Col>
    );
  };

  const fetchCategoryName = (id) => {
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
    debugger;
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

  return (
    <div>
      {userMode != 2 ? <NavTab {...props} /> : null}
      {isOrder ? (
        detail.isDetail == true ?
          <div>
            <Detail {...props} menu={detail.menu} setDetail={setDetail} /> }
          </div>
          : (
            <div>
              <CategoryNav
                {...props}
                restaurant={restaurant}
                fetchMenuList={fetchMenuList}
                cartTotal={cartTotal}
                setIsOrder={setIsOrder}
              />

              {toppingOrderResult && toppingOrderResult.length > 0 ?
                <Toppingline
                  toppingApplyOrder={toppingApplyOrder}
                  toppingGroupMap={toppingGroupMap}
                  toppingMap={toppingMap}
                  toppingOrderResult={toppingOrderResult}
                  setOrderToppingBox={setOrderToppingBox}
                  setOrderToppingRadio={setOrderToppingRadio}
                />
                : null}
              {shareContext.state.menuFormat != 2 ?
                <Row>{menuList && menuList.map((item, idx) => dishCard(item, idx))}</Row>
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
        )}
    </div>
  );
}

export default Order;
