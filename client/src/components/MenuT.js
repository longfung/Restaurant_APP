import React, {useState, useEffect, useContext} from "react";
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
    Label,
    Card,
    CardImg
} from "reactstrap";
import {store} from "./Store";
import "../index.css";
import {storage} from "../firebase";
import access from "../util/access";

function MenuT(props) {
    debugger;
    const shareContext = useContext(store);

    const restaurantId = shareContext.state.restaurant != null ? shareContext.state.restaurant.id : null;
    if (! restaurantId) {
        props.history.push("/Login");
    }
    const setMessage = props.setMessage;
    // const restaurantId = props.restaurant_id;

    const [menuT, setMenuT] = useState({});
    const [menuTList, setMenuTList] = useState([]);
    const [lang, setLang] = useState("");

    useEffect(() => {
        getMenuTList('tw');
    }, []);

    const getMenuTList = (locale) => {
        const promise1 = access.fetchMenuTByRestaurantId(restaurantId,
        // shareContext.state.locale
            locale);
        Promise.resolve(promise1).then((res) => {
            // axios
            // .get("/api/Menu", { params: { restaurant_id: restaurantId } }).then((res) => {
            //    console.log(res)
            // const obj = res.data.map((elem) =>
            // elem.name_t != null ? { ...elem, name: elem.name_t } : elem
            // );
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
            nameT: menuT.nameT,
            locale: "tw",
            restaurantId: restaurantId
        };
        const promise1 = access.updateMenuT(data);
        Promise.resolve(promise1).then((res) => {
            // axios
            // .put("/api/menu", data, {
            //     headers: { "Content-Type": "application/json" }
            // }).then((res) => {
            // console.log(res.data.json());
            // getMenuList();
            // setNode({ ...node, id: '', category_name: '', category_description: '', restaurant_id: restaurantId });
            // initialMenu();
            let m = menuT.name + " is updated Successfully !!!";
            setMessage({status: 200, msg: m});
            getMenuTList();
        });
    };

    const setEdit = (obj) => {
        setMenuT({
            id: obj.id,
            name: obj.name,
            nameT: obj.menuT,
            locale: obj.locale,
            RrstaurantId: obj.restaurantId
        });
    };

    const setDelete = (obj) => {
        const promise1 = access.deleteMenuById(obj.id);
        Promise.resolve(promise1).then((res) => {
            // axios
            // .delete("/api/menu", { params: { id: obj.id } }).then((res) => { // console.log(res.data.json());
            let m = obj.name + " is deleted Successfully !!!";
            setMessage({status: 200, msg: m});
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
            nameT: "",
            locale: "",
            restaurantId: ""
        });
    };

    const switchLanguage = (elem) => {
        getMenuTList(elem);
    }

    return (
        <div>
            <NavTab {...props}/>
            <Form>
                <Row form>
                    <Col xs="6" sm="6">
                        <FormGroup>
                            <Label for="name">Dish Name</Label>
                            <Input type="text"
                                value={
                                    menuT.name
                                }
                                id="name"/>{" "} </FormGroup>
                    </Col>
                    <Col xs="6" sm="6">
                        <FormGroup>
                            <Label for="menuT">Locale Name</Label>
                            <Input type="text" id="price"
                                value={
                                    menuT.nameT
                                }
                                onChange={
                                    (e) => setMenuT({
                                        ...menuT,
                                        nameT: e.target.value
                                    })
                                }/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs="6" sm="6">
                        <Button onClick={handleUpdateMenu}>
                            Save
                        </Button>
                    </Col>
                </Row>
            </Form>
            <hr></hr>
            <div>
                <Row>
                    <Col sm="5">
                        <h2>Menu List for translation</h2>
                    </Col>
                    <Col sm="7">
                        <Button onClick={
                            () => switchLanguage('tw')
                        }>
                            繁體</Button>
                        <Button onClick={
                            () => switchLanguage('zh')
                        }>
                            简体</Button>
                    </Col>
                </Row>
                <ul> {
                    menuTList.map((item, idx) => (
                        <Row key={idx}>
                            <Col sm={5}>
                                {
                                item.name
                            }</Col>
                            <Col sm={5}>
                                {
                                item.namet
                            }</Col>
                            <Col sm={1}>
                                <Button onClick={
                                    () => setEdit(item)
                                }>Edit</Button>
                            </Col>
                            <Col sm={1}>
                                <Button onClick={
                                    () => setDelete(item)
                                }>Delete</Button>
                            </Col>
                        </Row>
                    ))
                } </ul>
            </div>
        </div>
    );
}
export default MenuT;
