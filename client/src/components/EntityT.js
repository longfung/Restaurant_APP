import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import axios from "axios";
import NavTab from "./NavTab";
// import img1 from "../images/img7.jpg"
// import img1 from "../../../server/images/img3.jpg"
import {
    Form,
    Input,
    Row,
    Col,
    Button,
    FormGroup,
    Label
} from "reactstrap";
import { store } from "./Store";
import "../index.css";
import access from "../util/access";
import { useTranslation } from 'react-i18next';
import Editpan from "./Editpan";
import Displaypan from "./DisplayPan";
import ScrollShadow from 'react-scroll-shadow';
import { Card } from '../styleds';


function EntityT(props) {
    const shareContext = useContext(store);
    const { t } = useTranslation();

    const restaurantId = shareContext.state.restaurant != null ? shareContext.state.restaurant.id : null;
    const defaultLanguage = shareContext.state.restaurant.locale;
    if (!restaurantId) {
        props.history.push("/Login");
    }
    const setMessage = props.setMessage;
    const [menuT, setMenuT] = useState({});
    const [menuTClone, setMenuTClone] = useState({});
    const [menuTList, setMenuTList] = useState([]);
    const [entity, setEntity] = useState(1);
    const [lang, setLang] = useState(null);

    useEffect(() => {
        getMenuTList(lang, entity);
    }, []);

    const getMenuTList = (locale, entity) => {
        const promise1 = access.fetchEntityTByRestaurantId(restaurantId,
            locale, entity);
        Promise.resolve(promise1).then((res) => {
            setMenuTList(res.data);
        }).catch((error) => console.log("Error"));
    };

    const handleUpdateMenu = () => {
        postUpdateMenu();
        initialMenuT();
    };

    const postUpdateMenu = () => { // debugger;
        const data = {
            id: menuT.id,
            namet: entity == 3 ? menuT.description : menuT.namet,
            locale: lang,
            entityId: entity,
            restaurantId: restaurantId
        };
        const promise1 = access.updateEntityT(data);
        Promise.resolve(promise1).then((res) => {
            let m = menuT.name + " is updated Successfully !!!";
            setMessage({ status: 200, msg: m });
            getMenuTList(lang, entity);
        });
    };

    const setEdit = (obj) => {
        setMenuT({
            id: obj.id,
            name: obj.name ? obj.name : null,
            description: obj.namet == null ? '' : obj.namet,
            namet: obj.namet == null ? '' : obj.namet,
            locale: obj.locale,
            entityId: entity,
            RrstaurantId: obj.restaurantId
        });
        setMenuTClone({
            id: obj.id,
            description: obj.description ? obj.description : null,
        });
    };

    const setDelete = (obj) => {
        const promise1 = access.deleteMenuById(obj.id);
        Promise.resolve(promise1).then((res) => {
            let m = obj.name + " is deleted Successfully !!!";
            setMessage({ status: 200, msg: m });
            getMenuTList();
            // setMenu({ ...menu, name: '', price: 0, category_id: '', path: res.data.filepath });
            initialMenuT();
        }).catch((err) => console.log(err.error));
    };
    const initialMenuT = () => {
        setMenuT({
            ...menuT,
            id: "",
            name: "",
            description: "",
            namet: "",
            locale: "",
            entityId: "",
            restaurantId: ""
        });
        setMenuTClone({
            ...menuTClone,
            id: "",
            description: ""
        });
    };

    const switchLanguage = (elem) => {
        setLang(elem);
        getMenuTList(elem, entity);
    }

    const switchEntity = (elem) => {
        setEntity(elem);
        getMenuTList(lang, elem);
    }


    return (
        <div>
            <div>


                <NavTab {...props} />
                <Form>
                    <Row form>
                        <Col sm="6">
                            <Button className={`${entity == 1 ? 'btn-outline-primary active' : null}`} onClick={
                                () => switchEntity(1)
                            }>
                                {t("MenuName")}</Button>
                            &nbsp;
                        <Button className={`${entity == 2 ? 'btn-outline-primary active' : null}`} onClick={
                                () => switchEntity(2)
                            }>
                                {t("Category")}</Button>
                            &nbsp;
                        <Button className={`${entity == 3 ? 'btn-outline-primary active' : null}`} onClick={
                                () => switchEntity(3)
                            }>
                                {t("MenuDesc")}</Button>
                                &nbsp;
                        <Button className={`${entity == 4 ? 'btn-outline-primary active' : null}`} onClick={
                                () => switchEntity(4)
                            }>
                                {t("TopppingDesc")}</Button>
                        </Col>
                        <Col sm="6">
                            <Button className={`${lang == 'tw' ? 'btn-outline-primary active' : null}`} onClick={
                                () => switchLanguage('tw')
                            }>
                                {t("tw")}</Button>
                            &nbsp;
                        <Button className={`${lang == 'zh' ? 'btn-outline-primary active' : null}`} onClick={
                                () => switchLanguage('zh')
                            }>
                                {t("zh")}</Button>
                        </Col>
                    </Row>
                    {entity == 3 ?
                        <Row form>
                            <Col sm="6">
                                <Label>  {t("DefaultLocale")}&nbsp;({defaultLanguage})</Label>
                                <Displaypan setMenu={setMenuTClone} menu={menuTClone} />
                            </Col>
                            <Col sm="6">
                                <Label>  {t("TargetLocale")}
                            ({lang == null ? t("ChooseLanguage") : lang})
                            </Label>

                                <Editpan setMenu={setMenuT} menu={menuT} />
                            </Col>

                        </Row>
                        :


                        <Row form>
                            <Col sm="6">
                                <FormGroup className="float-left">
                                    <Label for="name">{t("DefaultLocale")}&nbsp;({defaultLanguage})</Label>
                                    <Input disabled type="text"
                                        value={
                                            menuT.name
                                        }
                                        id="name" />
                                </FormGroup>
                            </Col>
                            <Col sm="6">
                                <FormGroup className="float-left">
                                    <Label for="nameT">{t("TargetLocale")}
                                ({lang == null ? t("ChooseLanguage") : lang})
                                </Label>
                                    <Input type="text" id="nameT"
                                        value={
                                            menuT.namet
                                        }
                                        onChange={
                                            (e) => setMenuT({
                                                ...menuT,
                                                namet: e.target.value
                                            })
                                        } />
                                </FormGroup>
                            </Col>
                        </Row>
                    }
                    <Row from>
                        <Col xs="6" sm="6">
                            <Button onClick={handleUpdateMenu}>
                                {t("Save")}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>

            <Row>
                <Col sm={12}>


                    <Card>
                        <ScrollShadow isShadow={true} scrollWidth={10} scrollPadding={5}>
                            <Row>
                                <Col sm="5">
                                    <h2>{t("TranslationList")}</h2>
                                </Col>

                            </Row>
                            <ul> {
                                menuTList && menuTList.map((item, idx) => (
                                    <Row key={idx}>
                                        <Col sm="5">
                                            {entity == 3 ?
                                                item.description ? item.description.substring(0, 24) : null
                                                :
                                                (item.name)
                                            }
                                        </Col>
                                        <Col sm={5}>
                                            {
                                                item.namet ? item.namet.substring(0, 24) : null
                                            }</Col>
                                        <Col sm={1}>
                                            <Button onClick={
                                                () => setEdit(item)
                                            }>{t("Edit")}</Button>
                                        </Col>
                                        <Col sm={1}>
                                            <Button onClick={
                                                () => setDelete(item)
                                            }>{t("Delete")}</Button>
                                        </Col>
                                    </Row>
                                ))
                            } </ul>
                        </ScrollShadow>
                    </Card>
                </Col>
            </Row>

        </div>
    );
}
export default EntityT;
