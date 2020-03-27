var express = require('express');
var Restaurant = require('../models/restaurant');

var router = express.Router();

router.get('/', (req, res) => {
    console.log("in Get");

    Restaurant.retrieveAll((err, rest) => {
        // console.log(err);
        // console.log(res);
        if (!err)
            return res.json(err); 
        // console.log(rest);
        return (res.json(rest));
    });
});

router.get('/:ownerId', (req, res) => { 
    const query = req.query;
    Restaurant.retrieveRestaurantByOwnerId(query, (err, rest) => {
        // console.log(err);
        // console.log(res);
        if (!err)
            return res.json(err); 
        // console.log(rest);
        if (rest && rest.length == 0) {
            return res.status(404).json({error: "restaurant not found!!"}); 
        }
        return (res.json(rest[0]));
    });
});

router.post('/', (req, res) => {
    // var name = req.body.name;
    console.log("in Post");
    var node = req.body;
    Restaurant.insert(node, (err, result) => { 
        if (err)
            return res.json(err);
        return res.json(result);
    });
});

router.put('/', (req, res) => {
    // var name = req.body.name;
    console.log("in Put");
    var node = req.body;
    Restaurant.put(node, (err, result) => { 
        if (err)
            return res.json(err);
        return res.json(result);
    });
});

module.exports = router;