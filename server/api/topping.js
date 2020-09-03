var express = require("express");

var Topping = require("../models/topping");

var router = express.Router();

router.get("/", (req, res) => {
    console.log("in topping Get");
    var node = req.query;
    Topping.retrieveAllByRestaurant(node, (err, topping) => {
        // console.log(err);s
        // console.log(res);
        if (err) return res.status(404).send(err);
        // console.log(rest)
        return res.json(topping);
    });
});

router.delete("/", (req, res) => {
    const query = req.query;
    Topping.delete(query, (err, topping) => {
        if (err) return res.status(404).send(err);
        return res.json(topping);
    });
});

router.post("/", (req, res) => {
    console.log("in topping Post" + req.body);
    var node = req.body;
    Topping.insert(node, (err, result) => {
        if (err) res.status(404).send(err);
        return res.json(result);
    });
});

router.put("/", (req, res) => {
    const data = req.body;
    Topping.put(data, (err, result) => {
        if (err) return res.status(404).send(err);
        return res.json(result);
    });
});

module.exports = router;
