import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react'
import { MdShoppingCart, MdAddCircle, MdRemoveCircle, MdArrowBack, MdStar, MdStarBorder } from 'react-icons/md';
import {
    Row,
    Col,
    Button,
    Nav,
    NavItem,
    Navbar,
    Jumbotron, Form, Input, FormGroup, Label

} from "reactstrap";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { store } from './Store';
import access, { fetchRatingByMenu } from '../util/access';
import SelectOption from './SelectOption';
import "../index.css";

function UserRate(props) {
    debugger;
    const { t } = useTranslation();
    const menu = props.menu;
    const setToComment = props.setToComment;
    const shareContext = useContext(store);
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

    const [ratingList, setRatingList] = useState([]);
    const [rating, setRating] = useState({});
    const [isComment, setIsComment] = useState(false);
    const [score, setScore] = useState(0);
    const [formatOptions, setFormatOptions] = useState([]);
    const [formatValue, setFormatValue] = useState({ value: 1, label: null });

    useEffect(() => {
        fetchRating();
    }, [])

    const fetchRating = () => {
        const promise1 = access.fetchRatingByMenu(restaurantId, menu.id);
        Promise.resolve(promise1).
            then((res) => {
                setRatingList([...res.data]);
            }).catch((err) => {
                // let errorObject = JSON.parse(JSON.stringify(err));
                setMessage({ status: 404, msg: err.message });
            });
    }

    const startRating = () => {
        setIsComment(true);
    };

    const submitRating = () => {
        let data = {
            score: score,
            comment: rating.comment,
            menu_id: menu.id,
            restaurantId: restaurantId,
            post_by: shareContext.state.customer ? shareContext.state.customer.name : ''
        };
        let menuD = {
            id: menu.id,
            rating_sum: menu.rating_sum + score,
            rating_size: menu.rating_size + 1
        }

        const promise1 = access.addRating(data);
        const promise2 = access.updateMenuRating(menuD);
        Promise.resolve(promise1, promise2)
            .then(res => {
                let m = "Rating submit Successfully !!!";
                setMessage({ status: 200, msg: m });
                setIsComment(false);
                fetchRating();
            }).catch((err) => {
                // let errorObject = JSON.parse(JSON.stringify(err));
                setMessage({ status: 404, msg: err.message });
            });
    };

    const cancelRating = () => {
        setIsComment(false);
    };

    useEffect(() => {
        let temp, tempObj;
        temp = t("SortbYDate");
        tempObj = { value: 1, label: temp };
        formatOptions.push(tempObj);
        temp = t("SortbYRelevant");
        tempObj = { value: 2, label: temp };
        formatOptions.push(tempObj);
        temp = t("SortbYScore");
        tempObj = { value: 3, label: temp };
        formatOptions.push(tempObj);
        setFormatOptions([...formatOptions])
    }, []);

    const handleSelection = e => {
        setFormatValue(e);
        sortBy(e.value);
    }


    const sortBy = (idx) => {
        let nList;
        switch (idx) {
            case 1:
                nList = [...ratingList].sort((a, b) => {
                    return b.create_timestamp > a.create_timestamp ? 1 : -1;
                })
                break;
            case 2:
                nList = [...ratingList].sort((a, b) => {
                    return b.relevant - a.relevant;
                })
                break;
            case 3:
                nList = [...ratingList].sort((a, b) => {
                    return b.score - a.score;
                })
                break;
        }
        setRatingList([...nList])
    };

    const sortBy2 = useCallback(idx => {
        setRatingList(prev => {
            let nList;
            switch (idx) {
                case 1:
                    nList = [...prev].sort((a, b) => {
                        return b.create_timestamp > a.create_timestamp ? 1 : -1;
                    })
                    break;
                case 2:
                    nList = [...prev].sort((a, b) => {
                        return b.relevant - a.relevant;
                    })
                    break;
                case 3:
                    nList = [...prev].sort((a, b) => {
                        return b.score - a.score;
                    })
                    break;
            }
            return [...nList];
        })
    }, [ratingList])

    const setRelevant = (elem) => {
        let data = {
            id: elem.id,
            relevant: elem.relevant + 1
        };
        const promise1 = access.updateRating(data);
        Promise.resolve(promise1)
            .then(res => {
                let m = "Rating submit Successfully !!!";
                setMessage({ status: 200, msg: m });
                setIsComment(false);
                fetchRating();
            });
    };

    return (
        <div>
            <Navbar color="light" light expand="md"></Navbar>
            <Jumbotron fluid className="my-0 py-1 bg-info w-100">
                <Row>
                    <Nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top mr-auto">
                        <React.Fragment>
                            <Col sm="1" xs="1" className="float-left">
                                <NavItem className="mt-0">
                                    <Link to='#!' onClick={() => setToComment({
                                        isComment: false,
                                        menu: null
                                    })}
                                        className=' flow-right'>
                                        <MdArrowBack color='white' size='2rem' />
                                    </Link>

                                </NavItem>
                            </Col>
                            <Col sm={1} xs="1" className="text-white bg-dark text-bold float-right mx-0 px-0">
                                <NavItem>

                                    <Button title={t("ScoreMT")} onClick={() => startRating()}>
                                        {t("Score")}
                                    </Button>
                                </NavItem>

                            </Col >
                            <Col sm="3" xs="3">
                                <SelectOption
                                    options={formatOptions}
                                    handleSelection={handleSelection}
                                    selectId={'sortedById'}
                                    formatValue={formatValue}
                                    width={"150px"}
                                />
                            </Col>
                        </React.Fragment>
                    </Nav>
                </Row>
                <div class="padding70"> </div>
                {isComment ?
                    <Form className="bg-light">
                        <Row form>
                            <Col xs="2" sm="2">
                                <FormGroup className="no-border font-weight-bold" >
                                    <Label>{t("Score")}</Label><br />
                                    <Button onClick={() => setScore(1)} className="bg-transparent border-white" >
                                        <MdStar color={score > 0 ? 'black' : '#D3D3D3'} size='1.5rem' />
                                    </Button>
                                    <Button onClick={() => setScore(2)} className="bg-transparent border-white">
                                        <MdStar color={score > 1 ? 'black' : '#D3D3D3'} size='1.5rem' />
                                    </Button>
                                    <Button onClick={() => setScore(3)} className="bg-transparent border-white">
                                        <MdStar color={score > 2 ? 'black' : '#D3D3D3'} size='1.5rem' />
                                    </Button>
                                    <Button onClick={() => setScore(4)} className="bg-transparent border-white">
                                        <MdStar color={score > 3 ? 'black' : '#D3D3D3'} size='1.5rem' />
                                    </Button>
                                    <Button onClick={() => setScore(5)} className="bg-transparent border-white">
                                        <MdStar color={score > 4 ? 'black' : '#D3D3D3'} size='1.5rem' />
                                    </Button>
                                </FormGroup>
                            </Col>

                            <Col xs="10" sm="10">
                                <FormGroup className="font-weight-bold">
                                    <Label for="comment">{t("Comment")}</Label >
                                    <Input
                                        type="text"
                                        id="comment"
                                        value={rating.comment}
                                        onChange={e =>
                                            setRating({ ...rating, comment: e.target.value })
                                        }
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="1" sm='1'>
                                <Button id="saveButton" onClick={submitRating}>
                                    {t("Save")}
                                </Button>
                            </Col>
                            <Col xs="11" sm='11'>
                                <Button id="cancelButton" onClick={cancelRating}>
                                    {t("Cancel")}
                                </Button>
                            </Col>


                        </Row>


                    </Form>
                    :
                    null}


            </Jumbotron>
            <div class="padding70"> </div>
            <div>
                {/* <hr></hr> */}
                <h2>{t("Comment")}</h2>
                <ul>
                    {ratingList &&
                        ratingList.map((item, idx) => (
                            <Row key={idx}>
                                <Col sm={3} xs={2}>{(item.create_timestamp.substr(0, 10))}&nbsp;<b>{item.post_by}</b></Col>
                                <Col sm={7} xs={6}>{item.comment}</Col>
                                <Col sm={1} xs={2}> {item.score}</Col>
                                <Col sm={1} xs={2}>
                                    <Button title={t("RelvantMT")} onClick={() => setRelevant(item)}>{t("Relvant")}</Button>
                                </Col>
                            </Row>
                        ))}
                </ul>
            </div>
        </div >
    )
}
export default UserRate
