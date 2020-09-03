import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import axios from "axios";
import NavTab from "./NavTab";
import {
    Form,
    Input,
    Row,
    Col,
    Button,
    FormGroup,
    Label,
    Card
} from "reactstrap";
import { store } from "./Store";
import "../index.css";
import { storage } from "../firebase";
import { s3, doConfig } from "../digitalocean";
import access from "../util/access";
import { useTranslation } from "react-i18next"
import Editpan from "./Editpan";

function Menu(props) {
    // debugger;
    const { t } = useTranslation();
    const shareContext = useContext(store);
    const username = shareContext.state.username;
    const setMessage = props.setMessage;

    const restaurantId =
        shareContext.state.restaurant != null
            ? shareContext.state.restaurant.id
            : null;
    if (!restaurantId) {
        let m = t("LoginFirst");
        setMessage({ status: 400, msg: m });
        props.history.push("/Login");
    }
    const [menu, setMenu] = useState({
        id: "",
        name: "",
        description: "",
        locale: shareContext.state.restaurant ? shareContext.state.restaurant.locale : null,
        price_s: 0,
        price_m: 0,
        price_l: 0,
        price_x: 0,
        rest_id: 1000,
        category_id: "",
        available: true,
        // image_path: `${process.cwd()}/public/images/img1.jpg`
        image_path: "",
    });
    const [description, setDescription] = useState('');
    const [menuList, setMenuList] = useState([]);
    const [image, setImage] = useState("");
    const [image2, setImage2] = useState("");
    const [imageName, setImageName] = useState("Choose Image");
    const [categoryList, setCategoryList] = useState([]);
    const [toppingList, setToppingList] = useState([]);
    const [toppingSelected, setToppingSelected] = useState([])
    const [toppingMap, setToppingMap] = useState({});
    const [category, setCategory] = useState({});

    useEffect(() => {
        // const restaurantId = 45000
        // console.log("in UseEffect");
        getMenuList();
        getCategoryList();
        getToppingList();
    }, [shareContext.state.locale]);

    const getImage = async (imageName) => {
        access.doDownload(restaurantId, imageName, shareContext, setImage2, setMessage);
        return;
        // try {
        //     if (!imageName)
        //         return false;
        //     let imageMap = shareContext.state.imageMap;
        //     if (imageMap && imageMap.has(imageName)) {
        //         setImage2(imageMap.get(imageName))
        //         return true;
        //     }
        //     const promise1 = access.doDownload(restaurantId, imageName)
        //     Promise.resolve(promise1)
        //         .then((res) => {
        //             if (!imageMap)
        //                 imageMap = new Map();
        //             imageMap.set(imageName, res.data);
        //             shareContext.dispatch({
        //                 type: "setImageMap",
        //                 value: imageMap
        //             });
        //             setImage2(res.data)
        //             return true;
        //         })
        //         .catch((error) => console.log("Error"));
        // } catch (err) {
        //     console.log("error:" + err.error);
        // }
    };

    const handleSelector = (e) => {
        e.preventDefault();
        if (e.target.files.length == 0) return;
        var image = e.target.files[0];
        const formdata = new FormData();
        if (shareContext.state.userMode === 2) {
            formdata.append("file", image);
            formdata.append("pathId", restaurantId);
            fileUpload(formdata);
        } else {
            formdata.append("file", image);
            formdata.append("pathId", restaurantId);
            DOUpload(formdata);
            // setImage(image);
            // setImageName(image.name);
            // firebaseUpload(image);
        }
    };

    const getMenuList = () => {
        const promise1 = access.fetchMenuByRestaurantId(
            restaurantId,
            shareContext.state.locale
        );
        Promise.resolve(promise1)
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

    const getToppingList = () => {
        const promise1 = access.fetchToppingByRestaurantId(restaurantId, shareContext.state.locale);
        Promise.resolve(promise1)
            // axios
            //   .get("/api/category", { params: { restaurant_id: restaurantId } })
            .then((res) => {
                setToppingList([]);
                arrangeToppingSelect(res.data);

            })
            .catch((error) => console.log(error));
    }

    const arrangeToppingSelect = oList => {
        let m = {};
        oList.map((item) => {
            if (item.apply_item) {
                if (item.topping_group == 'G0' || item.apply_default) {
                    let label = item.namet == null ? item.name : item.namet;
                    if (item.topping_group != 'G0')
                        label = item.topping_group + ':' + label;
                    setToppingList((prevState) => [
                        ...prevState,
                        { value: item.id, label: label },
                    ])

                    m[item.id] = { label: label, group: item.topping_group };

                }
            }

        });
        setToppingMap(m);
    }

    // upload to client/public folder, not used now, using firebase instead
    const fileUpload = async (formdata) => {
        try {
            let apiUrl = ``;
            if (!process.env.REACT_APP_DB_HOST) {
                apiUrl = `http://localhost:8080`;
            }
            const res = await axios.post(apiUrl + "/api/fileupload", formdata, {
                // const res = await axios.post("/imageupload", formdata, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const { filename, filepath } = res.data;
            setMenu({ ...menu, image_path: filepath });
        } catch (err) {
            console.log("error:" + err.error);
        }
    };

    // digital ocean image upload
    // digitaloceanUpload = (image) => {

    //     const params = {
    //         Body: image,
    //         Bucket: `${Config.bucketName}`,
    //         Key: image.name
    //     };
    //     // Sending the file to the Spaces
    //     s3.putObject(params)
    //         .on('build', request => {
    //             request.httpRequest.headers.Host = `${doConfig.digitalOceanSpaces}`;
    //             request.httpRequest.headers['Content-Length'] = image.size;
    //             request.httpRequest.headers['Content-Type'] = image.type;
    //             request.httpRequest.headers['x-amz-acl'] = 'public-read';
    //         })
    //         .send((err) => {
    //             if (err) errorCallback();
    //             else {
    //                 // If there is no error updating the editor with the imageUrl
    //                 const imageUrl = `${doConfig.digitalOceanSpaces}` + image.name
    //                 callback(imageUrl, image.name)
    //             }
    //         }
    //   };
    // only upload when the image not upload before
    const DOUpload = async (formdata) => {
        try {
            const promise1 = access.doUpload(formdata)
            Promise.resolve(promise1)
                .then((res) => {
                    setMenu({ ...menu, image_path: res.data });
                    getImage(res.data);
                })
                .catch((error) => console.log("Error"));
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
                                setMenu(prevMenu => ({ ...menu, image_path: url }));
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
                        setMenu(prevMenu => ({ ...prevMenu, image_path: url }));
                    });
            }
        );
    };

    const handleCreateOrUpdateMenu = () => {
        if (menu.id != "") {
            postUpdateMenu();
        } else {
            postCreateMenu();
        }

        initialMenu();
    };

    const postCreateMenu = () => {
        // debugger;
        // let data = {
        //     name: menu.name,
        //     description: menu.description,
        //     // intend to do so, only allow default language to update the name, use translation tool for other locale input
        //     locale: shareContext.state.locale,
        //     entityId: access.Entity.menu,
        //     price_s: menu.price_s,
        //     price_m: menu.price_m,
        //     price_l: menu.price_l,
        //     price_x: menu.price_x,
        //     image_path: menu.image_path,
        //     restaurant_id: restaurantId,
        //     category_id: category.id,
        // };
        const data = moveCorrespond();
        const promise1 = access.addMenu(data);
        Promise.resolve(promise1)
            .then((res) => {
                let m = menu.name + " is created Successfully !!!";
                setMessage({ status: 200, msg: m });
                getMenuList();
            }).catch((err) => {
                // let errorObject = JSON.parse(JSON.stringify(err));
                setMessage({ status: 404, msg: err.message });
            });
    };

    const postUpdateMenu = () => {
        // debugger;
        // let data = {
        //     id: menu.id,
        //     name: menu.name,
        //     locale: shareContext.state.locale,
        //     description: menu.description,
        //     entityId: access.Entity.menu,
        //     price_s: menu.price_s,
        //     price_m: menu.price_m,
        //     price_l: menu.price_l,
        //     price_x: menu.price_x,
        //     image_path: menu.image_path,
        //     restaurant_id: restaurantId,
        //     category_id: category.id,
        // };
        const data = moveCorrespond();
        const promise1 = access.updateMenu(data);
        Promise.resolve(promise1)
            .then((res) => {
                let m = menu.name + " is updated Successfully !!!";
                setMessage({ status: 200, msg: m });
                getMenuList();
            }).catch((err) => {
                // let errorObject = JSON.parse(JSON.stringify(err));
                setMessage({ status: 404, msg: err.message });
            });
    };

    const moveCorrespond = () => {
        // let temp = '';
        let g0 = [];
        let g1 = [];
        toppingSelected.forEach(elem => {
            if ((toppingMap[elem.value]).group == 'G0')
                g0.push(elem.value);
            else
                g1.push(elem.value);
        })
        g1 = g1.concat(g0);
        // debugger;
        // toppingSelected.map(elem => {
        //     temp == '' ? temp += elem.value : temp = temp + ',' + elem.value;
        // });
        let data = {
            id: menu.id,
            name: menu.name,
            locale: shareContext.state.locale,
            description: shareContext.state.menuDescription,
            entityId: access.Entity.menu,
            price_s: menu.price_s,
            price_m: menu.price_m,
            price_l: menu.price_l,
            price_x: menu.price_x,
            image_path: menu.image_path,
            restaurant_id: restaurantId,
            category_id: category.id,
            available: menu.available,
            topping: g1.toString()
        };
        return data;
    }

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
            available: obj.available,
            image_path: obj.image_path,
        });
        if (shareContext.state.userMode !== 2)
            getImage(obj.image_path);
        shareContext.dispatch({
            type: "setMenuDescription",
            value: obj.description
        });
        buildToppingSelectedd(obj.topping);
    };

    const buildToppingSelectedd = (selected) => {
        debugger;
        if (selected) {
            const arr = selected.split(',').map(str => parseInt(str));
            const options = arr.map(v => ({
                value: v,
                label: t(`${toppingMap[v].label}`)
            }));
            setToppingSelected(options)
        }
    }

    const setDelete = (obj) => {
        const promise1 = access.deleteMenuById(obj.id);
        Promise.resolve(promise1)
            .then((res) => {
                // console.log(res.data.json());
                let m = obj.name + " is deleted Successfully !!!";
                setMessage({ status: 200, msg: m });
                getMenuList();
                initialMenu();
            })

            .catch((err) => console.log(err.error));
    };

    const initialMenu = () => {
        setMenu(prev => ({
            ...prev,
            id: "",
            name: "",
            description: menu.description == "" ? " " : "",
            locale: shareContext.state.locale,
            price_s: 0,
            price_m: 0,
            price_l: 0,
            price_x: 0,
            category_id: "",
            available: true,
            image_path: "",
            topping: ""
        }));
        shareContext.dispatch({
            type: "setMenuDescription",
            value: ''
        });
        setCategory({
            id: "",
            label: "",
        });
        setToppingSelected([]);
        setImage2('');
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
                        <FormGroup className="float-left" style={{ width: "275px" }}>
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
                        <FormGroup className="float-left">
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
                        <FormGroup className="float-left">
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
                        <FormGroup className="float-left">
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
                        <FormGroup className="float-left">
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

                            <input type="file" name="myImage" id="pathId" onChange={handleSelector} />
                        </FormGroup>
                    </Col>
                    <Col xs="4" sm="4">
                        <Card>
                            <div className="imgblock">
                                <img
                                    className="imgbox"
                                    alt={menu.image_path}
                                    // src={menu.image_path}
                                    // src='https://takeorder.sfo2.digitaloceanspaces.com/Chinese-Pork-Belly.jpg'
                                    // src={getImage(menu.image_path) ? image2 : null}
                                    src={shareContext.state.userMode === 2 ? menu.image_path : image2}

                                />
                            </div>
                        </Card>
                    </Col>
                    <Col sm="6">


                        <Label> Detail Description</Label>

                        <Editpan setMenu={setMenu} menu={menu} />

                    </Col>
                    <Col xs="6" sm="6">
                        <FormGroup className="float-left" style={{ width: "275px" }}>
                            <Label for="toppingSelect">
                                {
                                    t("ToppingList")
                                }</Label>
                            <Select id="toppingSelect"
                                isMulti
                                options={toppingList}
                                onChange={setToppingSelected}
                                className="mb-3"
                                placeholder={t("SelectToppingGroup")}
                                value={toppingSelected} />
                        </FormGroup>
                    </Col>
                    <Col xs="3" sm="3">


                        <FormGroup className="float-left" key={1}>

                            <Label for="isAvailable">
                                {t("Available")}
                            </Label>
                            <Input className="form-control margin-left" type="checkbox" id="isAvailable"
                                checked={menu.available}
                                onChange={e => setMenu({ ...menu, available: e.target.checked })}
                            />

                        </FormGroup>

                    </Col>
                    <Col xs="3" sm="3">
                        <Button onClick={handleCreateOrUpdateMenu}>{t("Save")} </Button>
                        &nbsp;
                        <Button onClick={initialMenu}>{t("Cancel")} </Button>
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
        </div >
    );
}

export default Menu;