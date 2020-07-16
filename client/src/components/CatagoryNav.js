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
import { MdShoppingCart, MdDehaze, MdArrowBack, MdSignalCellularConnectedNoInternet1Bar } from "react-icons/md";
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
  const [formatOptions, setFormatOptions] = useState([]);
  const [formatValue, setFormatValue] = useState({ value: 1, label: null });
  const [langOptions, setLangOptions] = useState([]);
  const [langValue, setLangValue] = useState({ value: null, label: null });
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
        if (formatValue == null || formatValue.value == 1) {
          setFormatValue(temp1Obj);
        } else {
          setFormatValue(temp2Obj);
        }
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
          setLangValue(temp3Obj);
          setLangOptions(langOpt);
        }

      })
      .catch(error => console.log(error));
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

  const switchMenuFormat2 = e => {
    const id = e.value;
    setFormatValue(e);
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

  const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <CaretDownIcon />
      </components.DropdownIndicator>
    );
  };

  const setLanguage = (locale) => {
    shareContext.dispatch({ type: "setLocale", value: locale.value });
  };

  return (
    <div>
      <Navbar color="light" light expand="md"></Navbar>
      <Jumbotron fluid className="my-0 py-1 bg-info w-100">
        <Row>
          <Nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top mr-auto">
            {window.innerWidth > 500 ?
              <React.Fragment>
                <Col sm="1" xs="1">
                  {shareContext.state.userMode == 1 ?

                    <NavItem className="mt-0">
                      <Button className="border-dark bg-dark font-weight-bold text-white"
                        onClick={
                          () => goComponent("/Restaurant")
                        }>
                        {
                          <MdArrowBack color='white' size='3rem' />
                        } </Button>
                    </NavItem>
                    :
                    null
                  }
                </Col>
                <Col sm={6}>
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

                </Col>
                <Col sm="1">
                  <Link to="#!" onClick={() => switchMenuFormat(1)}
                    className={shareContext.state.menuFormat == null || shareContext.state.menuFormat == 1 ? 'btn-outline-danger active' : 'text-white'}>
                    <span className="LargeFont">{t("CardFormat")}</span></Link>
              &nbsp;
            <Link to="#!" onClick={() => switchMenuFormat(2)}
                    className={shareContext.state.menuFormat == 2 ? 'btn-outline-danger active' : 'text-white'}>
                    <span className="LargeFont">{t("ListFormat")}</span></Link>

                </Col>
                <Col sm={4} >
                  {shareContext.state.userMode == 2 || shareContext.state.userMode == 1 ?
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
              </React.Fragment>
              :

              <React.Fragment>
                <Col sm="3" xs="3" className="float-left mx-0 px-0">

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
                <Col sm="3" xs="3">
                  <Select id="formatid"
                    // className="abc"
                    components={{ DropdownIndicator }}
                    theme={customTheme}
                    styles={customFormatStyles}
                    // className='react-select-container'
                    options={formatOptions}
                    onChange={switchMenuFormat2}
                    // className="mb-3"
                    value={formatValue} />
                </Col>

                {shareContext.state.userMode == 2 ?
                  <Col sm="3" xs="3">
                    <Select id="languageid"
                      // className="abc"
                      components={{ DropdownIndicator }}
                      theme={customTheme}
                      styles={customLangStyles}
                      // className='react-select-container'
                      options={langOptions}
                      onChange={setLanguage}
                      // className="mb-3"
                      value={langValue} />
                  </Col> :
                  null
                }

                <Col sm={3} xs="3" className="float-left mx-0 px-0">
                  <Link
                    to="#!"
                    onClick={() => setIsOrder(false)}
                    className="font-weight-bold text-white float-left text-sm-left"
                  >
                    <MdShoppingCart color="gold" size="2rem" />${cartTotal.toFixed(2)}
                  </Link>

                </Col >

              </React.Fragment>
            }



          </Nav>
        </Row>
      </Jumbotron>
      <div class="padding70"> </div>
    </div>
  );
}

export default CategoryNav;
