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
    Label,
    Card,
    CardImg,
} from "reactstrap";
import { store } from "./Store";
import "../index.css";
import { storage } from "../firebase";
import access from "../util/access";
import { useTranslation } from "react-i18next"
import Editpan from "./Editpan";

function Menu(props) {
    debugger;
    const { t } = useTranslation();
    const shareContext = useContext(store);

    const restaurantId =
        shareContext.state.restaurant != null
            ? shareContext.state.restaurant.id
            : null;
    debugger;
    if (!restaurantId) {
        props.history.push("/Login");
    }
    const username = shareContext.state.username;
    const setMessage = props.setMessage;
    // const restaurantId = props.restaurant_id;

    const [menu, setMenu] = useState({
        id: "",
        name: "",
        description: "",
        locale: shareContext.state.restaurant.locale,
        price_s: 0,
        price_m: 0,
        price_l: 0,
        price_x: 0,
        rest_id: 1000,
        category_id: "",
        // image_path: `${process.cwd()}/public/images/img1.jpg`
        image_path: "",
    });
    const [menuList, setMenuList] = useState([]);
    const [image, setImage] = useState("");
    const [imageName, setImageName] = useState("Choose Image");
    const [categoryList, setCategoryList] = useState([
        // id: '',
        // label: ''
    ]);

    const [category, setCategory] = useState({});
    // const [desc, setDesc] = useState('');

    useEffect(() => {
        // const restaurantId = 45000
        console.log("in UseEffect");
        getMenuList();
        getCategoryList();
    }, [shareContext.state.locale]);

    const handleSelector = (e) => {
        e.preventDefault();
        if (e.target.files.length == 0) return;
        var image = e.target.files[0];
        if (username == "demo") {
            const formdata = new FormData();
            formdata.append("file", image);
            formdata.append("pathId", restaurantId);
            fileUpload(formdata);
        } else {
            setImage(image);
            setImageName(image.name);
            firebaseUpload(image);
        }

        // axios.post('/fileupload', formdata, {
        //     // headers: {'Content-Type': 'multipart/form-data' }
        //     headers: { 'Content-Type': 'multipart/form-data' }
        // } )
        //        .then(res => {

        // axios
        //   .post("/fileupload", formdata, {
        //     headers: { "Content-Type": "multipart/form-data" }
        //   })
        //   .then(res => {
        //     // menu.image_path = res.data.filename; })
        //     setMenu(...menu, { image_path: res.data.filepath });
        //   })
        //   .catch(err => {
        //     console.log("Error in file upload");
        //   });

        // use Festch
        // fetch('/fileupload', {
        //     method: 'post',
        //     // headers: { 'Content-Type': 'multipart/form-data' },
        //     body: formdata,
        //   })
        //   .then(res => {
        //         // menu.image_path = res.data.filename;
        //         menu.image_path = process.cwd() + 'server/images/img4.jpg';
        //     // setMenu({...menu, image_path: res.data.filepath})
        //         // handleCreateOrUpdateMenu()
        //     })
        //  .catch( error => {
        //      console.log(error)})
    };

    const getMenuList = () => {
        const promise1 = access.fetchMenuByRestaurantId(
            restaurantId,
            shareContext.state.locale
        );
        Promise.resolve(promise1)
            // axios
            //   .get("/api/Menu", { params: { restaurant_id: restaurantId } })
            .then((res) => {
                //    console.log(res)
                const obj = res.data.map((elem) =>
                    elem.name_t != null ? { ...elem, name: elem.name_t } : elem
                );
                setMenuList(obj);
            })
            .catch((error) => console.log("Error"));
    };

    const getCategoryList = () => {
        const promise1 = access.fetchCategoryByRestaurantId(restaurantId, shareContext.state.locale);
        Promise.resolve(promise1)
            // axios
            //   .get("/api/category", { params: { restaurant_id: restaurantId } })
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
    }
    // upload to client/public folder, not used now, using firebase instead
    const fileUpload = async (formdata) => {
        // e.preventDefault();
        // const formdata = new FormData();
        // formdata.append('file', image);
        try {
            const res = await axios.post("/fileupload", formdata, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const { filename, filepath } = res.data;
            setMenu({ ...menu, image_path: filepath });
        } catch (err) {
            console.log("error:" + err.error);
        }
    };

    // only upload when the image not upload before
    const firebaseUpload = (image) => {
        const dir = "D_" + restaurantId;
        storage
            .ref(`${dir}`)
            .child(image.name)
            .getDownloadURL()
            // exist, just get url for display
            .then((url) => setMenu({ ...menu, image_path: url }))
            .catch((err) => {
                // not exist, then upload image
                const uploadTask = storage.ref(`${dir}/${image.name}`).put(image);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        // progrss function ....
                    },
                    (error) => {
                        // error function ....
                        console.log(error);
                    },
                    () => {
                        // complete function ....
                        storage
                            .ref(`${dir}`)
                            .child(image.name)
                            .getDownloadURL()
                            .then((url) => {
                                console.log(url);
                                setMenu({ ...menu, image_path: url });
                            });
                    }
                );
            });
    };

    const firebaseUpload2 = (image) => {
        const dir = "D_" + restaurantId;
        const uploadTask = storage.ref(`${dir}/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // progrss function ....
            },
            (error) => {
                // error function ....
                console.log(error);
            },
            () => {
                // complete function ....
                storage
                    .ref(`${dir}`)
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {
                        console.log(url);
                        setMenu({ ...menu, image_path: url });
                    });
            }
        );
    };

    // const handlePostMenu = () => {
    //   if (image) {
    //     var formdata = new FormData();
    //     formdata.append("file", image);
    //     axios
    //       .post("/fileupload", formdata, {
    //         headers: { "Content-Type": "multipart/form-data" }
    //       })
    //       .then(res => {
    //         // debugger;
    //         menu.image_path = res.data.filename;
    //         // setMenu({...menu, image_path: res.data.filepath})
    //         handleCreateOrUpdateMenu();
    //       })
    //       // console.log(res);})
    //       .catch(err => {
    //         debugger;
    //         console.log("Error in file upload");
    //       });
    //   } else {
    //     // debugger;
    //     handleCreateOrUpdateMenu();
    //   }
    // };

    const handleCreateOrUpdateMenu = () => {
        if (menu.id != "") {
            postUpdateMenu();
        } else {
            postCreateMenu();
        }

        initialMenu();
    };

    const postCreateMenu = () => {
        debugger;
        let data = {
            name: menu.name,
            description: menu.description,
            // intend to do so, only allow default language to update the name, use translation tool for other locale input
            locale: shareContext.state.locale,
            entityId: access.Entity.menu,
            price_s: menu.price_s,
            price_m: menu.price_m,
            price_l: menu.price_l,
            price_x: menu.price_x,
            image_path: menu.image_path,
            restaurant_id: restaurantId,
            category_id: category.id,
        };
        const promise1 = access.addMenu(data);
        Promise.resolve(promise1)
            // axios
            //   .post("/api/menu", data, {
            //     // headers: {'Content-Type': 'multipart/form-data' }
            //     headers: { "Content-Type": "application/json" }
            //   })
            .then((res) => {
                // debugger;
                // console.log(res.data);
                // invokeFetch();
                // setMenu({ ...menu, name: '', price: 0, path: '' });
                let m = menu.name + " is created Successfully !!!";
                setMessage({ status: 200, msg: m });
                getMenuList();
            });
    };

    const postUpdateMenu = () => {
        debugger;
        const dd = access.Entity;
        let data = {
            id: menu.id,
            name: menu.name,
            locale: shareContext.state.locale,
            description: menu.description,
            entityId: access.Entity.menu,
            price_s: menu.price_s,
            price_m: menu.price_m,
            price_l: menu.price_l,
            price_x: menu.price_x,
            image_path: menu.image_path,
            restaurant_id: restaurantId,
            category_id: category.id,
        };
        const promise1 = access.updateMenu(data);
        Promise.resolve(promise1)
            // axios
            //   .put("/api/menu", data, {
            //     headers: { "Content-Type": "application/json" }
            //   })
            .then((res) => {
                // console.log(res.data.json());
                // getMenuList();
                //   setNode({ ...node, id: '', category_name: '', category_description: '', restaurant_id: restaurantId });
                // initialMenu();
                let m = menu.name + " is updated Successfully !!!";
                setMessage({ status: 200, msg: m });
                getMenuList();
            });
    };

    const setEdit = (obj) => {
        for (var i = 0; i < categoryList.length; i++) {
            if (obj.category_id == categoryList[i].id) {
                setCategory({
                    id: categoryList[i].id,
                    label: categoryList[i].label,
                });
                break;
            }
        }
        setMenu({
            id: obj.id,
            name: obj.name_t == null ? obj.name : obj.name_t,
            description: obj.description,
            locale: shareContext.state.restaurant.locale,
            price_s: obj.price_s == null ? 0 : obj.price_s,
            price_m: obj.price_m == null ? 0 : obj.price_m,
            price_l: obj.price_l == null ? 0 : obj.price_l,
            price_x: obj.price_x == null ? 0 : obj.price_x,
            rest_id: obj.restaurant_id,
            category_id: obj.category_id,
            image_path: obj.image_path,
        });
    };

    const setDelete = (obj) => {
        const promise1 = access.deleteMenuById(obj.id);
        Promise.resolve(promise1)
            // axios
            //   .delete("/api/menu", { params: { id: obj.id } })
            .then((res) => {
                // console.log(res.data.json());
                let m = obj.name + " is deleted Successfully !!!";
                setMessage({ status: 200, msg: m });
                getMenuList();
                //   setMenu({ ...menu, name: '', price: 0, category_id: '', path: res.data.filepath });
                initialMenu();
            })

            .catch((err) => console.log(err.error));
    };

    const handleSelect = (e) => {
        debugger;
        console.log(e.target.value);
        console.log(menu.category_id);
    };

    const initialMenu = () => {
        setMenu({
            ...menu,
            id: "",
            name: "",
            description: "",
            locale: shareContext.state.locale,
            price_s: 0,
            price_m: 0,
            price_l: 0,
            price_x: 0,
            category_id: "",
            image_path: "",
        });
        setCategory({
            id: "",
            label: "",
        });
    };

    const fetchCategoryName = cid => {
        let res = '';
        categoryList.some(elem => {
            if (elem.id === cid) {
                res = elem.label;
                return true;
            }
        })
        return res;
    }

    return (
        <div>
            <NavTab {...props} />
            <Form>
                <Row>
                    <Col xs="6" sm="6">
                        <FormGroup className="float-left">
                            <Label for="name">{t("DishName")}</Label>
                            <Input
                                type="text"
                                value={menu.name}
                                id="name"
                                onChange={(e) => setMenu({ ...menu, name: e.target.value })}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs="6" sm="6">
                        <FormGroup className="float-left">
                            <Label for="categoryid">{t("Category")}</Label>
                            <Select
                                id="categoryid"
                                options={categoryList}
                                onChange={setCategory}
                                className="mb-3"
                                placeholder="Select a category"
                                value={category}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs="3" sm="3">
                        <FormGroup>
                            <Label for="price_s">{t("Price")}({t("Regular")})</Label>
                            <Input
                                type="text"
                                id="price_s"
                                value={menu.price_s}
                                onChange={(e) => setMenu({ ...menu, price_s: e.target.value })}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs="3" sm="3">
                        <FormGroup>
                            <Label for="price_m">{t("Price")}({t("Medium")})</Label>
                            <Input
                                type="text"
                                id="price_m"
                                value={menu.price_m}
                                onChange={(e) => setMenu({ ...menu, price_m: e.target.value })}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs="3" sm="3">
                        <FormGroup>
                            <Label for="price_l">{t("Price")}({t("Large")})</Label>
                            <Input
                                type="text"
                                id="price_l"
                                value={menu.price_l}
                                onChange={(e) => setMenu({ ...menu, price_l: e.target.value })}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs="3" sm="3">
                        <FormGroup>
                            <Label for="price_x">{t("Price")}({t("Extra")})</Label>
                            <Input
                                type="text"
                                id="price_x"
                                value={menu.price_x}
                                onChange={(e) => setMenu({ ...menu, price_x: e.target.value })}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>

                    <Col xs="2" sm="2">
                        <FormGroup>
                            <Label for="pathId">{t("UploadPicture")}</Label>

                            <Input type="file" id="pathId" onChange={handleSelector} />
                        </FormGroup>
                    </Col>
                    <Col xs="4" sm="4">
                        <Card className="width: 6rem">
                            <div className="imgblock">
                                <img
                                    className="imgbox"
                                    alt={menu.image_path}
                                    src={menu.image_path}
                                />
                            </div>
                        </Card>
                    </Col>
                    <Col sm="6">


                        <Label> Detail Description</Label>

                        <Editpan setMenu={setMenu} menu={menu} />

                    </Col>
                </Row>
                <Row>
                    <Col xs="6" sm="6">
                        <Button onClick={handleCreateOrUpdateMenu}>{t("Save")} </Button>
                    </Col>
                </Row>
            </Form>

            <div>
                <h3>{t("MenuList")}</h3>
                <ul>
                    <Row className="flow-center">
                        <Col sm={3}>{t("Name")}</Col>
                        <Col sm={1}>{t("S")}</Col>
                        <Col sm={1}>{t("M")}</Col>
                        <Col sm={1}>{t("L")}</Col>
                        <Col sm={1}>{t("X")}</Col>
                        <Col sm={2}>{t("Category")}</Col>
                        <Col sm={3}>{t("Action")}</Col>


                    </Row>
                    <hr></hr>
                    {menuList.map((item, idx) => (
                        <Row key={idx}>
                            <Col sm={3}>{item.name}</Col>
                            <Col sm={1}>{item.price_s}</Col>
                            <Col sm={1}>{item.price_m}</Col>
                            <Col sm={1}>{item.price_l}</Col>
                            <Col sm={1}>{item.price_x}</Col>
                            <Col sm={2}>{fetchCategoryName(item.category_id)}</Col>
                            <Col sm={2} className="ml-1" >
                                <Button onClick={() => setEdit(item)}>{t("Edit")}</Button>
                                &nbsp;
                                <Button onClick={() => setDelete(item)}>{t("Delete")}</Button>
                            </Col>
                            <Col sm={1}></Col>
                        </Row>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Menu;