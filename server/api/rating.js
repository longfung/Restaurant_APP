var express = require("express");

var Rating = require("../models/rating");

var router = express.Router();

router.get("/menu", (req, res) => {
    console.log("in rating Get");
    var node = req.query;
    Rating.retrieveByMenu(node, (err, rating) => {
        // console.log(err);s
        // console.log(res);
        if (err) return res.status(404).send(err);
        // console.log(rest)
        return res.json(rating);
    });
});

router.get("/restaurant", (req, res) => {
    console.log("in rating Get");
    var node = req.query;
    Rating.retrieveByRestaurant(node, (err, rating) => {
        // console.log(err);s
        // console.log(res);
        if (err) return res.status(404).send(err);
        // console.log(rest)
        return res.json(rating);
    });
});

router.post("/", (req, res) => {
    console.log("in Rating Post" + req.body);
    var node = req.body;
    Rating.insert(node, (err, result) => {
        if (err) return res.status(404).send(err);
        return res.json(result);
    });
});

router.put("/", (req, res) => {
    const data = req.body;
    Rating.put(data, (err, result) => {
        if (err) return res.status(404).send(err);
        return res.json(result);
    });
});

module.exports = router;
