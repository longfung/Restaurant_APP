import React, { useState, useRef, useContext, useEffect } from 'react';
// import { Editor, EditorState } from 'draft-js';
import Draft from 'draft-js';
import CartHeader from './CartHeader';
import '../index.css';
import {
    Row,
    Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import { MdArrowBack } from 'react-icons/md';
import { convertToHTML } from 'draft-convert'
import { store } from "./Store";
import "../index.css";
import { useTranslation } from 'react-i18next';
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
import {

    LinearProgress,
    Grid,
    Box,
} from '@material-ui/core';
const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
    },
    Card: {
        width: 300,
        height: 240,
        margin: 'auto'
    },
    media: {
        // height: 140,
        width: 320,
        // maxWidth: 320,
        height: 240,
        // maxHeight: 240,
        marginLeft: 10,
        marginBottom: 0,
        paddingBottom: 0,
        align: "left",
    },
    content: {
        textAlign: 'left',
        marginLeft: 0,
        paddingLeft: 0,
        paddingTop: 2,
        paddingBottom: 2,
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
    }
}));


const { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, ContentState, convertFromHTML } = Draft;

const Immutable = require('immutable');

// class Editpan extends React.Component {

function Detail(props) {
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
    if (!shareContext.state.customer) {
        props.history.push("/Customer");
    }
    debugger;
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const menu = props.menu;
    const getImage = props.getImage;
    const dishPrice = props.dishPrice;
    const setMenuToppingBox = props.setMenuToppingBox;
    const setMenuToppingRadio = props.setMenuToppingRadio;
    const Toppingmenuline = props.Toppingmenuline;
    const toppingGroupMap = props.toppingGroupMap;
    const toppingMap = props.toppingMap;
    const setDetail = props.setDetail;
    const setIsOrder = props.setIsOrder;
    const taxRate = props.taxRate;
    const cartTotal = props.cartTotal;
    // useEffect(() => {
    //     // debugger;
    //     // const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
    //     // const val = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
    //     // if (val != undefined && val != null && val != "\n") {
    //     //     const val = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    //     //     setMenu({ ...menu, description: val });
    //     // }
    // }, [editorState])
    const classes = useStyles();
    useEffect(() => {
        // const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
        // const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
        // debugger;

        if (menu.description == null || menu.description.length < 1) {

            // const newState = convertFromRaw(JSON.parse(menu.description));
            setEditorState(EditorState.createEmpty());
        }

        else {
            // const blocksFromHTML = convertFromHTML(menu.description);
            // const newState = ContentState.createFromBlockArray(
            //     blocksFromHTML.contentBlocks,
            //     blocksFromHTML.entityMap,
            // );
            const newState = convertFromRaw(JSON.parse(menu.description));
            // const state = ContentState.createFromBlockArray(blocksFromHTML);
            setEditorState(EditorState.createWithContent(newState));
        }

        // setEditorState(newState);
    }, [menu.description])

    const goBack = () => {

    }

    // const refEditor = useRef()
    // const focusEditorInput = () => refEditor.current.focus();
    const onChange = (newEditorState) => {
        console.log('kik', editorState.getCurrentInlineStyle())
        setEditorState(newEditorState)
    };
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
            className += ' RichEditor-hidePlaceholder';
        }
    }

    return (
        <Grid container>
            <CartHeader setDetail={setDetail}
                taxRate={taxRate}
                cartTotal={cartTotal} />
            <Grid container spacing={1}>
                <Grid item xs={12} sm={4} className={classes.content}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={shareContext.state.userMode === 2 ? menu.image_path : getImage(menu.image_path)}
                            title={menu.name}
                        />
                    </CardActionArea>
                </Grid>
                <Grid item xs={12} sm={4} className={classes.content}>
                    <CardContent>
                        <Typography variant="h5" component="h2" className={classes.content} noWrap>
                            {menu.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {menu.price_s > 0 ? dishPrice(menu, menu.price_s, 1, 'S') : null}
                            {menu.price_m > 0 ? dishPrice(menu, menu.price_m, 2, 'M') : null}
                            {menu.price_l > 0 ? dishPrice(menu, menu.price_l, 3, 'L') : null}
                            {menu.price_x > 0 ? dishPrice(menu, menu.price_x, 4, 'X') : null}
                        </Typography>
                        <Typography variant="body2" className={classes.content}>
                            {menu.toppingResult && menu.toppingResult.length > 0 ?
                                <Toppingmenuline
                                    item={menu}
                                    toppingApplyMenu={menu.toppingArray}
                                    toppingGroupMap={toppingGroupMap}
                                    toppingMap={toppingMap}
                                    toppingMenuResult={menu.toppingResult}
                                    setMenuToppingBox={setMenuToppingBox}
                                    setMenuToppingRadio={setMenuToppingRadio}
                                />
                                :
                                null
                            }
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <div className={className}>
                        <Editor
                            readOnly={true}
                            // ref={refEditor}
                            editorState={editorState}
                            onChange={(editorState) => onChange(editorState)}
                            // placeholder="Tell a story..."
                            placeholder=""
                        />
                    </div>
                </Grid>



            </Grid>
        </Grid>
    );
}

export default Detail;


