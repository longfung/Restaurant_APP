import React, { useState, useEffect, useContext } from "react";
import Language from './Language';
import {
  Row,
  Col,
  Button,
  Nav,
  NavItem,
  Navbar,
  Jumbotron

} from "reactstrap";
import { MdShoppingCart, MdDehaze, MdSignalCellularConnectedNoInternet1Bar } from "react-icons/md";
import { Link } from "react-router-dom";
import { store } from "./Store";
import access from '../util/access';
import { useTranslation } from 'react-i18next';
import Select, { components } from "react-select";
import { isUndefined } from "axios/lib/utils";

function CategoryNav(props) {
  const shareContext = useContext(store);
  const { t } = useTranslation();
  const restaurant = shareContext.state.restaurant;
  const username = shareContext.state.username;
  const restaurantId = restaurant.id;
  const fetchMenuList = props.fetchMenuList;
  const cartTotal = props.cartTotal;
  const setIsOrder = props.setIsOrder;
  const [categoryList, setCategoryList] = useState([]);
  const [catOptions, setCatOptions] = useState([]);
  const [catValue, setCatValue] = useState({ value: 0, label: null });
  const [menuFormat, setMenuFormat] = useState(1);  // 1 with photo, 2 without format list format

  useEffect(() => {
    setCategoryList([]);
    const promise1 = access.fetchCategoryByRestaurantId(restaurantId, shareContext.state.locale);
    Promise.resolve(promise1)
      // axios
      //   .get("/api/category", { params: { restaurant_id: restaurantId } })
      .then(res => {
        res.data.map(item =>
          setCategoryList(prevState => [
            ...prevState,
            { id: item.id, label: item.namet == null ? item.category_name : item.namet }
          ])
        );
        debugger;
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
          setCatValue(catOpt[0]);
        } else {
          catOpt.forEach((elem) => {
            if (elem.value == catValue.value) {
              catValue.label = elem.label;
            }
          })
        }
        setCatOptions(catOpt);
      })
      .catch(error => console.log(error));
  }, [shareContext.state.locale]);

  useEffect(() => {
    // fetchMenuList(catValue);
    // setLocaleValue("");
    // setSupportLocale([]);
  }, [catValue])

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
    const id = e.value;
    setCatValue(e);
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

  const customStyles = {
    container: (base, state) => ({
      ...base,
      border: state.isFocused ? null : null,
      width: "150px",
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

  const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <CaretDownIcon />
      </components.DropdownIndicator>
    );
  };

  return (
    <div>
      <Navbar color="light" light expand="md"></Navbar>
      <Jumbotron fluid className="my-0 py-1 bg-info w-100">
        <Row>
          <Nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top mr-auto">
            {window.innerWidth > 500 ?
              <Col sm={8}>
                <Button onClick={() => handleSelected(0)}
                  className={shareContext.state.categoryId == null || shareContext.state.categoryId == 0 ? 'btn btn-danger active' : 'btn btn-secondary'}>
                  {t("AllCategory")}</Button>
                {categoryList &&
                  categoryList.map((item, index) => (
                    <Button key={item.id} onClick={() => handleSelected(item.id)}
                      className={shareContext.state.categoryId == item.id ? 'btn btn-danger active' : 'btn btn-secondary'}>
                      {item.label}
                    </Button>
                  ))}

              </Col> :

              <Col sm="8">

                <Select id="localeid"
                  // className="abc"
                  components={{ DropdownIndicator }}
                  theme={customTheme}
                  styles={customStyles}
                  // className='react-select-container'
                  options={catOptions}
                  onChange={handleCatOption}
                  // className="mb-3"
                  value={catValue} />

              </Col>
            }

            <Col sm="1">
              <Link to="#!" onClick={() => switchMenuFormat(1)}
                className={shareContext.state.menuFormat == null || shareContext.state.menuFormat == 1 ? 'btn-outline-danger active' : 'text-white'}>
                <span className="LargeFont">{t("CardFormat")}</span></Link>
              &nbsp;
            <Link to="#!" onClick={() => switchMenuFormat(2)}
                className={shareContext.state.menuFormat == 2 ? 'btn-outline-danger active' : 'text-white'}>
                <span className="LargeFont">{t("ListFormat")}</span></Link>

            </Col>
            <Col sm={3} >
              {shareContext.state.userMode == 2 ?
                <span className="LargeFont"><Language /></span>
                :
                null
              }

              <Col sm={6} className="float-left">
                <Link
                  to="#!"
                  onClick={() => setIsOrder(false)}
                  className="font-weight-bold text-white"
                >
                  <MdShoppingCart color="gold" size="2rem" /> $
              {cartTotal.toFixed(2)}
                </Link>
              </Col>
            </Col >
          </Nav>
        </Row>
      </Jumbotron>
    </div>
  );
}

export default CategoryNav;
