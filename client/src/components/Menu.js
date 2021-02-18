import React, { useState, useEffect, useContext } from "react";
// import Select from "react-select";
import axios from "axios";
import NavTab from "./NavTab";
import {
    // Form,
    // Input,
    // Row,
    Col,
    // Button,
    // FormGroup,
    Label,
    // Card
} from "reactstrap";
import { store } from "./Store";
import "../index.css";
import { storage } from "../firebase";
import { s3, doConfig } from "../digitalocean";
import access from "../util/access";
import { useTranslation } from "react-i18next"
import Editpan from "./Editpan";
import { Formik, Form, Field } from 'formik';
import {
    Button,
    LinearProgress,
    Grid,
    Box,
    Select,
} from '@material-ui/core';
import {
    TextField,
} from 'formik-material-ui';
import Input from '@material-ui/core/Input';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';


const config = require("../util/config.json");

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        padding: '0px 0px',
        margin: '0px 0px',
    },
    container: {
        maxHeight: 500,
        margin: '0px 0px',
        padding: '0px 0px'
    },
    content: {
        // backgroundColor: 'primary',
        // color: 'white',
        fontStyle: 'oblique',
        fontSize: "30px",
        fontWeight: 500,
        textAlign: "left",
        fontWeight: 'fontWeightBold',
    },
    mediaRoot: {
        width: '100%',
        padding: '0px 0px',
        margin: '0px 0px',
    },
    media: {
        // height: 140,
        width: 385,
        // maxWidth: 320,
        height: 280,
        // maxHeight: 240,
        marginLeft: 10,
        marginBottom: 0,
        paddingBottom: 0,
        align: "left",
    },
    description: {
        // height: 140,
        width: 385,
        // maxWidth: 320,
        height: 280,
        // maxHeight: 240,
        marginLeft: 10,
        marginBottom: 0,
        paddingBottom: 0,
        // align: "left",
    },
    button: {
        fontSize: '24px',
        color: theme.palette.neutral.white,
        backgroundColor: theme.palette.neutral.black,
        marginTop: theme.spacing(1),

    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },

}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, selectedTopping, theme) {
    return {
        fontWeight:
            selectedTopping && selectedTopping.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

function Menu(props) {
    // debugger;
    const { t } = useTranslation();
    const shareContext = useContext(store);
    const username = shareContext.state.username;
    const setMessage = props.setMessage;
    const theme = useTheme();

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
    const [discountMethod, setDiscountMethod] = useState([]);
    const [toppingSelected, setToppingSelected] = useState([])
    const [toppingMap, setToppingMap] = useState({});
    const [category, setCategory] = useState({});
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(8);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        // const restaurantId = 45000
        // console.log("in UseEffect");
        getMenuList();
        getCategoryList();
        getToppingList();
        arrangeDiscountMethod();
    }, [shareContext.state.locale]);

    const getImage = async (imageName) => {
        debugger;
        if (!imageName || imageName == "") return;
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
        // debugger;
        e.preventDefault();
        if (e.target.files.length == 0) return;
        var image = e.target.files[0];
        const formdata = new FormData();
        if (shareContext.state.username == 'demo' || shareContext.state.username == 'demo2') {
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
        let isMounted = true;
        const promise1 = access.fetchMenuByRestaurantId(
            restaurantId,
            shareContext.state.locale
        );
        Promise.resolve(promise1)
            .then((res) => {
                //    console.log(res)
                if (isMounted) {
                    const obj = res.data.map((elem) =>
                        elem.name_t != null ? { ...elem, name: elem.name_t } : elem
                    );
                    setMenuList(obj);
                }
            })
            .catch((err) => {
                setMessage({ status: 404, msg: err.message });
            }).finally(() => {
                isMounted = false;
            });
    };

    const getCategoryList = () => {
        let isMounted2 = true;
        const promise1 = access.fetchCategoryByRestaurantId(restaurantId, shareContext.state.locale);
        Promise.resolve(promise1)
            // axios
            //   .get("/api/category", { params: { restaurant_id: restaurantId } })
            .then((res) => {
                if (isMounted2) {
                    setCategoryList([]);
                    res.data.map((item) =>
                        setCategoryList((prevState) => [
                            ...prevState,
                            { id: item.id, label: item.namet == null ? item.category_name : item.namet },
                        ])
                    );
                }
            })
            .catch((err) => {
                setMessage({ status: 404, msg: err.message });
            }).finally(() => {
                isMounted2 = false;
            });
    }

    const getToppingList = () => {
        let isMounted3 = true;
        const promise1 = access.fetchToppingByRestaurantId(restaurantId, shareContext.state.locale);
        Promise.resolve(promise1)
            // axios
            //   .get("/api/category", { params: { restaurant_id: restaurantId } })
            .then((res) => {
                if (isMounted3) {
                    setToppingList([]);
                    arrangeToppingSelect(res.data);
                };
            })
            .catch((err) => {
                setMessage({ status: 404, msg: err.message });
            }).finally(() => {
                isMounted3 = false;
            });
    }

    const arrangeToppingSelect = oList => {
        let m = {};
        setToppingList([]);
        const options = oList.map((item) => {
            if (item.apply_item) {
                if (item.topping_group == 'G0' || item.apply_default) {
                    let label = item.namet == null ? item.name : item.namet;
                    if (item.topping_group != 'G0')
                        label = item.topping_group + ':' + label;
                    // setToppingList((prevState) => [
                    //     ...prevState,
                    //     { value: item.id, label: label },
                    // ])

                    m[item.id] = { label: label, group: item.topping_group };
                    return ({ value: item.id, label: label });
                }
            }
        });
        // debugger;
        var filtered = options.filter(function (elem) {
            return elem != undefined;
        });
        setToppingList(filtered);
        // setToppingList(prev => [...prev, filtered]);
        // setToppingList([{ value: 1, label: "One" }, { value: 2, label: "Two" }])
        setToppingMap(m);
    }

    const arrangeDiscountMethod = () => {
        setToppingList([]);
        setDiscountMethod([{ value: 1, label: 'Fixed Amount' }, { value: 2, label: 'Percent Discount' }])
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
            setMessage({ status: 404, msg: err.message });
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
                .catch((err) => {
                    setMessage({ status: 404, msg: err.message });
                });
        } catch (err) {
            setMessage({ status: 404, msg: err.message });
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

                        setMessage({ status: 404, msg: err.message });

                    },
                    () => {
                        // complete function ....
                        storage
                            .ref(`${dir}`)
                            .child(image.name)
                            .getDownloadURL()
                            .then((url) => {

                                setMessage({ status: 404, msg: err.message });

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
            (err) => {
                // error function ....

                setMessage({ status: 404, msg: err.message });

            },
            () => {
                // complete function ....
                storage
                    .ref(`${dir}`)
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {

                        setMessage({ status: 404, msg: "error occurs in firebaseUpload2" });

                        setMenu(prevMenu => ({ ...prevMenu, image_path: url }));
                    });
            }
        );
    };

    const handleCreateOrUpdateMenu = (obj) => {
        if (menu.id != "") {
            postUpdateMenu(obj);
        } else {
            postCreateMenu(obj);
        }

        initialMenu();
    };

    const postCreateMenu = (obj) => {
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
        const data = moveCorrespond(obj);
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

    const postUpdateMenu = (obj) => {
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
        const data = moveCorrespond(obj);
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

    const moveCorrespond = (obj) => {
        // let temp = '';
        let g0 = [];
        let g1 = [];
        toppingSelected.forEach(eId => {
            if (toppingMap && (toppingMap[eId]).group == 'G0')
                g0.push(eId);
            else
                g1.push(eId);
        })
        g1 = g1.concat(g0);
        debugger;
        // toppingSelected.map(elem => {
        //     temp == '' ? temp += elem.value : temp = temp + ',' + elem.value;
        // });
        let data = {
            id: menu.id,
            name: obj.name,
            note: obj.note,
            discount: obj.discount,
            discount_method: obj.discount_method,
            is_new: obj.is_new,
            locale: shareContext.state.locale,
            description: shareContext.state.menuDescription,
            entityId: access.Entity.menu,
            price_s: obj.price_s,
            price_m: obj.price_m,
            price_l: obj.price_l,
            price_x: obj.price_x,
            image_path: menu.image_path,
            restaurant_id: restaurantId,
            category_id: obj.category_id,
            available: obj.available,
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
            note: obj.note,
            discount: obj.discount,
            discount_method: obj.discount_method,
            is_new: obj.is_new,
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
        buildToppingSelected(obj.topping);
    };

    const buildToppingSelected = (selected) => {
        // debugger;
        if (selected) {
            // const arr = selected.split(',').map(str => parseInt(str));
            // const options = arr.map(v => ({
            //     value: v,
            //     label: t(`${toppingMap[v].label}`)
            // }));
            setToppingSelected(selected.split(',').map(e => parseInt(e)));
        } else
            setToppingSelected([]);
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
            .catch((err) => {
                let m = " menu => setDelete failed !!!" + err.error;
                setMessage({ status: 200, msg: m });
            });
    };

    const initialMenu = () => {
        setMenu(prev => ({
            ...prev,
            id: "",
            name: "",
            description: menu.description == "" ? " " : "",
            note: "",
            discount: 0,
            discount_method: 1,
            is_new: true,
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

    const handleChange = (event, values) => {
        // debugger;
        setToppingSelected(event.target.value);
        values.selectedTopping = event.target.value;
    };

    return (
        <div>
            <NavTab {...props} />
            <Formik
                enableReinitialize={true}
                initialValues={{
                    id: menu.id,
                    name: menu.name === null ||
                        menu.name === undefined
                        ? ""
                        : menu.name,
                    description: menu.description === null ||
                        menu.description === undefined
                        ? ""
                        : menu.description,
                    note: menu.note === null ||
                        menu.note === undefined
                        ? ""
                        : menu.note,
                    discount: menu.discount === null ||
                        menu.discount === undefined
                        ? 0
                        : menu.discount,
                    discount_method: menu.discount_method === null ||
                        menu.discount_method === undefined
                        ? 1
                        : menu.discount_method,
                    is_new: menu.is_new === null ||
                        menu.is_new === undefined
                        ? ""
                        : menu.is_new,
                    price_s: menu.price_s === null ||
                        menu.price_s === undefined
                        ? 0
                        : menu.price_s,
                    price_m: menu.price_m === null ||
                        menu.price_m === undefined
                        ? 0
                        : menu.price_m,
                    price_l: menu.price_l === null ||
                        menu.price_l === undefined
                        ? 0
                        : menu.price_l,
                    price_x: menu.price_x === null ||
                        menu.price_x === undefined
                        ? 0
                        : menu.price_x,
                    category_id: !menu || menu.category_id === null ||
                        menu.category_id === undefined
                        ? ''
                        : menu.category_id,
                    available: menu.available === null ||
                        menu.available === undefined
                        ? ""
                        : menu.available,
                    image_path: menu.image_path === null ||
                        menu.image_path === undefined
                        ? ""
                        : menu.image_path,
                    selectedTopping: menu.topping === null ||
                        menu.topping === undefined
                        ? []
                        : menu.topping.split(','),
                    restaurant_id: restaurantId,
                }}
                validate={values => {
                    const errors = {};
                    if (!values.name) {
                        errors.name = t("E010");
                    }
                    if (!values.category_id) {
                        errors.category_id = t("E010");
                    }
                    if (values.price_s == 0) {
                        errors.price_s = t("E010");
                    }
                    if (isNaN(values.price_s)) {
                        errors.price_s = t("E011");
                    }
                    if (isNaN(values.price_m)) {
                        errors.price_m = t("E011");
                    }
                    if (isNaN(values.price_l)) {
                        errors.price_l = t("E011");
                    }
                    if (isNaN(values.price_x)) {
                        errors.price_x = t("E011");
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setTimeout(() => {
                        setSubmitting(false);
                        handleCreateOrUpdateMenu(values);
                        resetForm({});
                    }, 500);
                }}
            >
                {({ submitForm, isSubmitting, values, setFieldValue }) => (
                    <Form>
                        <Grid container spacing={0} >
                            <Grid item xs={12} sm={4} margin={0} padding={0}>
                                <Box margin={0} padding={0}>
                                    <Field
                                        component={TextField}
                                        name={"name"}
                                        type="text"
                                        label={t("DishName")}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={2} margin={0} padding={0}>
                                <Box margin={1}>
                                    <FormControl>
                                        <InputLabel shrink={true} htmlFor="category">
                                            {t("Category")}
                                        </InputLabel>
                                        <Field
                                            component={TextField}
                                            type="text"
                                            name="category_id"
                                            select
                                            variant="standard"
                                            // helperText="Please select a category"
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: false,
                                            }}
                                            inputProps={{ name: 'category_id', id: 'category' }}
                                        >
                                            {categoryList.map(option => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Field>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} margin={0} padding={0}>
                                <Box margin={0} padding={0}>
                                    <Field
                                        component={TextField}
                                        name={"note"}
                                        type="text"
                                        label={t("Menu_Note")}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={2} margin={0} padding={0}>
                                <Box margin={0} padding={0}>
                                    <Field
                                        component={TextField}
                                        name={"price_s"}
                                        type="text"
                                        label={t("Regular")}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={2} margin={0} padding={0}>
                                <Box margin={0} padding={0}>
                                    <Field
                                        component={TextField}
                                        name={"price_m"}
                                        type="text"
                                        label={t("Medium")}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={2} margin={0} padding={0}>
                                <Box margin={0} padding={0}>
                                    <Field
                                        component={TextField}
                                        name={"price_l"}
                                        type="text"
                                        label={t("Large")}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={2} margin={0} padding={0}>
                                <Box margin={0} padding={0}>
                                    <Field
                                        component={TextField}
                                        name={"price_x"}
                                        type="text"
                                        label={t("Extra")}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={2} margin={0} padding={0}>
                                <Box margin={1}>
                                    <FormControl>
                                        <InputLabel shrink={true} htmlFor="category">
                                            {t("Discount_Method")}
                                        </InputLabel>
                                        <Field
                                            component={TextField}
                                            type="text"
                                            name="discount_method"
                                            select
                                            variant="standard"
                                            // helperText="Please select a category"
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: false,
                                            }}
                                            inputProps={{ name: 'discount_method', id: 'discount_method' }}
                                        >
                                            {discountMethod.map(option => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Field>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={2} margin={0} padding={0}>
                                <Box margin={0} padding={0}>
                                    <Field
                                        component={TextField}
                                        name={"discount"}
                                        type="text"
                                        label={t("Discount")}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={8} sm={3} margin={0} padding={0}>
                                <Card className={classes.mediaRoot}>
                                    {menu && (menu.image_path != '' || image2 != '') ?
                                        <CardMedia
                                            className={classes.media}
                                            component="img"
                                            image={shareContext.state.username == 'demo' || shareContext.state.username == 'demo2' ? menu.image_path : image2}
                                            title={menu.name} >
                                            {/* <img src={shareContext.state.username == 'demo' || shareContext.state.username == 'demo2' ? menu.image_path : image2} /> */}
                                        </CardMedia>
                                        :
                                        null}
                                </Card>
                            </Grid>

                            <Grid item xs={4} sm={3} margin={0} padding={0}>

                                <input
                                    accept="image/*"
                                    // style={{ display: 'none' }}
                                    id="icon-button-photo"
                                    onChange={handleSelector}
                                    type="file"
                                />
                            </Grid>
                            <Col xs={12} sm="6">
                                <Typography> Detail Description</Typography>
                                <Editpan setMenu={setMenu} menu={menu} />
                            </Col>

                            <Grid item xs={12} sm={6} >

                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-mutiple-name-label">{t("ToppingList")}</InputLabel>
                                    <Select
                                        labelId="demo-mutiple-name-label"
                                        id="demo-mutiple-name"
                                        multiple
                                        value={toppingSelected}
                                        onChange={e => handleChange(e, values)}
                                        input={<Input />}
                                        renderValue={
                                            toppingSelected.length > 0
                                                ? undefined
                                                : () => <em>Placeholder</em>
                                        }
                                        MenuProps={MenuProps}
                                    >
                                        {toppingList.map((name) => (
                                            <MenuItem key={name} value={name.value} style={getStyles(name.value, toppingSelected, theme)}>
                                                {name.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sm={2} margin={0} padding={0}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={values.available}
                                            onChange={() => setFieldValue("available", !values.available)}
                                            name="available"
                                            color="primary"
                                        />
                                    }
                                    label={t("Available")}
                                />
                            </Grid>
                            <Grid item xs={6} sm={2} margin={0} padding={0}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={values.is_new}
                                            onChange={() => setFieldValue("is_new", !values.is_new)}
                                            name="is_new"
                                            color="primary"
                                        />
                                    }
                                    label={t("is_new")}
                                />
                            </Grid>
                            {isSubmitting && <LinearProgress />}
                            <Grid item xs={6} sm={2} >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                    onClick={submitForm}
                                >
                                    {t("Submit")}
                                </Button>
                                &nbsp;
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                    onClick={initialMenu}
                                >
                                    {t("Cancel")}
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>

            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table" size="small" aria-label="a dense table" >
                        <TableBody>
                            {menuList && menuList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, rId) => {
                                return (
                                    <TableRow key={rId} style={{ padding: '0px', margin: '0px', backgroundColor: "#eaeaea", }} >
                                        <TableCell style={{ width: '30%' }} align="left">
                                            <Typography variant="body1">
                                                {item.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell style={{ width: '10%' }} align="left">
                                            <Typography variant="body1">
                                                {item.price_s}
                                            </Typography>
                                        </TableCell>
                                        <TableCell style={{ width: '10%' }} align="left">
                                            <Typography variant="body1">
                                                {item.price_m}
                                            </Typography>
                                        </TableCell>
                                        <TableCell style={{ width: '10%' }} align="left">
                                            <Typography variant="body1">
                                                {item.price_l}
                                            </Typography>
                                        </TableCell>
                                        <TableCell style={{ width: '10%' }} align="left">
                                            <Typography variant="body1">
                                                {item.price_x}
                                            </Typography>
                                        </TableCell>
                                        <TableCell style={{ width: '10%' }} align="left">
                                            {fetchCategoryName(item.category_id)}
                                        </TableCell>
                                        <TableCell style={{ width: '20%' }} align="left">
                                            <IconButton edge="end" size="small" aria-label="edit" onClick={() => setEdit(item)} >
                                                <Tooltip title={t("Edit")}>
                                                    <EditIcon />
                                                </Tooltip>
                                            </IconButton>
                                            <IconButton edge="end" size="small" aria-label="delete" onClick={() => setDelete(item)} >
                                                <Tooltip title={t("Delete")}>
                                                    <DeleteIcon />
                                                </Tooltip>
                                            </IconButton>

                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                {menuList && menuList.length > rowsPerPage ?
                    <TablePagination
                        rowsPerPageOptions={[8, 25, 100]}
                        component="div"
                        count={menuList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                    : null}
            </Paper>



            {/* <NavTab {...props} />
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
<Card>
<div className="imgblock">
                        <Label> Detail Description</Label>

                        <Editpan setMenu={setMenu} menu={menu} />
                        </div>
  </Card>
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
            </div> */}
        </div >
    );
}

export default Menu;